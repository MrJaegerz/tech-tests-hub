from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.config import settings


class Base(DeclarativeBase):
    """Base class for SQLAlchemy models"""

    pass


# Use psycopg3 driver
database_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Database dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
