
const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    
    cb(null, 'uploads/');
  },
  
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});


const fileFilter = (req, file, cb) => {
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    
    cb(null, true);
  } else {
    
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 Megabytes
  },
});

module.exports = upload;
