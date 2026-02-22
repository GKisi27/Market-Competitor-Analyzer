from sqlalchemy import Column, Integer, String
from app.database.session import Base
from sqlalchemy.orm import relationship

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key = True, index = True, autoincrement = True)
    role_name = Column(String(50), unique = True, index = True, nullable = False)
    description = Column(String(255))

    #Relationships 
    user_roles = relationship("UserRole",back_populates = "role", cascade = "all, delete-orphan" )
    

