from app.database.session import SessionLocal
from app.models.users import User
from app.core.security import verify_password

def check_users():
    db = SessionLocal()
    users = db.query(User).all()
    print(f"Total users found: {len(users)}")
    for user in users:
        print(f"ID: {user.user_id}, Name: {user.full_name}, Email: {user.email}")
        print(f"Hash: {user.password_hash[:10]}...")
        # Test a common password if we know it (e.g., from seed_data.py)
        # Assuming password was 'password123' based on common seed practices
        # We'll check the seed script to find the actual password used.
    db.close()

if __name__ == "__main__":
    check_users()
