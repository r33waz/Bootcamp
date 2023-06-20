import multer from "multer";

//creating a multer function to store images and file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //setting the path for storing files
    cb(null, "./public/uploads");
    },
    
  filename: (req, file, cb) => {
      const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null,uniqueSuffix);
  },
});

//filtering the file 
const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    console.log(file)
    if (file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg') {
        cb(null, true);
    } else {
        cb(new Error("Invalid image file type"))
    }
}

export const uplaod = multer({
  storage: storage,
  //setting the validation for image
    limits: {
      //setting file size less then 5 MB
    fileSize: 5 * 1024 * 1024,
    },
  fileFilter
});
