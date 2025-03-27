const express = require('express');
const { uploadBlogImage } = require("../cloudinaryConfig");
const Blog = require('../models/Blogdata');
const router = express.Router();
const verifyAdmin  = require('../adminAuth');
const nodemailer = require('nodemailer');
const User = require('../models/Registeruser');

router.post('/blog', uploadBlogImage.single("blogImage"), async (req, res) => {
    try{
        const {userId,blogTitle,blogContent,blogAuthor} = req.body;

        // Convert path to forward slashes for cross-platform support
        // const blogImagePath = req.file.path.replace(/\\/g, '/'); 
 
    

        // const fullImageUrl = `${process.env.backend_url}/${blogImagePath}`;

          // Get the Cloudinary image URL
    const blogImage = req.file ? req.file.path : null;

        let newBlog = new Blog({
        userId,
          blogTitle,
          blogContent,
          blogAuthor,
          blogImage
        })

        await newBlog.save();
        res.status(200).json({message:"Blog Upload success",blog:newBlog});
      }catch(err){
          res.status(500).json({message:"Internal Error"});
        }

    });


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
router.put("/blog/:id", uploadBlogImage.single("blogImage"), async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      const { blogTitle, blogContent } = req.body;
      if (blogTitle) blog.blogTitle = blogTitle;
      if (blogContent) blog.blogContent = blogContent;
  
      // Upload new image to Cloudinary
      if (req.file) {
        blog.blogImage = req.file.path;
      }
  
      await blog.save();
      res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  router.delete("/blog/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      // Extract public_id from Cloudinary URL
      const publicId = blog.blogImage.split("/").pop().split(".")[0];
  
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(publicId);
  
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
      console.error("Error deleting blog:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


// Get all pending blogs
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
          html: `<p>Your blog has been approved. You can view it <a href="${process.env.Frontend_URL}/blog/${updatedBlog._id}">here</a>.</p>`

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
    html:`<p>Your blog has been rejected.</p>`
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