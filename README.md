# MERN Stack Product Management System

A full-stack product management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Create, read, update, and delete products
- RESTful API architecture
- MongoDB database integration
- Modern React frontend
- Production-ready build configuration

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables

### Frontend

- React.js
- Modern JavaScript (ES6+)
- Production build optimization

## Project Structure

```
mern-crash-course/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   └── dist/ (production build)
└── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mern-crash-course
```

2. Install backend dependencies:

```bash
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Available Scripts

In the project directory, you can run:

### Development

```bash
npm run dev
```

Runs the backend server in development mode with hot-reload.

### Production Build

```bash
npm run build
```

Installs all dependencies and builds the frontend for production.

### Production Start

```bash
npm run start
```

Runs the application in production mode.

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Environment Variables

The following environment variables are required:

- `PORT`: The port number for the server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment mode (development/production)

## License

ISC
