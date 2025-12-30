# Jewelry API (Express + Prisma + Postgres)

## Setup
1) Copy `.env.local` from the below template and fill in your DB:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
ORIGIN="http://localhost:5173"
```
2) Install deps:
```
cd api
npm install
```
3) Generate Prisma client and run migrations:
```
npx prisma generate
npx prisma migrate dev --name init
```
4) Run the API:
```
npm run dev
```
Default port: `4000`.

## Routes
- `GET /health` – health check
- `POST /orders` – create order:
```json
{
  "user": { "name": "Jane", "email": "jane@example.com", "phone": "123" },
  "items": [
    { "productId": "1", "name": "Diamond Ring", "price": 249900, "quantity": 1, "image": "https://...", "meta": { "metal": "Platinum" } }
  ],
  "shipping": { "address": "...", "city": "...", "country": "..." },
  "notes": "Ring size 6.5"
}
```
Response includes the created order with items and user.

