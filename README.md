# 📋 Leave Management System

A beginner-friendly full-stack MERN app for managing employee leave requests.

---

## 🗂️ Folder Structure

```
leave-management/
├── client/                      ← React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── LeaveCard.js     ← Reusable leave card component
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── EmployeeDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── services/
│   │   │   └── api.js           ← All API call functions
│   │   ├── App.js               ← Main React component
│   │   ├── App.css              ← All styles
│   │   └── index.js             ← Entry point
│   └── package.json
│
├── server/                      ← Node.js + Express backend
│   ├── controllers/
│   │   ├── authController.js    ← Login & register logic
│   │   └── leaveController.js   ← Leave CRUD logic
│   ├── models/
│   │   ├── User.js              ← User MongoDB schema
│   │   └── Leave.js             ← Leave MongoDB schema
│   ├── routes/
│   │   ├── authRoutes.js        ← Auth API routes
│   │   └── leaveRoutes.js       ← Leave API routes
│   ├── db.js                    ← MongoDB connection
│   ├── index.js                 ← Server entry point
│   ├── .env.example             ← Environment variable template
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Step 1: Get MongoDB Atlas URI

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up / log in
3. Click **"Build a Database"** → Choose **Free tier (M0)**
4. Set username + password (remember these!)
5. Under **Network Access** → Add IP: `0.0.0.0/0` (allow all)
6. Click **"Connect"** → **"Connect your application"**
7. Copy the connection string — looks like:
   ```
   mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password and add your DB name:
   ```
   mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/leavemanagement?retryWrites=true&w=majority
   ```

---

### Step 2: Set Up the Backend

```bash
# Go into the server folder
cd server

# Copy the .env example and fill in your values
cp .env.example .env
```

Open `server/.env` and paste your MongoDB URI:

```env
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/leavemanagement?retryWrites=true&w=majority
PORT=5000
```

```bash
# Install backend dependencies
npm install

# Start the backend server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
✅ Default admin created: admin@test.com / 1234
✅ Default employee created: user@test.com / 1234
```

---

### Step 3: Set Up the Frontend

```bash
# Open a NEW terminal window
# Go into the client folder
cd client

# Install frontend dependencies
npm install

# Start the React app
npm start
```

The app will open automatically at: **http://localhost:3000**

---

## 🔐 Default Login Accounts

| Role     | Email           | Password |
|----------|-----------------|----------|
| Admin    | admin@test.com  | 1234     |
| Employee | user@test.com   | 1234     |

These are created automatically when the server starts.

---

## 🔌 API Endpoints

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | /api/auth/register  | Register new employee           |
| POST   | /api/auth/login     | Login                           |
| POST   | /api/leaves         | Apply for leave                 |
| GET    | /api/leaves         | Get leaves (role-based)         |
| PUT    | /api/leaves/:id     | Admin: approve or reject leave  |

---

## 🔄 How It Works

```
Employee → Register/Login → Apply for Leave
                                  ↓
                    Admin → Login → View All Leaves
                                  ↓
                    Admin → Approve or Reject
                                  ↓
                    Employee → See Updated Status
```

---

## 🚀 Deployment Instructions

### Deploy Backend (Render — Free)

1. Push your code to GitHub
2. Go to [https://render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add Environment Variable: `MONGO_URI` = your Atlas URI
6. Deploy!

### Deploy Frontend (Vercel — Free)

1. Go to [https://vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set **Root Directory**: `client`
4. In `client/src/services/api.js`, change `API_BASE` to your Render URL:
   ```js
   const API_BASE = "https://your-app.onrender.com/api";
   ```
5. Deploy!

---

## 🧠 Tech Stack

- **Frontend**: React 18 (no TypeScript, no Tailwind)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas with Mongoose
- **Auth**: localStorage (beginner-friendly, no JWT)
- **HTTP Client**: Axios
- **Password**: bcryptjs hashing

---

## 📦 Packages Used

### Backend
| Package    | Purpose                    |
|------------|----------------------------|
| express    | Web server framework       |
| mongoose   | MongoDB object modeling    |
| bcryptjs   | Password hashing           |
| cors       | Allow cross-origin requests|
| dotenv     | Load .env variables        |
| nodemon    | Auto-restart on file change|

### Frontend
| Package        | Purpose              |
|----------------|----------------------|
| react          | UI library           |
| react-dom      | DOM rendering        |
| axios          | HTTP requests        |
| react-scripts  | Create React App CLI |
