# Hyperlocal Store App

A full-stack web application that allows users to browse nearby stores, view available fruits and vegetables, add items to their cart, and place an order. Built with **Node.js**, **Express.js**, **MongoDB**, and **React.js**.

---

## Features

- Home Page: Browse a list of nearby hyperlocal stores.
- Store Page: View products for a selected store.
- Cart Page: Add, review, and modify cart items.
- Checkout Page: Submit order with customer name.
- Confirmation Page: See order success message.

---

## Tech Stack

### Frontend

-**React.js** with functional components
**Tailwind CSS** for styling -**Axios** for API calls
Global state using Context API

### Backend

- **Node.js** with **Express.js**
- RESTful API architecture
- CORS dotenv for environment configuration
- Basic input validations

### Database

- **MongoDB**
- Mongoose ODM for modeling application data

---

## Folder Structure

```
zakoop/
│
├── backend/               # Express.js API server
│   ├── models/            # Mongoose models
│   ├── routes/            # API route handlers
│   ├── controllers/       # logic controllers
│   ├── services/          # Business logic
│   └── server.ts          # App entry point
│
├── frontend/              # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-specific pages
│   │   ├── context/       # Global state (Cart)
│   │   └── App.js
│
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm

---

### Backend Setup

```bash
cd backend
npm install
# Create a .env file
touch .env
```

**.env**

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/zakoop
FRONTEND_URL=http://localhost:5173
```

```bash
# Start the server
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | /api/v1/store                    | List all stores          |
| GET    | /api/v1/product?shopId=""&page=1 | Get products for a store |
| POST   | /api/v1/order                    | Submit an order          |

---
