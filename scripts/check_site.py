from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob("*.html"))
URL_ATTRIBUTES = {"href", "src"}
IGNORED_SCHEMES = {"http", "https", "mailto", "tel", "data", "javascript"}

class LinkParser(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source
        self.links = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in URL_ATTRIBUTES and value:
                self.links.append((tag, name, value, self.getpos()[0]))

errors = []
for html_file in HTML_FILES:
    text = html_file.read_text(encoding="utf-8")
    for placeholder in ("yourFormID", 'integrity="sha512-..."'):
        if placeholder in text:
            errors.append(f"{html_file.name}: contains placeholder {placeholder!r}")

    parser = LinkParser(html_file)
    parser.feed(text)
    for tag, attr, raw_url, line in parser.links:
        parsed = urlsplit(raw_url)
        if raw_url.startswith("#") or parsed.scheme in IGNORED_SCHEMES or raw_url.startswith("//"):
            continue
        relative_path = unquote(parsed.path)
        if not relative_path:
            continue
        target = (html_file.parent / relative_path).resolve()
        try:
            target.relative_to(ROOT)
        except ValueError:
            errors.append(f"{html_file.name}:{line}: path escapes repository: {raw_url}")
            continue
        if not target.exists():
            errors.append(f"{html_file.name}:{line}: missing local target: {raw_url}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    raise SystemExit(1)

print(f"Checked {len(HTML_FILES)} HTML files; all local targets exist.")
