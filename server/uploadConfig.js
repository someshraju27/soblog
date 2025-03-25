const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profileImage') {
      cb(null, './uploads/profileImages');
    } else if (file.fieldname === 'blogImage') {
      cb(null, './uploads/blogImages');
    } else {
      cb(null, './uploads');
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({

  
  storage: storage,
  limits: { fileSize: 3000000 }, 
  fileFilter: (req, file, cb) => {
    
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      console.log("done");
      return cb(null, true);
      
      
    } else {
      cb('Error: Images Only!');  
    }
  }
});

module.exports = upload;
