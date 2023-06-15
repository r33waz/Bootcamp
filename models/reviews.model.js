import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  //giving the types and validationin reviewSchema/title
  title: {
    type: String,
    trim: true,
    required: [true, "Reviews with the name is required"],
    maxlength: 50,
  },
  description: {
      type: String,
      required:[true,'Description id mandatory'],
    minlength: [20, "Description must be more than 20 character long"],
    maxlength: [50, "Description must be of  50 character long"],
  },
  Rating: {
    type: Number,
    minRating: [1, "Minimum rating should be 1"],
    maxRating: [5, "Maximum rating should be 5"],
    required: [true, "Rating is mandotory"],
  },

  bootcamp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BootCamp",
    required: true,
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});