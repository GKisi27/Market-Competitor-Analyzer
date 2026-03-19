# crawler/main.py
import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from run import run_all, EXTRACTOR_MAP   # EXTRACTOR_MAP now lives in run.py


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="python crawler/main.py",
        description="Crawl competitor course websites and normalize output.",
        epilog="""
Examples:
  python crawler/main.py
  python crawler/main.py --competitor evolve
  python crawler/main.py --dry-run
        """,
    )
    parser.add_argument(
        "--competitor",
        type=str,
        default=None,
        choices=list(EXTRACTOR_MAP.keys()),
        metavar="NAME",
        help=f"One of: {', '.join(EXTRACTOR_MAP.keys())}. Omit to run all.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Crawl and validate without writing any files.",
    )
    return parser.parse_args()


def main() -> None:
    args    = parse_args()
    targets = [args.competitor] if args.competitor else list(EXTRACTOR_MAP.keys())
    asyncio.run(run_all(targets, dry_run=args.dry_run))


if __name__ == "__main__":
    main()