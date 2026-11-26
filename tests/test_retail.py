import unittest, sqlite3, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
class RetailTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        source = (ROOT / "sql-lab.js").read_text()
        cls.db = sqlite3.connect(":memory:")
        cls.db.executescript(re.search(r"db\.run\(`(.*?)`\);", source, re.S).group(1))
        cls.examples = re.findall(r"\['([^']+)','([^']+)'\]", source.split("let SQL")[0])
    def test_counts(self):
        for table, count in dict(customers=1000, stores=10, products=100, orders=10000, order_items=30000, payments=10000).items():
            self.assertEqual(self.db.execute("SELECT COUNT(*) FROM "+table).fetchone()[0], count)
    def test_integrity(self):
        self.assertEqual(self.db.execute("PRAGMA foreign_key_check").fetchall(), [])
        self.assertEqual(self.db.execute("PRAGMA integrity_check").fetchone()[0], "ok")
    def test_payment_reconciliation(self):
        self.assertEqual(self.db.execute("SELECT COUNT(*) FROM payments p WHERE p.amount != (SELECT SUM(quantity*unit_price) FROM order_items WHERE order_id=p.order_id)").fetchone()[0], 0)
    def test_examples(self):
        self.assertEqual(len(self.examples), 5)
        for name, query in self.examples:
            with self.subTest(name=name):
                self.assertTrue(self.db.execute(query).fetchall())
if __name__ == "__main__":
    unittest.main()
