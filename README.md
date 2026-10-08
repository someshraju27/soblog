# 📝 SoBlog

SoBlog is a full-stack blogging platform built with the **MERN stack**. It allows users to register, authenticate, create and manage blog posts, upload profile and blog images, discover recent and trending posts, and interact with blogs through likes and dislikes.

The project also includes an **admin moderation system** where submitted blogs remain pending until an administrator approves or rejects them. Users receive email notifications when their submissions are approved or rejected.

## 🚀 Features

### 🔐 User Authentication

- User registration with username, email, password, and profile image
- Password hashing using bcrypt
- JWT-based authentication
- Protected authenticated routes
- Token expiration
- Login and logout functionality
- Forgot-password functionality
- Password reset through an emailed reset link
- Role-based admin access

### 📝 Blog Management

- Create new blog posts
- Add blog title, content, author name, and cover image
- Client-side form validation
- Blog image uploads using Cloudinary
- Edit existing blog posts
- Delete blog posts
- View individual blog posts
- View user's own blogs
- View pending and approved blogs
- Search blogs by title
- View recent posts
- View all approved blogs

### 🛡️ Blog Moderation

New blog submissions are initially stored with a `pending` status.

Administrators can:

- View pending blog submissions
- Approve blogs
- Reject blogs
- Trigger email notifications when blogs are approved or rejected

Blog statuses:

```text
pending
approved
rejected
```

### 👍 Blog Reactions

Users can interact with blogs through:

- Like
- Dislike

The application prevents a user from simultaneously liking and disliking the same blog.

### 🔥 Trending Blogs

SoBlog includes a trending section that:

- Sorts blogs based on likes
- Displays the top 9 blogs
- Includes an automatically scrolling carousel
- Supports manual navigation

### 👤 User Profiles

Users can:

- Upload a profile image
- View their profile information
- Access their own blogs
- Track the status of submitted blogs

### 🎨 UI / UX

- Responsive React interface
- Tailwind CSS styling
- Responsive navigation
- Mobile navigation menu
- Framer Motion animations
- Smooth scrolling
- Video-based landing page
- Responsive blog cards
- Blog detail pages

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

## 🗄️ Database Models

### User Model

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

### Blog Model

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

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account
- Cloudinary account
- Gmail account/app password for email notifications

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

Create another `.env` file inside the `server` directory:

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

**Never commit `.env` files, passwords, API keys, or other secrets to GitHub.**

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

## ☁️ External Services

| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Database |
| Cloudinary | Blog and profile image storage |
| Gmail / Nodemailer | Email notifications and password reset |

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

## 📚 What I Learned

This project helped me understand and practice:

- Building a full-stack MERN application
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

## 🔮 Future Improvements

Some potential improvements for future versions include:

- Google OAuth authentication
- Stronger server-side validation
- Improved authorization checks
- HTTP-only cookies for authentication
- Pagination
- Comments
- Public user profiles
- Rich-text/Markdown editor
- Better API error handling
- Improved loading and empty states
- Automated testing
- CI/CD
- Production deployment

## 👨‍💻 Author

**Somesh Raju**

GitHub: [@someshraju27](https://github.com/someshraju27)

---

⭐ Built as a learning project to explore full-stack web development with the MERN stack.
