"""
Initialize database - équivalent de 'prisma migrate dev'
Crée la base de données et applique les migrations
"""

import sys
from sqlalchemy import create_engine, text, inspect
from app.config import settings
from app.database import Base
from app.models.test import TechnicalTest


def create_database():
    """Créer la base de données si elle n'existe pas"""
    # Connection à postgres (pas à la db spécifique)
    db_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")
    base_url = db_url.rsplit("/", 1)[0]  # Remove database name
    db_name = db_url.rsplit("/", 1)[1]

    try:
        # Connect to postgres database
        engine = create_engine(f"{base_url}/postgres")
        with engine.connect() as conn:
            conn.execution_options(isolation_level="AUTOCOMMIT")

            # Check if database exists
            result = conn.execute(
                text(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")
            )
            exists = result.fetchone()

            if not exists:
                conn.execute(text(f"CREATE DATABASE {db_name}"))
                print(f"✅ Database '{db_name}' created")
            else:
                print(f"✅ Database '{db_name}' already exists")

        engine.dispose()
        return True

    except Exception as e:
        print(f"❌ Error creating database: {e}")
        return False


def create_tables():
    """Créer toutes les tables (équivalent de Prisma push)"""
    try:
        db_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")
        engine = create_engine(db_url)

        # Check existing tables
        inspector = inspect(engine)
        existing_tables = inspector.get_table_names()

        print(f"\n📊 Existing tables: {existing_tables}")

        # Create all tables
        Base.metadata.create_all(bind=engine)

        # Check tables again
        inspector = inspect(engine)
        tables = inspector.get_table_names()

        print(f"✅ Tables created/verified: {tables}")

        # Show table details
        for table in tables:
            columns = inspector.get_columns(table)
            print(f"\n📋 Table '{table}':")
            for col in columns:
                print(f"   - {col['name']}: {col['type']}")

        engine.dispose()
        return True

    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False


def main():
    """Main function"""
    print("=== Database Initialization ===\n")
    print(f"Database URL: {settings.DATABASE_URL}\n")

    # Step 1: Create database
    if not create_database():
        print("\n❌ Failed to create database")
        sys.exit(1)

    # Step 2: Create tables
    if not create_tables():
        print("\n❌ Failed to create tables")
        sys.exit(1)

    print("\n" + "=" * 50)
    print("✅ Database initialization complete!")
    print("=" * 50)
    print("\nYou can now:")
    print("  - Start the API: uvicorn app.main:app --reload")
    print("  - View tables: psql -h localhost -U <user> -d technical_tests -c '\\dt'")


if __name__ == "__main__":
    main()
