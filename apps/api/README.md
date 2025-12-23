# Technical Tests API

Backend FastAPI pour gérer les tests techniques.

## 🚀 Quick Start (style npm/prisma)

```bash
# 1. Installer les dépendances
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Push la DB (équivalent de "prisma db push")
python db_push.py

# 3. Démarrer le serveur (équivalent de "npm run dev")
uvicorn app.main:app --reload
```

## 📦 Scripts disponibles

| Commande | Équivalent npm/prisma | Description |
|----------|----------------------|-------------|
| `python db_push.py` | `prisma db push` | Créer/sync les tables |
| `uvicorn app.main:app --reload` | `npm run dev` | Démarrer en mode dev |
| `python test_api.py` | `npm test` | Tester la connexion |
| `alembic revision --autogenerate -m "msg"` | `prisma migrate dev` | Créer une migration |
| `alembic upgrade head` | `prisma migrate deploy` | Appliquer les migrations |

## 🗄️ Base de données

### Configuration actuelle
- **PostgreSQL 15** (local via Homebrew)
- **Database**: `technical_tests`
- **User**: `moi` (votre user macOS)
- **URL**: `postgresql://moi@localhost:5432/technical_tests`

### Commandes utiles

```bash
# Voir les tables
/opt/homebrew/opt/postgresql@15/bin/psql technical_tests -c "\dt"

# Shell PostgreSQL
/opt/homebrew/opt/postgresql@15/bin/psql technical_tests

# Restart PostgreSQL
brew services restart postgresql@15
```

## 🔌 Endpoints

L'API tourne sur **http://localhost:8000**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | API info | ❌ |
| GET | `/health` | Health check | ❌ |
| GET | `/docs` | Swagger UI | ❌ |
| GET | `/api/v1/tests` | Liste des tests | ❌ Public |
| GET | `/api/v1/tests/{id}` | Détail test | ❌ Public |
| POST | `/api/v1/tests` | Créer test | ✅ API Key |
| PUT | `/api/v1/tests/{id}` | Modifier test | ✅ API Key |
| DELETE | `/api/v1/tests/{id}` | Supprimer test | ✅ API Key |

### 🔐 Authentification

**Lecture (GET)** : Publique, pas d'authentification nécessaire
**Écriture (POST/PUT/DELETE)** : Nécessite un header `X-API-Key`

Exemples :
```bash
# Lecture publique - accessible à tous
curl http://localhost:8000/api/v1/tests

# Écriture avec API key - réservé à l'admin
curl -X POST http://localhost:8000/api/v1/tests \
  -H "X-API-Key: your-api-key-here" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "...", "github_url": "...", "result": "SUCCESS"}'
```

## 📖 Documentation interactive

Une fois l'API démarrée:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Tests

```bash
# Tester la connexion DB et les routes
python test_api.py

# Test endpoints avec curl
curl http://localhost:8000/health
curl http://localhost:8000/
```

## 🏗️ Structure

```
apps/api/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Config (Pydantic Settings)
│   ├── database.py          # SQLAlchemy setup
│   ├── dependencies.py      # API Key verification
│   ├── models/
│   │   └── test.py          # Modèle SQLAlchemy
│   ├── schemas/
│   │   └── test.py          # Schémas Pydantic
│   ├── routers/
│   │   ├── health.py        # Health check
│   │   └── tests.py         # CRUD endpoints
│   └── auth/
│       └── jwt.py           # JWT verification
├── alembic/                 # Migrations (comme Prisma)
├── db_push.py              # Push DB (comme prisma db push)
├── test_api.py             # Tests
└── requirements.txt        # Dépendances
```

## 🔐 Modèle de données

```python
# app/models/test.py
class TechnicalTest:
    id: str              # Primary key
    title: str           # Titre du test
    description: str     # Description (nullable)
    github_url: str      # Lien GitHub
    result: str          # SUCCESS | PARTIAL | FAIL
    created_at: datetime # Auto
    updated_at: datetime # Auto
    user_id: str         # User Supabase
```

## 🔑 Variables d'environnement

Fichier `.env`:

```env
DATABASE_URL=postgresql://moi@localhost:5432/technical_tests
API_KEY=dev-api-key-change-me
CORS_ORIGINS=["http://localhost:3000"]
```

**Important** : Changez `API_KEY` en production pour sécuriser les opérations d'écriture.

## 📝 Workflow de dev

1. **Modifier le modèle** dans `app/models/test.py`
2. **Push la DB** avec `python db_push.py` (dev rapide)
   - OU créer une migration: `alembic revision --autogenerate -m "msg"`
3. **Tester** avec `python test_api.py`
4. **Démarrer l'API** avec `uvicorn app.main:app --reload`

## ✅ Status

- [x] Structure FastAPI complète
- [x] PostgreSQL local configuré
- [x] Table `technical_tests` créée
- [x] CRUD endpoints complets
- [x] Auth par API Key (lecture publique, écriture protégée)
- [x] Documentation Swagger
- [x] Tests fonctionnels

🎉 **L'API est 100% opérationnelle en mode partage public!**
