# 📝 SoBlog

SoBlog is a full-stack blogging platform built with the **MERN stack**. It allows users to create and manage blog posts, upload images, discover recent and trending content, and interact with blogs through likes and dislikes.

The application also includes **JWT authentication, password reset, Cloudinary image uploads, role-based admin access, blog moderation, and email notifications**.

## 🌐 Live Demo

🚀 **[Visit SoBlog](https://soblog-fawn.vercel.app/)**

💻 **[View Source Code](https://github.com/someshraju27/soblog)**

---

## ✨ Features

### 🔐 Authentication & User Management

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Automatic token expiration
- Logout functionality
- Forgot-password functionality
- Password reset through an emailed reset link
- User profile image upload
- Role-based access for administrators

### 📝 Blog Management

- Create blog posts
- Add title, content, author name, and cover image
- Client-side form validation
- Upload blog images using Cloudinary
- Edit existing blog posts
- Delete blog posts
- View individual blog posts
- View personal blogs
- Track pending and approved submissions
- Search blogs by title
- View recent posts
- View all approved blogs

### 🛡️ Blog Moderation

New blog submissions are initially marked as `pending`.

Administrators can:

- View pending submissions
- Approve blog posts
- Reject blog posts
- Notify users by email when their blog is approved or rejected

Blog statuses:

```text
pending
approved
rejected
```

### 👍 Blog Reactions

Users can interact with blog posts through:

- Likes
- Dislikes

The application prevents a user from having both a like and dislike on the same blog simultaneously.

### 🔥 Trending Blogs

The trending section:

- Ranks blogs based on likes
- Displays the top 9 blogs
- Includes an automatic scrolling carousel
- Supports manual navigation

### 🎨 User Interface

- Responsive React interface
- Tailwind CSS
- Responsive navigation
- Mobile navigation menu
- Framer Motion animations
- Smooth scrolling
- Video-based landing page
- Responsive blog cards
- Individual blog detail pages

---

## 🛠️ Tech Stack

### Frontend

- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- React Scroll
- React Icons
- Font Awesome

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Nodemailer
- Cloudinary
- Multer
- CORS
- dotenv

### Development Tools

- Git
- GitHub
- VS Code
- Nodemon
- Concurrently

---

## 🏗️ Architecture

SoBlog follows a client-server architecture:

```text
                        ┌─────────────────────┐
                        │    React Client     │
                        │                     │
                        │  Pages / Components │
                        └──────────┬──────────┘
                                   │
                              Axios / HTTP
                                   │
                                   ▼
                        ┌─────────────────────┐
                        │   Express Server    │
                        │                     │
                        │ Routes / Middleware │
                        └──────┬──────┬───────┘
                               │      │
                    ┌──────────┘      └─────────────┐
                    ▼                               ▼
             ┌─────────────┐                 ┌─────────────┐
             │  MongoDB    │                 │  Cloudinary │
             │             │                 │             │
             │ Users/Blogs │                 │   Images    │
             └─────────────┘                 └─────────────┘
                                                   
                               ┌─────────────┐
                               │ Nodemailer  │
                               │             │
                               │    Emails   │
                               └─────────────┘
```

---

## 📁 Project Structure

```text
SoBlog/
│
├── client/
│   ├── public/
│   │   ├── images and media
│   │   ├── start.mp4
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── component/
│   │   │   ├── AboutUs.js
│   │   │   ├── CreateBlog.js
│   │   │   ├── Footer.js
│   │   │   ├── Home.js
│   │   │   ├── MyBlogs.js
│   │   │   └── Start.js
│   │   │
│   │   ├── AdminPanel.js
│   │   ├── AllBlogs.js
│   │   ├── App.js
│   │   ├── Blog.js
│   │   ├── BlogFull.js
│   │   ├── ForgotPassword.js
│   │   ├── Login.js
│   │   ├── Navigation.js
│   │   ├── RegularBlogs.js
│   │   ├── ResetPassword.js
│   │   ├── Signup.js
│   │   └── TrendingBlogs.js
│   │
│   ├── tailwind.config.js
│   └── package.json
│
├── server/
│   ├── models/
│   │   ├── Blogdata.js
│   │   └── Registeruser.js
│   │
│   ├── routes/
│   │   ├── blog.route.js
│   │   ├── login.route.js
│   │   └── user.route.js
│   │
│   ├── adminAuth.js
│   ├── authMiddleWare.js
│   ├── cloudinaryConfig.js
│   ├── index.js
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗄️ Database Models

### User

The user model stores:

- Username
- Email
- Hashed password
- Profile image URL
- User role

Available roles:

```text
user
admin
```

### Blog

The blog model stores:

- User ID
- Blog title
- Blog content
- Author name
- Blog image URL
- Approval status
- Likes
- Dislikes
- Creation date

---

## 🔑 Authentication Flow

SoBlog uses JWT-based authentication.

```text
User Login
    │
    ▼
Express Login Route
    │
    ▼
Validate User Credentials
    │
    ▼
Compare Password using bcrypt
    │
    ▼
Generate JWT
    │
    ▼
Store Token on Client
    │
    ▼
Send Token with Protected Requests
    │
    ▼
JWT Middleware Verifies Token
    │
    ▼
Allow Protected Operation
```

Protected requests use:

```text
Authorization: Bearer <token>
```

---

## 📝 Blog Submission Flow

```text
User Creates Blog
       │
       ▼
Client-side Validation
       │
       ▼
Image Upload to Cloudinary
       │
       ▼
Blog Saved in MongoDB
       │
       ▼
Status = pending
       │
       ▼
Admin Reviews Submission
       │
       ├───────────────┐
       ▼               ▼
   Approved          Rejected
       │               │
       └───────┬───────┘
               ▼
       Email Notification
          Sent to User
```

---

## 🔌 API Routes

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Authenticate a user |
| GET | `/home` | Verify JWT and return authenticated user |
| GET | `/admin` | Verify admin access |
| POST | `/forgot-password` | Send password reset link |
| POST | `/reset-password/:token` | Reset password |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Register a user |
| GET | `/api/users` | Get users |
| GET | `/api/users/:id` | Get a specific user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### Blogs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/blog` | Create a blog |
| GET | `/api/blog` | Get approved blogs |
| GET | `/api/blog/:id` | Get a specific blog |
| PUT | `/api/blog/:id` | Update a blog |
| DELETE | `/api/blog/:id` | Delete a blog |
| GET | `/api/pending` | Get pending blogs |
| PUT | `/api/:id/approve` | Approve a blog |
| PUT | `/api/:id/reject` | Reject a blog |
| PUT | `/api/:id/like` | Like/unlike a blog |
| PUT | `/api/:id/dislike` | Dislike/undislike a blog |
| GET | `/api/trending` | Get trending blogs |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have:

- Node.js
- npm
- MongoDB Atlas account
- Cloudinary account
- Gmail account/app password for email functionality

### 1. Clone the Repository

```bash
git clone https://github.com/someshraju27/soblog.git
cd soblog
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
```

### 4. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

Create a `.env` file inside the `server` directory:

```env
MY_MONGODB_PASSWORD=your_mongodb_password

JWT_SECRET=your_jwt_secret
RESET_SECRET=your_reset_secret

MY_EMAIL=your_email
MY_EMAIL_PASSWORD=your_email_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Frontend_URL=http://localhost:3000
```

Replace the values with your own credentials.

> **Never commit `.env` files, passwords, API keys, or other secrets to GitHub.**

### 6. Run the Application

From the project root:

```bash
npm run dev
```

The root script starts both the frontend and backend using `concurrently`.

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## 📜 Available Scripts

### Root

```bash
npm run dev
```

Runs both the React client and Express server.

### Client

```bash
npm start
```

Starts the React development server.

```bash
npm run build
```

Creates a production build.

### Server

```bash
npm start
```

Starts the Express server using Nodemon.

---

## ☁️ External Services

| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Database |
| Cloudinary | Blog and profile image storage |
| Gmail / Nodemailer | Email notifications and password reset |

---

## 📱 Main Application Screens

SoBlog includes:

- Landing page
- Login
- Signup
- Forgot Password
- Reset Password
- Home
- Trending Blogs
- Recent Posts
- All Blogs
- Individual Blog
- Create Blog
- My Blogs
- Admin Panel
- About section

---

## 📚 What I Learned

Building SoBlog helped me understand and practice:

- Full-stack MERN application development
- React component development
- React routing
- REST API development
- MongoDB and Mongoose
- CRUD operations
- JWT authentication
- Password hashing
- Role-based authorization
- File uploads
- Cloudinary integration
- Email automation with Nodemailer
- Form validation
- Frontend-backend communication
- Responsive UI development
- Git and GitHub

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- Google OAuth authentication
- Stronger server-side validation
- Improved authorization checks
- HTTP-only cookies for authentication
- Pagination for blogs
- Comments
- Public user profiles
- Rich-text/Markdown editor
- Improved API error handling
- Better loading and empty states
- Automated testing
- CI/CD
- Production deployment improvements

---

## 👨‍💻 Author

**Somesh Raju**

GitHub: [@someshraju27](https://github.com/someshraju27)

---

⭐ Built as a full-stack project to explore and practice modern web development with the MERN stack.
