
from __future__ import annotations
import argparse
import json
import sys
from datetime import datetime, timezone, timedelta
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

# Database
from app.database.session import engine, SessionLocal, Base


from app.models.roles             import Role
from app.models.users             import User
from app.models.user_roles        import UserRole
from app.models.dashboards        import Dashboard
from app.models.reports           import Report
from app.models.crawler_jobs      import CrawlerJob
from app.models.scraping_configs  import ScrapingConfig
from app.models.raw_data          import RawData
from app.models.processed_data    import ProcessedData
from app.models.competitors       import Competitor
from app.models.price_data        import PriceData
from app.models.curriculum_data   import CurriculumData
from app.models.skills            import Skill
from app.models.curriculum_skills import CurriculumSkill
from app.models.metrics           import Metric
from app.models.competitor_metrics import CompetitorMetric

# Path to normalized JSON files
NORMALIZED_DIR = (
    Path(__file__).resolve()
    .parent   # seed/
    .parent   # app/
    .parent   # backend/
    .parent   # project root
    / "crawler" / "data" / "normalized"
)

def seed_roles(db) -> list[Role]:
    rows = [
        Role(role_name="admin",    description="Full system access"),
        Role(role_name="analyst",  description="Read and generate reports"),
        Role(role_name="crawler",  description="Run and manage crawler jobs"),
        Role(role_name="viewer",   description="Read-only dashboard access"),
    ]
    db.add_all(rows); db.flush()
    print(f"  roles              : {len(rows)}")
    return rows


def seed_users(db) -> list[User]:
    from app.core.security import get_password_hash
    rows = [
        User(full_name="Gopal Kisi",      email="info@nextstepinfotech.com",   password_hash=get_password_hash("gopal123"),    status=True),
        User(full_name="Prasiddha Karki", email="prashidkarki321@gmail.com",   password_hash=get_password_hash("prasiddha123"),status=True), 

        User(full_name="Sumit Ghimire",   email="sumitghimire77@gmail.com",    password_hash=get_password_hash("sumit123"),   status=True),
        User(full_name="Anish Shrestha",  email="cresthanis@gmail.com",        password_hash=get_password_hash("anish123"),   status=True),
        User(full_name="Kashmir Lama",    email="kashmirlama@gmail.com",       password_hash=get_password_hash("kashmir123"), status=True),
        User(full_name="Rabin Gapi",      email="rabing624@gmail.com",         password_hash=get_password_hash("rabin123"),   status=True),
    ]
    db.add_all(rows); db.flush()
    print(f"  users              : {len(rows)}")
    return rows


def seed_user_roles(db, users, roles) -> list[UserRole]:
    rm = {r.role_name: r for r in roles}
    rows = [
        UserRole(user_id=users[0].user_id, role_id=rm["admin"].role_id),
        UserRole(user_id=users[1].user_id, role_id=rm["admin"].role_id),
        UserRole(user_id=users[2].user_id, role_id=rm["admin"].role_id),
        UserRole(user_id=users[3].user_id, role_id=rm["admin"].role_id),
        UserRole(user_id=users[4].user_id, role_id=rm["admin"].role_id),
        UserRole(user_id=users[5].user_id, role_id=rm["admin"].role_id),
    ]
    db.add_all(rows); db.flush()
    print(f"  user_roles         : {len(rows)}")
    return rows


def seed_dashboards(db, users) -> list[Dashboard]:
    rows = [
        Dashboard(name="Competitor Price Overview",  created_by=users[1].user_id),
        Dashboard(name="Curriculum Comparison",      created_by=users[1].user_id),
        Dashboard(name="Market Trends Dashboard",    created_by=users[1].user_id),
        Dashboard(name="Skills Demand Analysis",     created_by=users[1].user_id),
        Dashboard(name="Monthly Metrics Summary",    created_by=users[1].user_id),
    ]
    db.add_all(rows); db.flush()
    print(f"  dashboards         : {len(rows)}")
    return rows


def seed_reports(db, dashboards, users) -> list[Report]:
    rows = [
        Report(dashboard_id=dashboards[0].dashboard_id, filters_applied={"competitor": "all", "currency": "NPR"},       export_format="pdf",  generated_by=users[0].user_id),
        Report(dashboard_id=dashboards[1].dashboard_id, filters_applied={"level": "Beginner", "duration": "2.5 months"},export_format="csv",  generated_by=users[1].user_id),
        Report(dashboard_id=dashboards[2].dashboard_id, filters_applied={"date_range": "last_30_days"},                 export_format="pdf",  generated_by=users[0].user_id),
        Report(dashboard_id=dashboards[3].dashboard_id, filters_applied={"skill": "Python", "level": "Advanced"},       export_format="xlsx", generated_by=users[1].user_id),
    ]
    db.add_all(rows); db.flush()
    print(f"  reports            : {len(rows)}")
    return rows


def seed_competitors(db) -> list[Competitor]:
    now = datetime.now(timezone.utc)
    rows = [
        Competitor(name="Nepal Training Centre", website_url="https://www.nepaltrainingcentre.com", industry="IT Training", country="Nepal", status=True, last_crawled_at=now),
        Competitor(name="Digital Pathshala Nepal", website_url="https://digitalpathshalanepal.com",  industry="IT Training", country="Nepal", status=True, last_crawled_at=now),
        Competitor(name="Evolve IT Hub", website_url="https://www.evolveithub.com", industry="IT Training", country="Nepal", status=True, last_crawled_at=now),
        Competitor(name="LetsLearn IT Training Institute", website_url="https://letslearn.asia", industry="IT Training", country="Nepal", status=True, last_crawled_at=now),
        Competitor(name="Code IT", website_url="https://codeit.com.np",industry="IT Training", country="Nepal", status=True, last_crawled_at=now),
    ]
    db.add_all(rows); db.flush()
    print(f"  competitors        : {len(rows)}")
    return rows


def seed_scraping_configs(db, competitors) -> list[ScrapingConfig]:
    rows = []
    for comp in competitors:
        rows.append(ScrapingConfig(competitor_id=comp.competitor_id, data_type="price",      css_selector=".price, td:nth-child(4)", attribute="text", is_active=True))
        rows.append(ScrapingConfig(competitor_id=comp.competitor_id, data_type="curriculum", css_selector=".course-title, td:nth-child(2)", attribute="text", is_active=True))
    db.add_all(rows); db.flush()
    print(f"  scraping_configs   : {len(rows)}")
    return rows


def seed_crawler_jobs(db, users, user_roles) -> list[CrawlerJob]:
    now = datetime.now(timezone.utc)
    rows = [
        CrawlerJob(triggered_by=users[1].user_id, user_role_id=user_roles[1].user_role_id, status="completed", start_time=now - timedelta(hours=2),  end_time=now - timedelta(hours=1)),
        CrawlerJob(triggered_by=users[1].user_id, user_role_id=user_roles[1].user_role_id, status="completed", start_time=now - timedelta(days=1),   end_time=now - timedelta(days=1) + timedelta(hours=1)),
        CrawlerJob(triggered_by=users[1].user_id, user_role_id=user_roles[1].user_role_id, status="completed",    start_time=now - timedelta(days=2),   end_time=now - timedelta(days=2) + timedelta(minutes=5)),
        CrawlerJob(triggered_by=users[1].user_id, user_role_id=user_roles[1].user_role_id, status="completed",   start_time=None, end_time=None),
    ]
    db.add_all(rows); db.flush()
    print(f"  crawler_jobs       : {len(rows)}")
    return rows


def seed_raw_and_processed(db, jobs, configs) -> tuple:
    raw_rows, proc_rows = [], []
    norm_files = sorted(NORMALIZED_DIR.glob("*.json")) if NORMALIZED_DIR.exists() else []

    if not norm_files:
        print(f"normalized JSONs not found at: {NORMALIZED_DIR}")
        return [], []

    for i, nf in enumerate(norm_files):
        data   = json.loads(nf.read_text())
        config = configs[i * 2] if i * 2 < len(configs) else configs[0]
        raw = RawData(
            job_id=jobs[0].job_id,
            config_id=config.config_id,
            data_type="curriculum_price",
            raw_payload=data,
            fetched_at=datetime.now(timezone.utc),
        )
        db.add(raw); db.flush()
        raw_rows.append(raw)

        proc = ProcessedData(
            raw_data_id=raw.raw_data_id,
            validated=True,
            cleaned_payload={"competitor": data.get("competitor"), "total_courses": data.get("total_normalized", 0), "status": "clean"},
        )
        db.add(proc); db.flush()
        proc_rows.append(proc)

    print(f"  raw_data           : {len(raw_rows)}")
    print(f"  processed_data     : {len(proc_rows)}")
    return raw_rows, proc_rows


def seed_price_and_curriculum(db, competitors, jobs) -> tuple:
    comp_map = {
        "code_it":          competitors[4],
        "digital_pathsala": competitors[1],
        "evolve":           competitors[2],
        "lets_learn":       competitors[3],
        "nepal_training":   competitors[0],
    }
    
    now  = datetime.now(timezone.utc)
    job  = jobs[0]
    curr_rows, price_rows = [], []


    norm_files = sorted(NORMALIZED_DIR.glob("*.json")) if NORMALIZED_DIR.exists() else []
    if not norm_files:
        print(f"  normalized JSONs not found — skipping curriculum/price seed")
        return [], []

    for nf in norm_files:
        data = json.loads(nf.read_text())
        comp = comp_map.get(data.get("competitor", ""))
        if not comp:
            continue

        for course in data.get("courses", []):
            curr = CurriculumData(
                competitor_id=comp.competitor_id,
                course_name=course["course_name"],
                duration=course.get("duration"),
                level=course.get("level"),
                collected_at=now,
                job_id=job.job_id,
            )
            db.add(curr); db.flush()
            curr_rows.append(curr)

            price = PriceData(
                competitor_id=comp.competitor_id,
                product_name=course["course_name"],
                price=Decimal(str(course["price"])),
                currency=course.get("currency", "NPR"),
                source_url=course.get("url"),
                collected_at=now,
                job_id=job.job_id,
            )
            db.add(price)

        db.flush()
        price_rows.extend([p for p in db.new if isinstance(p, PriceData)])

    print(f"  curriculum_data    : {len(curr_rows)}")
    print(f"  price_data         : {len(curr_rows)}")  # 1:1 with curriculum
    return curr_rows, price_rows


def seed_skills(db) -> list[Skill]:
    names = [
        "Python", "JavaScript", "PHP", "Java", "C++", "React", "Node.js",
        "Flutter", "Django", "Laravel", "MySQL", "PostgreSQL", "MongoDB",
        "AWS", "Docker", "Figma", "SEO", "Digital Marketing", "Data Science",
        "Machine Learning", "UI/UX Design", "WordPress", "Android Development",
        "DevOps", "PowerBI",
    ]
    rows = [Skill(skill_name=n) for n in names]
    db.add_all(rows); db.flush()
    print(f"  skills             : {len(rows)}")
    return rows


def seed_curriculum_skills(db, curriculum_list, skills) -> list[CurriculumSkill]:
    skill_map = {s.skill_name.lower(): s for s in skills}
    KEYWORD_MAP = {
        "python":            ["Python", "Django", "Data Science"],
        "web development":   ["JavaScript", "React", "Node.js", "MySQL"],
        "mern":              ["MongoDB", "React", "Node.js", "JavaScript"],
        "mean":              ["MongoDB", "Node.js", "JavaScript"],
        "flutter":           ["Flutter", "Android Development"],
        "android":           ["Android Development", "Java"],
        "java":              ["Java", "MySQL"],
        "php":               ["PHP", "Laravel", "MySQL"],
        "django":            ["Python", "Django"],
        "laravel":           ["PHP", "Laravel", "MySQL"],
        "react":             ["JavaScript", "React"],
        "node":              ["Node.js", "JavaScript", "MongoDB"],
        "digital marketing": ["Digital Marketing", "SEO"],
        "artificial intel":  ["Python", "Machine Learning", "Data Science"],
        "ai":                ["Python", "Machine Learning", "Data Science"],
        "data science":      ["Python", "Data Science", "Machine Learning"],
        "ui/ux":             ["Figma", "UI/UX Design"],
        "graphic":           ["Figma", "UI/UX Design"],
        "wordpress":         ["WordPress", "PHP"],
        "c++":               ["C++"],
        "devops":            ["Docker", "AWS", "DevOps"],
        "powerbi":           ["PowerBI", "Data Science"],
        "mobile":            ["Flutter", "Android Development"],
        "software":          ["Python", "Java", "C++"],
    }
    rows, seen = [], set()
    for curr in curriculum_list:
        assigned = set()
        for kw, skill_names in KEYWORD_MAP.items():
            if kw in curr.course_name.lower():
                assigned.update(skill_names)
        if not assigned:
            assigned.add("JavaScript")
        for sn in assigned:
            skill = skill_map.get(sn.lower())
            if not skill:
                continue
            key = (curr.curriculum_id, skill.skill_id)
            if key in seen:
                continue
            seen.add(key)
            rows.append(CurriculumSkill(curriculum_id=curr.curriculum_id, skill_id=skill.skill_id))
    db.add_all(rows); db.flush()
    print(f"  curriculum_skills  : {len(rows)}")
    return rows


def seed_metrics(db) -> list[Metric]:
    rows = [
        Metric(metric_name="avg_course_price",      description="Average price across all courses in NPR"),
        Metric(metric_name="total_courses",         description="Total number of courses offered"),
        Metric(metric_name="price_competitiveness", description="Price rank vs competitors (1=cheapest)"),
        Metric(metric_name="course_variety",        description="Number of unique course categories"),
        Metric(metric_name="avg_duration_months",   description="Average course duration in months"),
    ]
    db.add_all(rows); db.flush()
    print(f"  metrics            : {len(rows)}")
    return rows


def seed_competitor_metrics(db, competitors, metrics) -> list[CompetitorMetric]:
    # [avg_price, total_courses, price_rank, variety, avg_duration]
    VALUES = {
        "Nepal Training Centre": [4893.0,  14, 1.0, 5.0, 1.5],
        "Digital Pathshala":     [1499.0,   9, 2.0, 4.0, 1.8],
        "Evolve IT Hub":         [15200.0, 10, 5.0, 5.0, 3.0],
        "LetsLearn":             [15375.0,  8, 4.0, 5.0, 2.5],
        "Code IT":               [2000.0,   7, 3.0, 4.0, 0.7],
    }
    rows = []
    for comp in competitors:
        vals = VALUES.get(comp.name, [10000.0, 5, 3.0, 3.0, 2.0])
        for i, metric in enumerate(metrics):
            rows.append(CompetitorMetric(
                competitor_id=comp.competitor_id,
                metric_id=metric.metric_id,
                metric_value=Decimal(str(vals[i])),
            ))
    db.add_all(rows); db.flush()
    print(f"  competitor_metrics : {len(rows)}")
    return rows


def create_tables():
    print("\n-- Creating tables ------------------------------------")
    Base.metadata.create_all(bind=engine)
    from sqlalchemy import inspect
    tables = inspect(engine).get_table_names()
    print(f"{len(tables)} tables ready: {', '.join(sorted(tables))}\n")

def drop_tables():
    print("\n-- Dropping all tables --------------------------------")
    Base.metadata.drop_all(bind=engine)
    print("  All tables dropped.\n")


def run_seed():
    print("-- Seeding all 17 tables ------------------------------")
    db = SessionLocal()
    try:
        roles       = seed_roles(db)
        users       = seed_users(db)
        user_roles  = seed_user_roles(db, users, roles)
        dashboards  = seed_dashboards(db, users)
        _          = seed_reports(db, dashboards, users)
        competitors = seed_competitors(db)
        configs     = seed_scraping_configs(db, competitors)
        jobs        = seed_crawler_jobs(db, users, user_roles)
        _           = seed_raw_and_processed(db, jobs, configs)
        curriculum, _ = seed_price_and_curriculum(db, competitors, jobs)
        skills      = seed_skills(db)
        _           = seed_curriculum_skills(db, curriculum, skills)
        metric_defs = seed_metrics(db)
        _           = seed_competitor_metrics(db, competitors, metric_defs)

        db.commit()
        print("\n All 17 tables seeded successfully!\n")


    except Exception as e:
        db.rollback()
        print(f"\n Seeding failed — rolled back.\n  Error: {e}\n")
        raise
    finally:
        db.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--reset",  action="store_true", help="Drop all tables then recreate + seed")
    parser.add_argument("--tables", action="store_true", help="Only create tables, skip seeding")
    args = parser.parse_args()

    if args.reset:
        drop_tables()
    create_tables()
    if not args.tables:
        run_seed()

if __name__ == "__main__":
    main()