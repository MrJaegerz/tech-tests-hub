from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
from app.database import get_db
from app.dependencies import verify_api_key
from app.models.test import TechnicalTest
from app.schemas.test import TestCreate, TestUpdate, TestResponse

router = APIRouter(prefix="/tests", tags=["tests"])


@router.get("", response_model=List[TestResponse])
async def get_tests(
    db: Session = Depends(get_db),
    user_id: Optional[str] = None,
):
    """Get all tests (public read access)"""
    if user_id:
        tests = db.query(TechnicalTest).filter(TechnicalTest.user_id == user_id).all()
    else:
        tests = db.query(TechnicalTest).all()
    return tests


@router.get("/{test_id}", response_model=TestResponse)
async def get_test(
    test_id: str,
    db: Session = Depends(get_db),
):
    """Get a specific test by ID (public read access)"""
    test = db.query(TechnicalTest).filter(TechnicalTest.id == test_id).first()

    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Test not found"
        )

    return test


@router.post("", response_model=TestResponse, status_code=status.HTTP_201_CREATED)
async def create_test(
    test_data: TestCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_api_key),
):
    """Create a new test (requires API key)"""
    new_test = TechnicalTest(
        id=str(uuid.uuid4()),
        **test_data.model_dump(mode="json"),
        user_id=user_id,
    )

    db.add(new_test)
    db.commit()
    db.refresh(new_test)

    return new_test


@router.put("/{test_id}", response_model=TestResponse)
async def update_test(
    test_id: str,
    test_data: TestUpdate,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_api_key),
):
    """Update an existing test (requires API key)"""
    test = (
        db.query(TechnicalTest)
        .filter(TechnicalTest.id == test_id, TechnicalTest.user_id == user_id)
        .first()
    )

    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Test not found"
        )

    for key, value in test_data.model_dump(mode="json").items():
        setattr(test, key, value)

    db.commit()
    db.refresh(test)

    return test


@router.delete("/{test_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_test(
    test_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_api_key),
):
    """Delete a test (requires API key)"""
    test = (
        db.query(TechnicalTest)
        .filter(TechnicalTest.id == test_id, TechnicalTest.user_id == user_id)
        .first()
    )

    if not test:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Test not found"
        )

    db.delete(test)
    db.commit()

    return None
