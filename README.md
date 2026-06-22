# Product Browser API

A production-ready backend built with **Node.js, Express, Prisma, and PostgreSQL** that allows browsing, filtering, and paginating through 200,000+ products efficiently.

## Tech Stack

- Node.js
- Express
- PostgreSQL (Supabase)
- Prisma ORM
- Render (Hosting)
- Faker.js (Mock data generation)

---

## Features

- Browse products ordered by newest first.
- Filter products by category.
- Cursor-based pagination (no OFFSET).
- Handles changing data without duplicates or missing records.
- Efficient database queries with indexes.
- Health check endpoint.
- Seed script for generating 200,000 mock products.

---

## Project Structure

```text
src/
├── app.js
├── server.js
├── controllers/
│   └── productController.js
├── routes/
│   └── index.js
├── services/
│   └── productService.js
├── middleware/
│   └── errorHandler.js
├── utils/
│   └── cursor.js
└── prisma/
    └── seed.js
```

---

## Database Schema

### Product

| Field      | Type      |
| ---------- | --------- |
| id         | BIGINT    |
| name       | String    |
| category   | String    |
| price      | Decimal   |
| created_at | Timestamp |
| updated_at | Timestamp |

---

## API Endpoints

### Get Products

```http
GET /products
```

Returns newest products first.

---

### Get Next Page

```http
GET /products?cursor=<cursor>
```

Returns the next page using cursor pagination.

---

### Filter By Category

```http
GET /products?category=Electronics
```

---

### Category + Cursor

```http
GET /products?category=Electronics&cursor=<cursor>
```

---

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "OK"
}
```

---

## Pagination Strategy

This project uses **cursor (keyset) pagination** instead of OFFSET pagination.

Ordering:

```sql
ORDER BY updated_at DESC, id DESC
```

### Why not OFFSET?

OFFSET pagination can produce duplicate or missing records when new products are inserted or updated while users are browsing.

Cursor pagination provides:

- Consistent ordering
- No duplicate products
- No missing products
- Better performance on large datasets

---

## Database Indexes

### Pagination Index

```sql
(updated_at DESC, id DESC)
```

Used for:

```http
GET /products
```

---

### Category + Pagination Index

```sql
(category, updated_at DESC, id DESC)
```

Used for:

```http
GET /products?category=Electronics
```

These indexes improve query performance and avoid full table scans.

---

## Seed Script

200,000 mock products are generated using:

- @faker-js/faker
- Prisma createMany()

Products are inserted in batches for better performance.

Run:

```bash
npm run seed
```

---

## Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create .env:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Run migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Run seed:

```bash
npm run seed
```

Start server:

```bash
npm run dev
```

---

## Deployment

### Database

Supabase PostgreSQL

### Backend

Render

---

## Main Dependencies

```json
express
prisma
@prisma/client
dotenv
cors
@faker-js/faker
swagger-ui-express
yamljs
nodemon
```

---

## Why These Choices?

### PostgreSQL

Provides strong consistency, powerful indexing, and excellent support for sorting and filtering large datasets.

### Prisma

Simplifies database access and provides type-safe queries.

### Node.js + Express

Provides simple and efficient API development with non-blocking I/O.

### Supabase

Managed PostgreSQL with a free tier and minimal operational overhead.

### Render

Simple deployment with GitHub integration.

---

## AI Usage

AI tools such as ChatGPT and Cursor were used to accelerate development and validate implementation ideas.

AI-generated suggestions were reviewed, tested, and modified where necessary.

Initially, offset pagination was considered, but cursor pagination was chosen because it guarantees consistent results when data changes during browsing.

---

## Future Improvements

- Search by product name
- Price filters
- Sorting options
- Redis caching
- Authentication
- Unit tests
- Docker support

---

## Live URL

```text
https://your-render-url.onrender.com
```

---

## Author

Rishab Saini