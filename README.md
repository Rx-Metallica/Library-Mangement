# Library Management System (MERN)

A simple Library Management System built with the MERN stack (MongoDB, Express, React, Node). This project provides a RESTful API backend and a React frontend to manage books, users, and loans/borrows.

Table of contents

- Project Overview
- Features
- Tech Stack
- Architecture
- Quick Start
  - Prerequisites
  - Clone & Install
  - Environment Variables
  - Run (Development)
  - Run (Production)
- API Overview (examples)
- Database Models (summary)
- Scripts
- Testing
- Deployment
- Contributing
- License
- Contact

Project Overview

This project aims to demonstrate a full-stack application for managing a library's core operations: cataloging books, managing users/members, and tracking loans. The backend exposes REST endpoints and connects to MongoDB. The frontend (React) consumes the API to provide an admin and user interface.

Features

- User authentication (register, login, role-based access for admin/librarian/user)
- CRUD for books (create, read, update, delete)
- Manage users and roles
- Issue and return books (loan management)
- Search and filter books
- Basic validation and error handling
- Configurable to use MongoDB Atlas or local MongoDB

Tech Stack

- MongoDB (database)
- Express (API)
- React (frontend)
- Node.js (runtime)
- Mongoose (ODM)
- JWT for authentication

Architecture

- /backend - Express API, controllers, models, routes
- /frontend - React app (Create React App or Vite)
- /config - environment and connection helpers
- /scripts - seed or utility scripts

Quick Start

Prerequisites

- Node.js >= 14 (recommended latest LTS)
- npm or yarn
- MongoDB (local) or MongoDB Atlas connection

Clone & Install

1. Clone the repo:

   git clone https://github.com/Rx-Metallica/Library-Mangement.git
   cd Library-Mangement

2. Install dependencies for backend and frontend (if split):

   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install

Environment Variables

Create a .env file in the backend folder (and frontend if needed). Example .env (backend):

PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development

Frontend (if required):
REACT_APP_API_URL=http://localhost:5000/api

Run (Development)

# Start backend (from backend folder)
npm run dev

# Start frontend (from frontend folder)
npm start

If you have a monorepo dev script that starts both, run from project root:

npm run dev

Run (Production)

# Build frontend
cd frontend
npm run build

# Start backend (ensure it serves static files from build)
cd ../backend
npm start

API Overview (examples)

Auth
- POST /api/auth/register - register a new user
- POST /api/auth/login - login, returns JWT

Users (admin)
- GET /api/users - list users
- GET /api/users/:id - get user
- PUT /api/users/:id - update user
- DELETE /api/users/:id - delete user

Books
- GET /api/books - list books (query: search, author, category, available)
- POST /api/books - create a new book (admin/librarian)
- GET /api/books/:id - get details
- PUT /api/books/:id - update book
- DELETE /api/books/:id - delete book

Loans / Borrows
- POST /api/loans - issue a book to a user
- PUT /api/loans/:id/return - mark a loan as returned
- GET /api/loans - list loans (filter by user, status)

Database Models (summary)

User
- _id
- name
- email (unique)
- password (hashed)
- role (admin | librarian | user)
- createdAt, updatedAt

Book
- _id
- title
- authors
- isbn
- category
- copiesTotal
- copiesAvailable
- description
- publishedAt
- createdAt, updatedAt

Loan
- _id
- userId (ref User)
- bookId (ref Book)
- issuedAt
- dueDate
- returnedAt
- status (issued | returned | overdue)

Scripts

- npm run dev - start development server with nodemon (backend) and concurrently (optional)
- npm start - start production server
- npm run build - build frontend
- npm run seed - seed sample data (if present)

Testing

- If tests are present, run:
  npm test

Deployment

- Use MongoDB Atlas for a hosted DB and set MONGODB_URI accordingly.
- Configure CI/CD to build frontend and run backend.
- Example (Heroku, Vercel, DigitalOcean): serve frontend build from backend or use separate hosting.

Environment and security

- Keep JWT_SECRET and DB credentials out of source control.
- Use HTTPS in production.
- Validate and sanitize user input before DB operations.

Contributing

Contributions are welcome. Please follow these steps:
1. Fork the repository
2. Create a feature branch: git checkout -b feature/your-feature
3. Commit your changes
4. Push to your fork and open a PR

License

This project is provided under the MIT License. Update as needed.

Contact

For questions or help, open an issue or contact the repo owner.


--
README generated and added by GitHub Copilot Chat Assistant.