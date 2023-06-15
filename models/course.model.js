import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  //giving the types and validationin courseSchema/title
  title: {
    type: String,
    required: [true, "Please fill up the title"],
    trim: true,
  },

  //giving the types and validationin courseSchema/description
  description: {
    type: String,
    trim: true,
    required: [true, "description is required"],
  },

  //giving the types and validationin courseSchema/weeek
  week: {
    type: String,
    required: [true, "Weeks to complete the course should me mentioned"],
  },

  //giving the types and validationin courseSchema/minimumSkill
  minimunSkill: {
    type: String,
    required: [true, "Choose your skill level"],
    enum: ["Bigginerr", "Intermediate", "Expert"],
  },

  //giving the types and validationin courseSchema/content
    content: {
        type: [String],
        required:[true,"Content of this Course must be provided"]
    },

  //giving the types and validationin courseSchema/scholarShip
  scholorShip: {
    type: Boolean,
    default: false,
  },

  //As course is related to bootcamp
  // we will add a refrence of BootCampSchema from bootcamp model in Course Schema
  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bootcamp",
    required: true,
  },

  //As course and bootcamp is related to user
  // we will add a refrence of UserSchema from user model in Course Schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Course = mongoose.model('mongoose', courseSchema)
export default Course