const mongoose = require('mongoose');

let Blogdata = mongoose.Schema({
    userId:{
         type: String
    },
    blogTitle:{
        type:String,
        required:true,
        unique:true
    },
    blogContent:{
        type:String,
        required:true,
    },
    blogAuthor:{
       type:String,
         required:true
    },
    blogImage:{
        type:String,
    },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
      
    date: {
        type: Date,
        default: Date.now
      }

})

module.exports = mongoose.model("Blogdata",Blogdata);