# Billing Management System (React + Node.js + MongoDB)

This repository now includes a full-stack starter application for billing and account-related workflows.

## Features included
- Inventory page for **Poha** and **Murmura** stock entry.
- Customer management page with **location** and other details.
- Billing/account backend APIs with invoice model and endpoints.

## Project structure
```
billing-management-system/
  backend/
    models/
    routes/
    server.js
  frontend/
    src/pages/
    src/services/
```

## Backend setup (Node.js + Express + MongoDB)
```bash
cd billing-management-system/backend
cp .env.example .env
npm install
npm run dev
```

Environment variables in `.env`:
- `PORT=5000`
- `MONGODB_URI=mongodb://localhost:27017/billing_management`

### Backend API endpoints
- `GET /api/health`
- `GET /api/inventory`
- `POST /api/inventory`
- `GET /api/customers`
- `POST /api/customers`
- `GET /api/billing/invoices`
- `POST /api/billing/invoices`

## Frontend setup (React + Vite)
```bash
cd billing-management-system/frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and expects backend at `http://localhost:5000`.

## Push this repo to your GitHub account
```bash
GITHUB_TOKEN=<your_token> scripts/push_current_repo_to_github.sh billing-management-system private
```
