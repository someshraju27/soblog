const mongoose = require ("mongoose");

let Registeruser = new mongoose.Schema({
    username : {
        type: String,
        required : true,
    },
    email :{
        type:String,
        required :true,
    },
    password :{
        type: String,
        required:true,
        unique:true,
    },
    profileImage: {
        type:String
      },
      role: { type: String, enum: ["user", "admin"], default: "user" }
})

module.exports = mongoose.model("User",Registeruser);