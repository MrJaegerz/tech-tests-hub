#!/usr/bin/env python3
"""
db_push.py - Équivalent de 'prisma db push'
Crée les tables directement dans PostgreSQL
"""
from app.database import Base, engine
from app.models.test import TechnicalTest
from sqlalchemy import inspect

def main():
    print("🔄 Pushing database schema...\n")

    try:
        # Afficher les tables existantes
        inspector = inspect(engine)
        existing = inspector.get_table_names()

        if existing:
            print(f"📋 Tables existantes: {', '.join(existing)}")
        else:
            print("📋 Aucune table existante")

        # Créer toutes les tables
        print("\n🚀 Creating tables...")
        Base.metadata.create_all(bind=engine)

        # Afficher le résultat
        inspector = inspect(engine)
        tables = inspector.get_table_names()

        print(f"\n✅ Tables créées/synchronisées: {', '.join(tables)}\n")

        # Détails de chaque table
        for table in tables:
            columns = inspector.get_columns(table)
            print(f"📊 Table '{table}':")
            for col in columns:
                nullable = "NULL" if col.get('nullable') else "NOT NULL"
                col_type = str(col['type'])
                print(f"   • {col['name']:<15} {col_type:<20} {nullable}")

            # Indexes
            indexes = inspector.get_indexes(table)
            if indexes:
                print(f"   Indexes:")
                for idx in indexes:
                    print(f"   • {idx['name']}: {', '.join(idx['column_names'])}")
            print()

        print("✅ Database push successful!")
        print("\nVous pouvez maintenant:")
        print("  • Démarrer l'API: uvicorn app.main:app --reload")
        print("  • Tester: python test_api.py")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        return 1

    return 0

if __name__ == "__main__":
    exit(main())
