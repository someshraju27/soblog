require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const upload = require('./uploadConfig'); // Multer  config for handling file uploads
const path = require('path');
const userRoutes = require('./routes/user.route');
const blogRoutes = require('./routes/blog.route');
const loginRoute = require('./routes/login.route'); 

const cors = require('cors');


const app = express();

mongoose.connect("mongodb+srv://someshraju1527:someshraju271315@cluster0.kdfax.mongodb.net/P1").then(
    ()=>console.log("MongoDB connected")
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

console.log(process.env.Frontend_URL);

// console.log()
app.use(cors({ origin: process.env.Frontend_URL, credentials: true }));

app.use('/api', userRoutes);

app.use('/', loginRoute);

app.use('/api',blogRoutes);



app.get('/',(req,res)=>{
    res.send("Welcome"); 
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
 