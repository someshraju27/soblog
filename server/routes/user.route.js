const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/Registeruser'); 
const upload = require('../uploadConfig'); 
const router = express.Router();

// User registration route
router.post('/users', upload.single('profileImage'), async (req, res) => {
  try {
    console.log("body",req.body);

    const { username, email, password,role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userImagePath = req.file.path.replace(/\\/g, '/');
    

    const fullImageUrl = `http://192.168.75.134:5000/${userImagePath}`;
    // Handle file upload
    // const imagePath = req.file ? req.file.path : null;

    // Create a new user with the image path
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      profileImage: fullImageUrl,  // Save the image path in the user document
    });

    // Save user to database
    // await newUser.save();
    await User.create(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to register user' });
  }
});


router.get('/users',async (req,res)=>{
  try{
      const users = await User.find({});
      if(!users){
          res.status(404).json({message:"NO users"});
      }
      res.status(200).json(users);
  }
  catch(err){
      res.status(500).json({message:err.message});
  }
})

router.get('/users/:id',async (req,res)=>{          
  try{
      const user = await User.findById(req.params.id);
      if(!user){
          res.status(404).json({message:"Not found"});
      }
      res.status(200).json(user);
  }
  catch(err){
      res.status(500).json({message:err.message});
  }
})

router.put('/users/:id',async (req,res)=>{
  try{
      const user = await User.findByIdAndUpdate(req.params.id,req.body);
      if(!user){
          res.status(404).json({message:"Not found"});
      }
      res.status(200).json(user);
  }
  catch(err){
      res.status(500).json({message:err.message});
  }
})

router.delete('/users/:id',async (req,res)=>{
  try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
          res.status(404).json({message:"Not found"});
      }
      res.status(200).json({message:"Deleted Successfully"});
  }
  catch(err){
      res.status(500).json({message:err.message});
  }
})

module.exports = router;
