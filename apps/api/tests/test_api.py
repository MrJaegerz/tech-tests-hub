"""
Quick test script to verify API functionality
"""
from app.main import app
from app.database import engine, Base
from sqlalchemy import inspect

def test_database_connection():
    """Test database connection"""
    try:
        with engine.connect() as conn:
            print("✅ Database connection successful")

            # Check if table exists
            inspector = inspect(engine)
            tables = inspector.get_table_names()
            print(f"✅ Found {len(tables)} tables: {tables}")

            if "technical_tests" in tables:
                print("✅ technical_tests table exists")
            else:
                print("❌ technical_tests table NOT found")

    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False
    return True

def test_app_routes():
    """Test app routes"""
    print(f"\n✅ App title: {app.title}")
    print(f"✅ App version: {app.version}")

    routes = [route.path for route in app.routes]
    print(f"✅ Found {len(routes)} routes:")
    for route in routes:
        print(f"   - {route}")

if __name__ == "__main__":
    print("=== API Tests ===\n")
    test_database_connection()
    test_app_routes()
    print("\n=== Tests Complete ===")
