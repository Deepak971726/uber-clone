# Uber Clone

This repository contains the source code for an Uber-like ride-hailing application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project is designed to demonstrate a scalable and modular architecture for modern web applications.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Models](#models)
- [Getting Started](#getting-started)
- [License](#license)

---

## Features

- User authentication and authorization (JWT-based).
- Real-time ride requests and driver tracking.
- Integration with Google Maps API for location services.
- Payment processing (e.g., Stripe integration).
- Admin dashboard for managing users, rides, and drivers.

---

## Technologies Used

- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **APIs**: Google Maps API, Stripe API

---

## Project Structure

```
uber-clone/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── config/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── README.md
└── .env
```

---

## Endpoints

### Authentication

- **POST /api/auth/register**  
    Registers a new user.  
    **Request Body**: `{ name, email, password }`  
    **Response**: `{ token, user }`

- **POST /api/auth/login**  
    Logs in a user.  
    **Request Body**: `{ email, password }`  
    **Response**: `{ token, user }`

### Rides

- **POST /api/rides/request**  
    Creates a new ride request.  
    **Request Body**: `{ pickupLocation, dropoffLocation, userId }`  
    **Response**: `{ rideId, status }`

- **GET /api/rides/:id**  
    Fetches details of a specific ride.  
    **Response**: `{ rideDetails }`

### Drivers

- **GET /api/drivers/available**  
    Fetches a list of available drivers.  
    **Response**: `{ drivers }`

- **PATCH /api/drivers/:id/status**  
    Updates the status of a driver (e.g., online/offline).  
    **Request Body**: `{ status }`  
    **Response**: `{ driver }`

---

## Models

### User Model

```javascript
{
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'driver', 'admin'], default: 'user' },
    createdAt: Date
}
```

### Ride Model

```javascript
{
    userId: ObjectId,
    driverId: ObjectId,
    pickupLocation: String,
    dropoffLocation: String,
    status: { type: String, enum: ['requested', 'accepted', 'completed', 'cancelled'] },
    fare: Number,
    createdAt: Date
}
```

### Driver Model

```javascript
{
    name: String,
    email: String,
    status: { type: String, enum: ['online', 'offline'], default: 'offline' },
    location: String,
    createdAt: Date
}
```

---

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
     ```bash
     git clone https://github.com/Deepak971726/uber-clone.git
     ```
2. Navigate to the backend and frontend directories and install dependencies:
     ```bash
     cd backend && npm install
     cd ../frontend && npm install
     ```
3. Set up environment variables in a `.env` file.

4. Start the development servers:
     ```bash
     npm run dev
     ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

