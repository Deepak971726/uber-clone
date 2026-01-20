# 🚗 Uber Clone

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack, real-time ride-hailing application built with the MERN stack, featuring real-time tracking, user authentication integration.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Docs](#-api-endpoints) • [License](#-license)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Key Features Documentation](#-key-features-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This project demonstrates a scalable, production-ready ride-hailing platform similar to Uber. It implements real-time location tracking, dynamic driver-passenger matching, and secure payment processing with a modular, maintainable architecture.

---

## ✨ Features

- ✅ **User Authentication** - JWT-based secure authentication and authorization
- ✅ **Real-time Ride Tracking** - Live location updates using Socket.IO
- ✅ **Driver Matching Algorithm** - Intelligent driver-passenger matching
- ✅ **Google Maps Integration** - Location services and route optimization
- ✅ **Admin Dashboard** - Comprehensive management of users, drivers, and rides
- ✅ **Responsive Design** - Mobile-first UI with Tailwind CSS
- ✅ **WebSocket Support** - Real-time bidirectional communication

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time event-based communication
- **JWT** - Authentication
- **Google Maps API** - Location and mapping services

### DevOps & Tools
- **npm** - Package manager
- **Git** - Version control

---

## 📁 Project Structure

```
uber-clone/
│
├── Backend/
│   ├── controllers/           # Business logic handlers
│   │   ├── captain.controller.js
│   │   ├── user.controller.js
│   │   ├── ride.controller.js
│   │   └── map.controller.js
│   │
│   ├── models/               # Database schemas
│   │   ├── captain.model.js
│   │   ├── user.model.js
│   │   ├── ride.model.js
│   │   └── blacklistToken.model.js
│   │
│   ├── routes/               # API endpoint definitions
│   │   ├── captain.route.js
│   │   ├── users.route.js
│   │   ├── ride.route.js
│   │   └── maps.route.js
│   │
│   ├── service/              # Business logic layer
│   │   ├── captain.service.js
│   │   ├── user.service.js
│   │   ├── ride.service.js
│   │   └── maps.service.js
│   │
│   ├── midllerwares/         # Express middleware
│   │   └── auth.middlerware.js
│   │
│   ├── db/                   # Database configuration
│   │   └── db.js
│   │
│   ├── app.js               # Express app configuration
│   ├── server.js            # Server entry point
│   ├── socket.js            # Socket.IO configuration
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Riding.jsx
│   │   │   ├── CaptainHome.jsx
│   │   │   ├── CaptainLogin.jsx
│   │   │   ├── CaptainSignup.jsx
│   │   │   └── UserProtectWrapper.jsx
│   │   │
│   │   ├── components/      # Reusable UI components
│   │   │   ├── LocationSearchPanel.jsx
│   │   │   ├── VehiclePanel.jsx
│   │   │   ├── ConfirmRide.jsx
│   │   │   ├── LookingForDriver.jsx
│   │   │   ├── WaitingForDriver.jsx
│   │   │   ├── LiveTracking.jsx
│   │   │   └── RidePopup.jsx
│   │   │
│   │   ├── context/         # React Context providers
│   │   │   ├── UserContext.jsx
│   │   │   ├── CaptainContext.jsx
│   │   │   └── SocketContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/              # Static assets
│   ├── vite.config.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

| Requirement | Version | Download |
|------------|---------|----------|
| Node.js    | 14.0+   | [Download](https://nodejs.org/) |
| npm/yarn   | 6.0+    | Included with Node.js |
| MongoDB    | 5.0+    | [Download](https://www.mongodb.com/try/download/community) |
| Git        | Latest  | [Download](https://git-scm.com/) |

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Deepak971726/uber-clone.git
cd uber-clone
```

### Step 2: Backend Setup

```bash
cd Backend
npm install
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/uber-clone

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

 

# Socket.IO
SOCKET_PORT=3001
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_SOCKET_URL=http://localhost:3001
```

---

## ▶️ Running the Application

### Start MongoDB

```bash
# If using MongoDB locally
mongod
```

### Start Backend Server

```bash
cd Backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:4000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/users/register` | Register new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| POST | `/api/users/logout` | Logout user | ✅ |
| POST | `/api/captain/register` | Register new captain | ❌ |
| POST | `/api/captain/login` | Login captain | ❌ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/users/profile` | Get user profile | ✅ |
| PATCH | `/api/users/profile` | Update user profile | ✅ |
| GET | `/api/users` | Get all users | ✅ |

### Ride Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/rides/create` | Create ride request | ✅ |
| GET | `/api/ride/start-ride` | Start ride details | ✅ |
| GET | `/api/rides/end-ride` | End ride status | ✅ |
| POST | `/api/ride/get-fare` | Get fare for ride rides | ✅ |
| GET | `/api/ride/confirm-ride` |confirm ride rides | ✅ |


### Captain/Driver Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/captain/ger-profile` | Get captain profile | ✅ |
| PATCH | `/api/captain/register` | register captain | ✅ |
| GET | `/api/captain/login` | login captain | ✅ |

### Maps Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/maps/get-coordinates` | Get coordinates from address | ✅ |
| GET | `/api/maps/get-distance-time` | Calculate distance & time | ✅ |
| GET | `/api/maps/get-suggestions` | Get location suggestions | ✅ |

---

## 📊 Database Models

### User Model

```javascript
{
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String (unique),
  password: String (hashed),
  socketId: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Captain Model

```javascript
{
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String (unique),
  password: String (hashed),
  socketId: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String
  },
  location: {
    ltd: Number,
    lng: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Ride Model

```javascript
{
  user: ObjectId (ref: User),
  captain: ObjectId (ref: Captain),
  pickupLocation: String,
  destinationLocation: String,
  distance: Number,
  duration: Number,
  fare: Number,
  status: {
    type: String,
    enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'requested'
  },
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blacklist Token Model

```javascript
{
  token: String,
  createdAt: Date,
  expiresAt: Date
}
```

---

## 🎨 Key Features Documentation

### Real-time Tracking
- Live location updates using Socket.IO
- Automatic driver-passenger connection
- Real-time ride status updates

### Authentication & Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Token blacklisting on logout

### Maps Integration
- Google Maps API integration
- Auto-complete location search
- Distance and duration calculation
- Route optimization

 
---

 
### Code Style Guidelines

- Use ES6+ syntax
- Follow consistent naming conventions
- Add comments for complex logic
- Ensure code is properly formatted with ESLint

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

 
<div align="center">

Made with ❤️ by [Deepak971726](https://github.com/Deepak971726)

⭐ If you found this helpful, please consider giving it a star!

</div>

