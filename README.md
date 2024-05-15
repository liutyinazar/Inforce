# Inforce Test

This project developed using FastAPI on the backend with PostgreSQL as the database and SQLAlchemy ORM for database operations. The frontend is built using React with TypeScript, styled with Ant Design, and communicates with the backend via Axios.

## Features

### Backend (FastAPI + PostgreSQL + SQLAlchemy ORM)

- The backend provides endpoints for adding, editing, and deleting products.
- Implements a RESTful API to interact with product data stored in the PostgreSQL database.
-  Utilizes FastAPI, a modern, fast (high-performance), web framework for building APIs with Python 3.7+.

### Frontend (React + TypeScript + Ant Design + Axios)

- **Product Management UI**: The frontend allows users to perform CRUD operations on products, including adding, and deleting products. (Without editing)
- **TypeScript**: Enhances code maintainability and scalability by adding static typing to JavaScript.
- **Axios**: Handles HTTP requests to interact with the backend API endpoints.


## Getting Started

### Backend Setup

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `pip install -r requirements.txt`.
4. Configure the PostgreSQL database connection in `.env`.
5. Run the FastAPI server using `uvicorn main:app --reload`.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the development server using `npm start`.

