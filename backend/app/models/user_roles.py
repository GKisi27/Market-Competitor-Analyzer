from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship 
from app.database.session import Base 

class UserRole(Base):

    __tablename__ = "user_roles"
    user_role_id = Column(Integer, primary_key = True, index = True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete = "CASCADE"), nullable = False)
    role_id = Column(Integer, ForeignKey("roles.role_id", ondelete = "CASCADE"), nullable = False)

    #Relationships 
    user = relationship("User", back_populates = "user_roles")
    role = relationship("Role", back_populates = "user_roles")


