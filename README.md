> **ℹ️ Note:**
> Throughout this project, you'll notice a special formatting style and spacing for classes, methods, and code structure. This is intentional! The goal is to make the code as clear and readable as possible for everyone—including recruiters, collaborators, and learners. Enjoy the clean code experience! 🚀

# BookerX

**BookerX** is a modern, full-stack application to manage your book collection. It demonstrates a clean, professional architecture using ASP.NET Core Web API (with Entity Framework Core & SQLite) for the backend, and React (with Vite) for the frontend. The project is designed to be easy to run, understand, and extend—perfect for learning or showcasing your skills to recruiters.

---

## 📚 Project Structure

```
BookerX/
├── BookerXBackend/        # ASP.NET Core Web API (.NET 9, EF Core, SQLite)
│   ├── Controllers/
│   ├── Models/
│   ├── Program.cs
│   ├── appsettings.json
│   └── ...
├── bookerx-frontend/      # React + Vite frontend
│   ├── src/
│   │   ├── context/BookContext.jsx   # Centralized state for all book lists (dashboard, my books, my history)
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---

## 🚀 Quick Start

### 1. Requirements
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Clone the repository
```bash
git clone https://github.com/yourusername/BookerX.git
cd BookerX
```

### 3. Setup & Run the Backend (API)
```bash
cd BookerXBackend
# Restore dependencies
dotnet restore
# Apply migrations & create SQLite DB
dotnet ef database update
# Run the API (by default: http://localhost:5000)
dotnet run
```

### 4. Setup & Run the Frontend (React)
```bash
cd bookerx-frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🔑 Authentication
- Register a new user via `/api/auth/register`
- Login via `/api/auth/login` to receive a JWT token
- Use the JWT as a Bearer token in the `Authorization` header for all protected endpoints

**Example:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "demo",
  "password": "yourpassword"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

## 📦 API Endpoints (CRUD Example)
- `GET /api/books` — List all books
- `GET /api/books/{id}` — Get a book by ID
- `POST /api/books` — Add a new book
- `PUT /api/books/{id}` — Update a book
- `DELETE /api/books/{id}` — Delete a book

All endpoints (except register/login) require JWT authentication.

---

## 🛠️ Technologies Used
- **Backend:** ASP.NET Core 9, Entity Framework Core, SQLite, JWT
- **Frontend:** React, Vite, Axios
- **Dev Tools:** Visual Studio, VS Code, Git

---

## 📦 Dependencies & What They Do

### Backend (ASP.NET Core)
- **Microsoft.AspNetCore.Authentication.JwtBearer**: Enables JWT authentication for securing API endpoints.
- **Microsoft.AspNetCore.OpenApi**: Adds OpenAPI/Swagger support for automatic API documentation and testing.
- **Microsoft.EntityFrameworkCore.Sqlite**: Entity Framework Core provider for SQLite, allowing lightweight local database storage.
- **Microsoft.EntityFrameworkCore.Tools**: Development tools for EF Core (migrations, database management, etc.).

### Frontend (React)
- **Bootstrap**: Used for fast, responsive, and modern UI design without writing custom CSS.

---

## 🧪 Testing the API
You can use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints.

**Example with curl:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"yourpassword"}'
```

---

## ✅ Fonctionnalités réalisées
- Authentification JWT (register, login, logout)
- Ajout, édition, suppression de livres (CRUD)
- Affichage des livres (dashboard, my books)
- Gestion des rôles utilisateur (admin/user, en cours)
- Formulaire d’ajout/édition avec image et URL du livre
- Affichage conditionnel des boutons Edit/Delete selon l’auteur
- Sécurité : l’auteur d’un livre est toujours l’utilisateur connecté
- Centralized book list management with React Context (BookContext) for dashboard, my books, and my history
- UI responsive avec Bootstrap

---

## ⚠️ Limitations / TODO / Temporaire
- **Achat de livre :** Le bouton “Buy” affiche seulement une alerte “Book successfully bought!” (aucune logique d’achat réelle pour l’instant)
- **Edition avancée :** L’édition d’un livre ouvre un formulaire modal simple (pas de navigation dédiée, pas de validation avancée)
- **Suppression :** Confirmation simple, pas de gestion d’erreur avancée
- **Upload d’image :** Non implémenté (champ imageUrl seulement)
- **Pagination et recherche avancée :** Non implémentées (recherche simple côté client)
- **Gestion de profil utilisateur :** Non implémentée
- **Mot de passe oublié / reset :** Non implémenté
- **Tests unitaires frontend/backend :** Non exhaustifs ou à compléter
- **Support mobile :** UI responsive mais non optimisée mobile à 100%
- **Dockerisation / déploiement cloud :** Non fait
- **Multi-langue :** Non fait
- **Sécurité avancée :** Pas de vérification anti-CSRF, pas de throttling

---

## 👤 Author & Contact
- **Email:** kingiscoding@gmail.com
- **WhatsApp:** +233535610908
- **Portfolio:** [kingweb.pythonanywhere.com](https://kingweb.pythonanywhere.com)

Feel free to reach out for questions, suggestions, or collaboration!

---

## 🧹 Clean Code & Best Practices
- All code is commented and structured for clarity
- No unnecessary files or secrets are committed
- Only free, lightweight tools are used (SQLite, no SQL Server)
- CORS and HTTPS are configured for smooth local demo

---

## 📖 License
MIT (Feel free to use, learn, and adapt!) 