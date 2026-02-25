from sqlalchemy.orm import Session
from app.models.competitors import Competitor
from app.models.curriculum_data import CurriculumData
from app.models.price_data import PriceData
from crawler.parsers.normalize import normalize_all  # Import from crawler

def import_courses_to_db(db: Session):
    """Take normalized JSON → Insert to DB tables."""
    normalized_list = normalize_all()  # Or load from file
    
    for norm in normalized_list:
        # Get or create competitor
        comp = db.query(Competitor).filter_by(name=norm["competitor"]).first()
        if not comp:
            comp = Competitor(name=norm["competitor"], website_url=... )  # from config
            db.add(comp)
            db.commit()
        
        for course in norm["courses"]:
            # PriceData
            price = PriceData(
                competitor_id=comp.competitor_id,
                product_name=course["course_name"],
                price=course["price"],
                currency=course["currency"]
            )
            db.add(price)
            
            # CurriculumData
            curr = CurriculumData(
                competitor_id=comp.competitor_id,
                course_name=course["course_name"],
                duration=course["duration"],
                level=course["level"]
            )
            db.add(curr)
    
    db.commit()
    print("Data imported to PostgreSQL!")