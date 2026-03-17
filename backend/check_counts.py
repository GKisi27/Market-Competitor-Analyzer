from app.database.session import SessionLocal
from app.models.competitors import Competitor
from app.models.price_data import PriceData
from app.models.curriculum_data import CurriculumData
from app.models.users import User

def check_counts():
    db = SessionLocal()
    try:
        print(f"Users: {db.query(User).count()}")
        print(f"Competitors: {db.query(Competitor).count()}")
        print(f"PriceData: {db.query(PriceData).count()}")
        print(f"CurriculumData: {db.query(CurriculumData).count()}")
    finally:
        db.close()

if __name__ == "__main__":
    check_counts()
