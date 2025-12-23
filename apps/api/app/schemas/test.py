from pydantic import BaseModel, HttpUrl, Field
from datetime import datetime
from typing import Literal, Optional


class SolutionFile(BaseModel):
    path: str
    content: str
    language: str


class TestBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    github_url: HttpUrl
    result: Literal["SUCCESS", "PARTIAL", "FAIL"]
    test_type: Optional[Literal["UI", "API", "BACKEND", "ALGORITHM", "FULLSTACK"]] = None
    requirements_markdown: Optional[str] = None
    solution_files: Optional[list[SolutionFile]] = None
    demo_url: Optional[HttpUrl] = None
    review_ia: Optional[str] = None
    example_path: Optional[str] = None


class TestCreate(TestBase):
    pass


class TestUpdate(TestBase):
    pass


class TestResponse(TestBase):
    id: str
    created_at: datetime
    updated_at: datetime
    user_id: str

    class Config:
        from_attributes = True
