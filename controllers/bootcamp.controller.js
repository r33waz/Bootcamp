import cloudinary from "../config/cloudinary.config.js"

//creating addBootcamp function
export const addBootcamp = async (req,res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        let uploadedFile = await cloudinary.v2.uploader.upload(req.file.path)
        console.log(uploadedFile)

        res.send(uploadedFile)
    } catch (error) {
        
    }
}