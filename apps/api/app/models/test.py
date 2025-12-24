from sqlalchemy import Column, String, Text, DateTime, Integer, func, JSON
from app.database import Base


class TechnicalTest(Base):
    __tablename__ = "technical_tests"

    id = Column(String, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    github_url = Column(String(500), nullable=False)
    result = Column(String(20), nullable=False)  # SUCCESS, PARTIAL, FAIL
    test_type = Column(String(50))  # UI, API, BACKEND, ALGORITHM, FULLSTACK
    duration_minutes = Column(Integer)  # Estimated duration in minutes
    requirements_markdown = Column(Text)  # Test requirements/instructions
    solution_files = Column(JSON)  # Array of {path: string, content: string, language: string}
    demo_url = Column(String(500))  # Optional live demo URL
    review_ia = Column(Text)  # AI code review with recommendations (Markdown)
    example_path = Column(String(500))  # Path to example in /examples (e.g., "exercice-library-test")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    user_id = Column(String, nullable=False, index=True)
