# Stock Genius (Server)

REST API for Stock Genius — JWT auth, inventory CRUD, sales history, and image uploads for shop inventory management.

**Pair with frontend:** [stockGenius-frontend](https://github.com/Stock-Genius/stockGenius-frontend) · Live UI: [https://stockgenius.vercel.app](https://stockgenius.vercel.app)

## Live demo

- UI: [https://stockgenius.vercel.app](https://stockgenius.vercel.app)
- API: host this service (Render/Railway/VPS) and set the frontend `REACT_APP_SERVER_URL`

## Screenshots

<!-- Optional: Postman/API docs screenshots -->
| Auth | Items | Upload |
| --- | --- | --- |
| ![Auth](docs/screenshots/auth.png) | ![Items](docs/screenshots/items.png) | ![Upload](docs/screenshots/upload.png) |

## Key features

- User register/login with bcrypt password hashing and JWT
- Shop profile fields (shop name, address, avatar)
- Admin middleware for privileged user listing
- Inventory items: name, buy/sell price, qty, unit (`kg`/`pcs`), image
- Sell item + sales history (`History` model)
- Multer-based uploads for user and product images (`/uploads` static)
- Seed scripts to import/destroy sample data
- CORS + Morgan (dev) logging

## Tech stack

| Layer | Choice |
| --- | --- |
| Runtime | Node.js (ES modules) |
| Framework | Express 4 |
| DB | MongoDB + Mongoose 8 |
| Auth | JWT (`jsonwebtoken`) + bcryptjs |
| Uploads | Multer |
| Mail (dep) | Nodemailer (available in deps) |
| Tooling | dotenv, colors, morgan |

## Architecture (brief)

```
POST /api/users, /api/users/login     → auth + JWT
GET/PUT /api/users/profile            → protect
GET/POST /api/items                   → protect (CRUD + sell)
POST /api/upload/products|users       → multer
         │
         ▼
      MongoDB (User, Item, History)
```

## Getting started

### Prerequisites

- Node.js 18+
- MongoDB Atlas or local MongoDB

### Install

```bash
git clone https://github.com/Stock-Genius/stockGenius-server.git
cd stockGenius-server
npm install
```

### Environment

Create `.env` (never commit real values):

```bash
PORT=4000
DB_URL=mongodb://127.0.0.1:27017/stockgenius
NODE_ENV=DEVELOPEMENT
JWT_SECRET=change-me-to-a-long-random-string
```

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | HTTP port (default `4000`) |
| `DB_URL` | Yes | MongoDB connection string |
| `NODE_ENV` | No | `DEVELOPEMENT` enables Morgan |
| `JWT_SECRET` | Yes | Secret for signing access tokens |

### Run

```bash
npm run server       # node server.js
# or during local work (uses nodemon if installed globally/local):
npm start

# Seed sample users/items
npm run data:import
npm run data:destroy
```

Health check: `GET /` → `Api is running....`

### Main routes

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/users` | Public | Register |
| POST | `/api/users/login` | Public | Login |
| GET/PUT | `/api/users/profile` | JWT | Profile |
| GET/POST | `/api/items` | JWT | List / add items |
| PUT/DELETE | `/api/items/:id` | JWT | Update / delete |
| GET | `/api/items/sell` | JWT | Sales history |
| PUT/DELETE | `/api/items/sell/:id` | JWT | Sell / undo sell |
| POST | `/api/upload/products` | — | Product image |
| POST | `/api/upload/users` | — | Avatar image |

## Deployment

- Deploy on Render, Railway, or a VPS; set env vars above.
- Point frontend `REACT_APP_SERVER_URL` to the public API origin.
- Persist `uploads/` (or move to S3/Cloudinary).
- Restrict CORS to the Vercel frontend origin in production.

## Roadmap

- [ ] Add `LICENSE`, professional README on GitHub, homepage link to frontend
- [ ] Remove committed `.env`; rotate `JWT_SECRET` if ever exposed
- [ ] Fix typo `DEVELOPEMENT` → `development`
- [ ] Add nodemon as a proper devDependency; production `start` = `node server.js`
- [ ] Automated tests + GitHub Actions
- [ ] OpenAPI/Swagger docs

## Author

**Hafiz Abdullah** — [GitHub](https://github.com/hafizabdullah1) · [hafizabdullah.site](https://hafizabdullah.site)
