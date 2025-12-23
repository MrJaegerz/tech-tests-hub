#!/usr/bin/env python3
"""
Example script to populate a test with content from example tests.
This demonstrates how to use the test_type, requirements_markdown, solution_files, and review_ia fields.

Place your example test files in: apps/web/app/(public)/examples/exercice-library-test/
Structure:
  - TEST_TECHNIQUE.md (requirements)
  - REVIEW.md (AI code review)
  - page.tsx (main file)
  - components/ExerciceTable.tsx
  - data.ts
"""
import requests
import json
from pathlib import Path

API_URL = "http://localhost:8000/api/v1/tests"
API_KEY = "dev-api-key-change-me"

# Path to example test (apps/web/app/(public)/examples/exercice-library-test)
EXAMPLE_TEST_PATH = Path(__file__).parent.parent / "web" / "app" / "(public)" / "examples" / "exercice-library-test"

def read_file(file_path: Path) -> str:
    """Read file content"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def create_test_with_content():
    """Create a test with requirements, solution code, and AI code review"""

    # Read the requirements markdown
    requirements = read_file(EXAMPLE_TEST_PATH / "TEST_TECHNIQUE.md")

    # Read the AI code review markdown
    review_ia = read_file(EXAMPLE_TEST_PATH / "REVIEW.md")

    # Read solution files
    solution_files = [
        {
            "path": "page.tsx",
            "content": read_file(EXAMPLE_TEST_PATH / "page.tsx"),
            "language": "typescript"
        },
        {
            "path": "components/ExerciceTable.tsx",
            "content": read_file(EXAMPLE_TEST_PATH / "components" / "ExerciceTable.tsx"),
            "language": "typescript"
        },
        {
            "path": "data.ts",
            "content": read_file(EXAMPLE_TEST_PATH / "data.ts"),
            "language": "typescript"
        }
    ]

    # Create test data
    test_data = {
        "title": "Exercise Library - Filtres et Tri",
        "description": "Composant React avec filtres cumulatifs et système de tri pour une bibliothèque d'exercices",
        "github_url": "https://github.com/example/exercice-library-test",
        "result": "SUCCESS",
        "test_type": "UI",
        "requirements_markdown": requirements,
        "solution_files": solution_files,
        "review_ia": review_ia,
        "example_path": "exercice-library-test",
        "demo_url": None  # Optional: add demo URL if available
    }

    # Send POST request
    headers = {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY
    }

    response = requests.post(API_URL, json=test_data, headers=headers)

    if response.status_code == 201:
        test = response.json()
        print(f"✅ Test created successfully!")
        print(f"   ID: {test['id']}")
        print(f"   Title: {test['title']}")
        print(f"   Type: {test['test_type']}")
        print(f"   View at: http://localhost:3000/tests/{test['id']}")
    else:
        print(f"❌ Error creating test: {response.status_code}")
        print(f"   {response.text}")

if __name__ == "__main__":
    try:
        create_test_with_content()
    except FileNotFoundError as e:
        print(f"❌ File not found: {e}")
        print(f"   Make sure the example test files exist at: {EXAMPLE_TEST_PATH}")
    except Exception as e:
        print(f"❌ Error: {e}")
