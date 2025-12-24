# Technical Tests Web

> Frontend Next.js 16 pour le portfolio de tests techniques

## 🚀 Quick Start

```bash
# Installer les dépendances
pnpm install

# Configurer l'environnement
cp .env.local.example .env.local

# Démarrer le serveur de développement
pnpm dev
```

→ http://localhost:3000

## 📦 Scripts

| Commande     | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Serveur de développement |
| `pnpm build` | Build de production      |
| `pnpm start` | Serveur de production    |
| `pnpm lint`  | Linter ESLint            |

## 🏗️ Structure

```
app/
├── (public)/               # Pages publiques
│   ├── page.tsx            # Landing page
│   ├── tests/              # Liste et détails des tests
│   └── examples/           # Exemples de tests techniques
├── globals.css             # Styles globaux + Tailwind
└── layout.tsx              # Layout racine

components/
├── ui/                     # Composants shadcn/ui
├── header.tsx              # Header navigation
├── theme-provider.tsx      # Provider dark mode
└── theme-toggle.tsx        # Toggle dark/light

lib/
├── api.ts                  # Client API FastAPI
└── utils.ts                # Utilitaires (cn, etc.)
```

## 🎨 Stack UI

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS
- **Components** : shadcn/ui
- **Icons** : Lucide React
- **Markdown** : react-markdown + rehype-highlight

## 🔧 Configuration

### Variables d'environnement (`.env.local`)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📱 Pages

| Route         | Description                |
| ------------- | -------------------------- |
| `/`           | Landing page               |
| `/tests`      | Liste des tests techniques |
| `/tests/[id]` | Détail d'un test           |
| `/examples/*` | Exemples interactifs       |
