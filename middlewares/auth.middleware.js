import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.model.js";

//creating the authorization function

export const authorizationUser = async (req, res,next)=> {
    try {
        // chechking validation
        // As authorization token comes in Headers we are verifying authorization from Headers
        if (req.headers.authorization && req.headers.authorization.startWith('Bearer')) {
            
            //Using method to split the Aythorization token and taking index 1 
            //Then storing the index in token variable
            const token = req.headers.authorization.split(" ")[1];

            //Using jwt verify to verify the token data
            const verifyData = jwt.verify(token, config.JWT_TOKEN)

            //Findind the user according to the user
            const user = await User.findOne({_id:verifyData.id}) 

            req.user = user
            
            next()
        } else {
            return res.status(401).json({
                ststus: false,
                message:'Unauthorized User'
            })
        }
    } catch (error) {
        error.message
    }
}