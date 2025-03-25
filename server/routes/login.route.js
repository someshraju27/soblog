const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Registeruser');
const authenticateToken = require('../authMiddleWare');
const router = express.Router();
const nodemailer = require('nodemailer');
const  verifyAdmin  = require('../adminAuth');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email, profileImage: user.profileImage, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10h' } // Token expires in 10 hours
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: "Successfully Verified", user: req.user });
});

router.get('/admin', verifyAdmin ,(req, res) => {
  
    res.json({ message: "Admin verified", user: req.user });
});



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL, // Your email
        pass: process.env.MY_EMAIL_PASSWORD  // Your email password or app password
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ id: user.id }, process.env.RESET_SECRET, { expiresIn: '1h' });

    // Reset link (Frontend URL where the user can reset password)
    const resetLink = `http://localhost:3000/reset-password/${token}`;


    // Email options
    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>Click>${resetLink} to reset your password. This link will expire in 1 hour.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Reset link sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error,user });
    }
});

router.post('/reset-password/:token',async (req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    try{
        console.log(req.params);
        console.log(token);
        console.log(password);
    const decoded = jwt.verify(token,process.env.RESET_SECRET);
    const user =await User.findOne({_id:decoded.id});
    if(!user){
        return res.status(501).json({message:"Usernot found"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password=hashedPassword;
    await user.save();
    res.json({message:"Password reset Success"});
}
catch(err){
    res.status(404).json({message:"error",err});
}

})

module.exports =  router;