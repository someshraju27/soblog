const express = require('express');
const upload = require('../uploadConfig'); 
const Blog = require('../models/Blogdata');
const router = express.Router();
const verifyAdmin  = require('../adminAuth');
const nodemailer = require('nodemailer');
const User = require('../models/Registeruser');

router.post('/blog',upload.single('blogImage'),async (req,res)=>{
    try{
        const {userId,blogTitle,blogContent,blogAuthor} = req.body;

        // Convert path to forward slashes for cross-platform support
        const blogImagePath = req.file.path.replace(/\\/g, '/'); 
    console.log(blogImagePath);
    

        const fullImageUrl = `http://192.168.75.134:5000/${blogImagePath}`;

        let newBlog = new Blog({
        userId,
          blogTitle,
          blogContent,
          blogAuthor,
          blogImage:fullImageUrl
        })

        await newBlog.save();
        res.status(200).json({message:"Blog Upload success",blog:newBlog});
      }catch(err){
          res.status(500).json({message:"Internal Error"});
        }

    });

router.get('/blog',async (req,res)=>{
    try{
        const blogs = await Blog.find({});
        if(!blogs){
            res.status(404).json({message:"NO blogs"});
        }
        res.status(200).json(blogs);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/blog/:id',async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            res.status(404).json({message:"Not found"});
        }
        res.status(200).json(blog);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.put("/blog/:id", upload.single("blogImage"), async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        // console.log(blog);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update text fields
        if(req.body.blogTitle){
        blog.blogTitle = req.body.blogTitle;
        }
        if(req.body.blogContent){
        blog.blogContent = req.body.blogContent;
        }
        // Only update image if a new file is uploaded
        
        if (req.file) {
            const blogImagePathInPut = req.file.path.replace(/\\/g, '/'); 
            blog.blogImage = `http://192.168.75.134:5000/${blogImagePathInPut}`;
        }

        await blog.save();
        res.json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/blog/:id',async (req,res)=>{
    try{
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if(!blog){
            res.status(404).json({message:"Not found"});
        }
        res.status(200).json({message:"Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get("/pending",  async (req, res) => {
    try {
        const pendingBlogs = await Blog.find({ status: "pending" }).populate("userId", "name email");
        // console.log(pendingBlogs);
        
        res.json(pendingBlogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pending blogs" });
    }
});

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.MY_EMAIL,
        pass:process.env.MY_EMAIL_PASSWORD
    }
})

// Approve a blog
router.put("/:id/approve", verifyAdmin, async (req, res) => {
    try {
        
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
     
        console.log(updatedBlog);
        
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const user = await User.findById(updatedBlog.userId);
        const email = user.email;
        console.log(email);
        
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to:email,
            subject: 'Blog Approved',
            html: `<p>Your blog has been approved. You can view it <a href="http://192.168.75.134:3000/blog/${updatedBlog._id}">here</a>.</p>`
        }
    await transporter.sendMail(mailOptions);
    res.json({ message: "Blog approved successfully", updatedBlog });
}

     catch (error) {
        res.status(500).json({ message: "Error approving blog" });
    }
});

// Reject a blog
router.put("/:id/reject", verifyAdmin, async (req, res) => {

    try {
     
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }   
        const user = await User.findById(updatedBlog.userId);
        const email = user.email;
const mailOptions = {
    from:process.env.MY_EMAIL,
    to:email,
    subject:"Blog Rejected",
    html:`<p>Your blog has been rejected. You can view it <a href="http://192.168.75.134:3000/blog/${updatedBlog._id}">here</a>.</p>`
}
 await transporter.sendMail(mailOptions);
 res.json({ message: "Blog rejected", updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error rejecting blog" });
    }
});

// Get only approved blogs (for homepage)
router.get("/blog", async (req, res) => {
    try {
        const blogs = await Blog.find({ status: "approved" }).populate("userId", "username");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
});

module.exports = router;