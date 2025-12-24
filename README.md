# Technical Tests Portfolio

> Portfolio personnel + plateforme de gestion de tests techniques | Monorepo Next.js + FastAPI

## 🎯 Objectif

Application full-stack permettant de :

- Présenter publiquement mes projets et compétences
- Gérer mes tests techniques (CRUD avec GitHub links + résultats)
- Apprendre FastAPI/Python tout en utilisant Next.js pour le frontend

## 🏗️ Architecture

```
technical-tests/
├── apps/
│   ├── web/              # Next.js 16 (TypeScript strict)
│   └── api/              # FastAPI (Python 3.11+)
├── pnpm-workspace.yaml   # Config monorepo pnpm
└── README.md
```

**Stack :**

- **Frontend** : Next.js 16, TypeScript, shadcn/ui, Tailwind, Supabase Auth
- **Backend** : FastAPI, SQLAlchemy 2.0, Alembic, Pydantic v2
- **Database** : PostgreSQL (local / Supabase prod)
- **Deploy** : Vercel (frontend) + Railway (backend)

## 🚀 Quick Start

### Prérequis

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Compte Supabase (gratuit)

### 1. Clone & Install

```bash
# Clone le repo
git clone <repo-url>
cd technical-tests

# Install frontend
cd apps/web
npm install

# Install backend
cd ../api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Setup Database

```bash
# S'assurer que PostgreSQL tourne localement
# macOS: brew services start postgresql@15
# Linux: sudo systemctl start postgresql

# Créer la base de données
psql -c "CREATE DATABASE technical_tests;"
```

### 3. Configuration

#### Frontend (`apps/web/.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### Backend (`apps/api/.env`)

```bash
DATABASE_URL=postgresql://techtest:techtest@localhost:5432/technical_tests
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
CORS_ORIGINS=["http://localhost:3000"]
```

**Note :** Le JWT secret Supabase se trouve dans : Project Settings > API > JWT Secret (sous "JWT Settings")

### 4. Run Migrations

```bash
cd apps/api
source venv/bin/activate
alembic upgrade head
```

### 5. Start Development

**Option A : 2 terminaux séparés**

```bash
# Terminal 1 - Frontend
cd apps/web
npm run dev
# → http://localhost:3000

# Terminal 2 - Backend
cd apps/api
source venv/bin/activate
uvicorn app.main:app --reload
# → http://localhost:8000
# → API Docs: http://localhost:8000/docs
```

**Option B : Script unique (avec concurrently)**

```bash
# À la racine
npm install  # Install concurrently
npm run dev  # Lance web + api en parallèle
```

## 📁 Structure détaillée

### Frontend (`/apps/web`)

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── (public)/
│   ├── layout.tsx          # Layout public
│   └── page.tsx            # Landing page
└── dashboard/
    ├── layout.tsx          # Protected layout
    ├── page.tsx            # Liste des tests
    └── tests/
        ├── [id]/page.tsx   # Détail test
        └── new/page.tsx    # Créer test

components/
├── ui/                     # shadcn/ui components
├── forms/
│   └── create-test-form.tsx
└── dashboard/
    ├── test-card.tsx
    └── test-list.tsx

lib/
├── api/
│   ├── client.ts           # API client avec JWT
│   └── tests.ts            # Tests API calls
├── supabase/
│   ├── client.ts
│   └── server.ts
├── types/
│   └── api.ts              # Types responses API
└── validations/
    └── test.ts             # Zod schemas
```

### Backend (`/apps/api`)

```
app/
├── main.py                 # FastAPI app + CORS
├── config.py               # Pydantic Settings
├── database.py             # SQLAlchemy setup
├── dependencies.py         # get_db, get_current_user
├── models/
│   └── test.py             # SQLAlchemy models
├── schemas/
│   └── test.py             # Pydantic schemas
├── routers/
│   ├── health.py
│   └── tests.py
└── auth/
    └── jwt.py              # JWT verification

alembic/
├── versions/               # Migrations
└── env.py

tests/                      # Pytest (future)
```

## 🔐 Authentification

### Flow

1. User login via Supabase (frontend)
2. Supabase retourne JWT access token
3. Frontend stocke JWT et l'envoie dans chaque requête API
4. Backend vérifie JWT avec clé Supabase

### Protection des routes

**Frontend (middleware.ts)**

```typescript
// Redirect vers /login si non authentifié sur /dashboard/*
```

**Backend (dependencies.py)**

```python
# Chaque endpoint protégé utilise Depends(get_current_user)
@router.get("/tests")
async def get_tests(user_id: str = Depends(get_current_user)):
    # user_id extrait du JWT
```

## 🗄️ Database Schema

```sql
CREATE TABLE technical_tests (
    id VARCHAR PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_url VARCHAR(500) NOT NULL,
    result VARCHAR(20) NOT NULL,           -- SUCCESS, PARTIAL, FAIL
    test_type VARCHAR(50),                 -- UI, API, BACKEND, ALGORITHM, FULLSTACK
    requirements_markdown TEXT,            -- Instructions du test (Markdown)
    solution_files JSON,                   -- [{path, content, language}]
    demo_url VARCHAR(500),                 -- URL démo live
    review_ia TEXT,                        -- Review IA (Markdown)
    example_path VARCHAR(500),             -- Chemin vers /examples
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    user_id VARCHAR NOT NULL
);

CREATE INDEX idx_technical_tests_user_id ON technical_tests(user_id);
CREATE INDEX idx_technical_tests_created_at ON technical_tests(created_at);
```

## 🌐 API Endpoints

| Method | Endpoint             | Description          | Auth |
| ------ | -------------------- | -------------------- | ---- |
| GET    | `/health`            | Health check         | ❌   |
| GET    | `/api/v1/tests`      | Liste des tests user | ✅   |
| GET    | `/api/v1/tests/{id}` | Détail d'un test     | ✅   |
| POST   | `/api/v1/tests`      | Créer un test        | ✅   |
| PUT    | `/api/v1/tests/{id}` | Modifier un test     | ✅   |
| DELETE | `/api/v1/tests/{id}` | Supprimer un test    | ✅   |

**Swagger UI :** http://localhost:8000/docs

## 🧪 Testing (Future)

### Frontend

```bash
cd apps/web
npm run test        # Vitest
npm run test:e2e    # Playwright
```

### Backend

```bash
cd apps/api
pytest              # Tests unitaires + intégration
pytest --cov        # Avec coverage
```

## 📦 Database Management

### Créer une migration

```bash
cd apps/api
alembic revision --autogenerate -m "add result_note column"
# Vérifier le fichier dans alembic/versions/
alembic upgrade head
```

### Rollback

```bash
alembic downgrade -1  # Rollback 1 migration
alembic downgrade base  # Rollback tout
```

### Accéder à PostgreSQL

```bash
psql -h localhost -U <user> -d technical_tests
```

## 🚢 Deployment

### Frontend (Vercel)

1. Connecter le repo GitHub
2. **Root Directory** : `apps/web`
3. **Framework Preset** : Next.js
4. **Environment Variables** :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   NEXT_PUBLIC_API_URL=https://xxx.up.railway.app
   ```

### Backend (Railway)

1. Connecter le repo GitHub
2. **Root Directory** : `apps/api`
3. **Start Command** : `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables** :
   ```
   DATABASE_URL=postgresql://...
   SUPABASE_JWT_SECRET=xxx
   CORS_ORIGINS=["https://xxx.vercel.app"]
   ```

### Database

**Option 1 : Supabase PostgreSQL**

- Gratuit jusqu'à 500MB
- Utiliser `DATABASE_URL` depuis Supabase Project Settings

**Option 2 : Railway PostgreSQL**

- Add plugin "PostgreSQL"
- Utiliser `DATABASE_URL` fournie

## 🛠️ Scripts utiles

### Frontend

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

### Backend

```bash
uvicorn app.main:app --reload       # Dev server avec hot reload
uvicorn app.main:app --host 0.0.0.0 --port 8000  # Prod

# Code quality
black .              # Format code
ruff check .         # Lint
mypy .               # Type checking

# Database
alembic upgrade head           # Apply migrations
alembic downgrade -1           # Rollback
alembic revision --autogenerate -m "msg"  # Create migration
```

## 🐛 Troubleshooting

### Port déjà utilisé

```bash
# Tuer le processus sur port 3000
lsof -ti:3000 | xargs kill -9

# Tuer le processus sur port 8000
lsof -ti:8000 | xargs kill -9
```

### PostgreSQL connection refused

```bash
# Vérifier que PostgreSQL tourne
# macOS:
brew services list | grep postgresql
brew services restart postgresql@15

# Linux:
sudo systemctl status postgresql
sudo systemctl restart postgresql
```

### JWT Invalid

- Vérifier que `SUPABASE_JWT_SECRET` correspond bien à la clé dans Supabase
- Vérifier que le JWT n'est pas expiré (Supabase : 1h par défaut)
- Check la présence du header `Authorization: Bearer <token>`

### CORS Error

- Vérifier `CORS_ORIGINS` dans `/apps/api/.env`
- En dev : `["http://localhost:3000"]`
- En prod : `["https://xxx.vercel.app"]` (pas de trailing slash)

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [SQLAlchemy 2.0](https://docs.sqlalchemy.org/en/20/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🗺️ Roadmap

**Phase 1 (MVP) :** ✅

- [x] Setup monorepo (pnpm workspace)
- [x] API FastAPI avec CRUD tests
- [x] Landing page publique
- [x] Liste et détail des tests
- [x] Affichage review IA
- [x] Exemples interactifs

**Phase 2 :**

- [ ] Auth Supabase
- [ ] Dashboard admin
- [ ] Filtres + search
- [ ] Pagination

**Phase 3 :**

- [ ] Tags/catégories sur tests
- [ ] Système de notation
- [ ] Statistiques (graphiques)
- [ ] Export PDF

## 📄 License

MIT

## 👤 Author

Aimé Koutsimouka

Full-Stack Developer | React · TypeScript | Applications métiers & plateformes web 💼⚙️

- Stack : Next.js, FastAPI, Python

---

**Happy coding! 🚀**
