# Leave Management System

A beginner-friendly full-stack MERN app for managing employee leave requests.

---

## Folder Structure

```
leave-management/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── LeaveCard.js
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── EmployeeDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leaveController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Leave.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leaveRoutes.js
│   ├── db.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Step 1: Get MongoDB Atlas URI

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Allow IP access (0.0.0.0/0)
5. Copy connection string

Example:

```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/leavemanagement?retryWrites=true&w=majority
```

---

### Step 2: Backend Setup

```
cd server
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=your_mongodb_uri
PORT=5000
```

Run:

```
npm install
npm run dev
```

---

### Step 3: Frontend Setup

```
cd client
npm install
npm start
```

App runs at:

```
http://localhost:3000
```

---

## Default Login

Admin
Email: [admin@test.com](mailto:admin@test.com)
Password: 1234

Employee
Email: [user@test.com](mailto:user@test.com)
Password: 1234

---

## API Endpoints

POST   /api/auth/register
POST   /api/auth/login
POST   /api/leaves
GET    /api/leaves
PUT    /api/leaves/:id

---

## Flow

Employee registers or logs in
Employee applies for leave
Admin logs in
Admin views all leave requests
Admin approves or rejects
Employee sees updated status

---

## Deployment

Backend (Render):

* Push to GitHub
* Create Web Service
* Root: server
* Build: npm install
* Start: node index.js
* Add MONGO_URI

Frontend (Vercel):

* Import repo
* Root: client
* Update API base URL
* Deploy

---

## Tech Stack

Frontend: React
Backend: Node.js, Express
Database: MongoDB Atlas
Auth: localStorage
HTTP: Axios
Password: bcryptjs

---

## Packages

Backend:
express
mongoose
bcryptjs
cors
dotenv
nodemon

Frontend:
react
react-dom
axios
react-scripts
