import cloudinary from "../config/cloudinary.config.js";
import Bootcamp from "../models/bootcamp.model.js";

//creating addBootcamp function
export const addBootcamp = async (req, res) => {
  try {
    let uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
    const data = req.body;
    data.photo = uploadedFile.secure_url;
    data.user = req._id;

    const bootcamp = new Bootcamp(data);
      await bootcamp.save();
      
      res.status(200).json({
          status: true,
          message: "Successfully added a camp",
          data:bootcamp
      })
  } catch (error) {
    console.log(error);
  }
};
