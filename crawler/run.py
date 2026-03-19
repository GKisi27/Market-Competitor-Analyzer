# crawler/run.py
from __future__ import annotations
import asyncio
import json
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from config import RAW_DIR, NORMALIZED_DIR, COMPETITORS
from parsers.normalize import normalize
from extractors import nepal_training, digital_pathsala, evolve, lets_learn, code_it

EXTRACTOR_MAP = {
    "nepal_training":   nepal_training,
    "digital_pathsala": digital_pathsala,
    "evolve":           evolve,
    "lets_learn":       lets_learn,
    "code_it":          code_it,
}


async def run_competitor(name: str, dry_run: bool = False) -> dict:
    source_url = COMPETITORS.get(name, "")
    extractor  = EXTRACTOR_MAP.get(name)

    if extractor is None:
        print(f"[WARN] No extractor found for: {name}")
        return {"competitor": name, "total_raw": 0, "total_normalized": 0}

    print(f"\n── {name} {'─' * (44 - len(name))}")
    t0 = time.time()

    try:
        raw_courses = await extractor.fetch()
    except Exception as e:
        print(f"  [ERROR] Extractor crashed: {e}")
        return {"competitor": name, "total_raw": 0, "total_normalized": 0, "error": str(e)}

    raw_output = {"competitor": name, "source_url": source_url, "courses": raw_courses}
    raw_path   = RAW_DIR / f"{name}.json"

    if not dry_run:
        raw_path.write_text(json.dumps(raw_output, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"  Raw saved → {raw_path.name}  ({len(raw_courses)} records)")
    else:
        print(f"  [DRY-RUN] {len(raw_courses)} raw records found")

    if not dry_run:
        result = normalize(competitor=name, raw_courses=raw_courses, source_url=source_url)
    else:
        from parsers.normalize import _is_valid
        valid = sum(1 for r in raw_courses if _is_valid(r)[0])
        print(f"  [DRY-RUN] {valid}/{len(raw_courses)} would normalize")
        result = {"total_raw": len(raw_courses), "total_normalized": valid}

    print(f"  Done in {time.time() - t0:.1f}s")
    return result


async def run_all(targets: list[str], dry_run: bool = False) -> None:
    print("=" * 56)
    print("  Market Competitor Analysis — Crawler")
    print("=" * 56)

    summaries = []
    for name in targets:
        summary = await run_competitor(name, dry_run=dry_run)
        summaries.append(summary)

    print("\n" + "=" * 56)
    print(f"  {'Competitor':<22} {'Raw':>5}  {'Normalized':>10}")
    print("  " + "-" * 42)
    for s in summaries:
        err = "  ← ERROR" if "error" in s else ""
        print(f"  {s['competitor']:<22} {s.get('total_raw',0):>5}  {s.get('total_normalized',0):>10}{err}")
    print("=" * 56)
    print(f"\n  Output → {NORMALIZED_DIR}\n")