# Backend Developer Assignment – Task Manager

This is a simple full-stack project for primetrade.ai as an assignment.
The main goal was to design a secure and scalable REST API and connect it with a basic frontend UI.

---

## Tech Stack

**Backend**
* Node.js + Express
* MongoDB (native driver, no ODM)
* JWT for authentication
* bcrypt for password hashing

**Frontend**
* Next.js (App Router)
* Axios for API calls

---

## Features

### Authentication

* User registration and login
* Passwords are hashed using bcrypt
* JWT based authentication

### Authorization
* Role-based access(user & admin)
* Protected routes using middleware

### Tasks (CRUD)

* Create task
* Get tasks (with search + pagination)
* Update task
* Delete task

Users can manage their own tasks, while admins can access everything.

---

## API Structure

* Versioned routes: `/api/v1/...`
* Example:
  * `POST /api/v1/auth/register`
  * `POST /api/v1/auth/login`
  * `GET /api/v1/tasks`
  * `POST /api/v1/tasks`

---

## Project Structure

backend/
* config/ → DB connection
* controllers/ → logic
* middleware/ → auth, roles, error handling
* routes/ → API routes

frontend/
* app/ → pages (login, register, dashboard)
* lib/ → API setup

---

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/internDB
JWT_SECRET= ...
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## API Testing

I tested APIs using Postman.
You can register → login → copy token → use it in protected routes.

---

## Security Considerations

* Passwords are hashed before storing
* JWT is used for protected routes
* Role-based middleware restricts access
* Basic validation added for inputs

---

## Scalability Notes

* Project is modular (controllers, middleware, routes separated)
* Can be scaled using:

  * Redis for caching
  * Load balancing
  * Microservices (separate auth & task services)
  * Docker for deployment

---

## Notes

* Used MongoDB native driver instead of Mongoose for more control
* Kept frontend simple to focus on backend logic
* Added search and pagination for better API usability

---

## Final Thoughts

This project focuses more on backend design and structure rather than UI.
The goal was to keep things simple but clean and scalable.

---

Thank you for the opportunity :)
