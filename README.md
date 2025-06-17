# 🧰 Job Portal CRUD Application

A full-stack **MERN application** that allows users to **post**, **view**, **edit**, and **delete** job listings.  
This simple yet powerful job portal demonstrates core CRUD operations with a clean, responsive UI built using **Tailwind CSS**.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS (v4)
- Axios

### 🔧 Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS middleware

---

## ✅ Features

- ✏️ **Create Job Listings** with:
  - Job Title, Description
  - Location, Job Type
  - Salary Range
  - Company Name, Poster Info

- 👀 **View All Jobs** in a responsive card layout
  - Color-coded Job Type badges
  - Salary formatting

- 🛠 **Edit Listings** with form pre-population

- 🗑️ **Delete Listings** with confirmation

- 📱 Responsive UI for desktop and mobile

- 📂 Collapsible form to maximize screen space

<!-- --- -->

<!-- ## 🖼️ Screenshots

> Add your application screenshots here (optional) -->

---


## ⚙️ Setup Instructions

### 📌 Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

---

### 🔧 Backend Setup

```
cd job-portal/server
npm install
```
Create a .env file with the following:

env

MONGO_URI=your_mongodb_connection_string
PORT=5000
To start the server:



npm start

---
### 🖥 Frontend Setup
```
cd job-portal/client
npm install
npm run dev
```
---
### Open in your browser:
http://localhost:5173

---
### 🌐 API Endpoints
| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | `/jobs`     | Get all jobs       |
| GET    | `/jobs/:id` | Get a specific job |
| POST   | `/jobs`     | Create a new job   |
| PUT    | `/jobs/:id` | Update a job       |
| DELETE | `/jobs/:id` | Delete a job       |

---
### 🧾 Sample Job Object
```
{
  "title": "Frontend Developer",
  "description": "We're looking for a skilled frontend developer...",
  "location": "Bangalore, India",
  "salary_min": 600000,
  "salary_max": 1200000,
  "job_type": "full-time",
  "company": "TechCorp Solutions",
  "posted_by": "HR Department"
}

```
---
### 🔮 Future Improvements
✅ User authentication and authorization

✅ Job search & filters

✅ Company profiles and dashboards

✅ Job application system

✅ Email notifications

✅ Pagination and lazy loading

✅ Form validations & error handling

✅ Analytics & admin panel

✅ Mobile app version

---

### 👨‍💻 Author
## Sai Ritesh Domakuntla

Portfolio: www.sairitesh.me
GitHub: [github.com/sairiteshdomakuntla](https://github.com/sairiteshdomakuntla/)

---
