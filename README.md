# projectBeta

Personal portfolio website for Makungu Ndlovu.

## Local preview

Serve the repository root with any static web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validation

Run the repository's dependency-free link and placeholder checker:

```bash
python scripts/check_site.py
```

The same check runs automatically for pull requests and pushes to `main`.

## Deployment

The site is intended for GitHub Pages with the custom domain declared in `CNAME`: `makungumixo.co.za`.

After merging, configure GitHub Pages to deploy from the `main` branch root. Confirm the domain's DNS records point to GitHub Pages before enabling **Enforce HTTPS**.
