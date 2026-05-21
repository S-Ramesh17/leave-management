# Leave Management System

This is a basic full stack MERN project for managing employee leave requests. It allows employees to apply for leave and admins to approve or reject them.


## Project Structure

The project has two main parts:

* client → React frontend
* server → Node.js and Express backend

Inside client:

* components → reusable UI components
* pages → login, register, dashboards
* services → API calls

Inside server:

* controllers → logic for auth and leave
* models → MongoDB schemas
* routes → API routes
* db.js → database connection
* index.js → main server file


## Setup

### Backend

Go to server folder:

```
cd server
```

Create a .env file and add:

```
MONGO_URI=your_mongodb_uri
PORT=5000
```

Install and run:

```
npm install
npm run dev
```


### Frontend

Open new terminal:

```
cd client
npm install
npm start
```

App will run on localhost:3000


## Default Accounts

Admin
[admin@test.com](mailto:admin@test.com)
1234

Employee
[user@test.com](mailto:user@test.com)
1234


## Features

* User registration and login
* Employee can apply for leave
* Admin can view all leave requests
* Admin can approve or reject leave
* Status is updated for employee


## How it works

Employee logs in and applies for leave
Admin logs in and checks requests
Admin approves or rejects
Employee can see the updated status


## Tech used

React for frontend
Node.js and Express for backend
MongoDB for database
Axios for API calls
bcryptjs for password hashing

---
