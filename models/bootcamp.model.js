import mongoose from "mongoose";
import { validation } from "../constants/validation.js";
import slugyfy from 'slugify'

//Creating bootcamp Schema
const bootCampSchema = mongoose.Schema({
  name: {
    //giving the types and validationin bootcampSchema/name
    //Importing validation message from  :- import { validation } from "../constants/validation";
    type: String,
    required: [true, validation.BOOTCAMP_NAME],
    unique: true,
    trim: true,
    minlength: [6, validation.MIN_LENGTH],
    maxlength: [15, validation.MAX_LENGTH],
  },
  slug: String, //convetrs "Web development"  sting into "Web-development" which makes easy to run query

  //giving the types and validationin bootcampSchema/description
  //Importing validation message from  :- import { validation } from "../constants/validation";
  description: {
    type: String,
    required: [true, validation.DESCRIPTION_MESG],
    minlength: [400, validation.MIN_LENGTH],
    maxlength: [500, validation.MAX_LENGTH],
  },

  //giving the types and validationin bootcampSchema/website
  //Importing validation message from  :- import { validation } from "../constants/validation";
  //using regeEX to validate the website URl
  //regeEX to locate or validate specific strings or patterns of text in a sentence, document, or any other character input
  webpage: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
      validation.WEB_SITE_VALIDTION,
    ],
  },

  //giving the types and validationin bootcampSchema/phone
  //Importing validation message from  :- import { validation } from "../constants/validation";
  phone: {
    type: Number,
    max: [15, validation.PHONE_NUMBER_VALIDATION],
  },

  //giving the types and validationin bootcampSchema/email
  //Importing validation message from  :- import { validation } from "../constants/validation";
  //using regeEX to validate the email validation
  email: {
    type: String,
    require: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, validation.EMAIL_VALIDATION],
  },

  //giving the types and validationin bootcampSchema/address
  //Importing validation message from  :- import { validation } from "../constants/validation";
  address: {
    type: String,
    require: [true, validation.ADDRESS_VALIDATION],
  },

  //giving the types and validationin bootcampSchema/careers
  //Importing validation message from  :- import { validation } from "../constants/validation";
  //Here the career can be of multiple type so it is stored in Array of string
  //The validation of multiple chosie is done usng 'enum validation'
  career: {
    type: [String], //array of string
    required: [true, validation.CAREER_VALIDATION],
    enum: [
      "Full stack Developer",
      "Mobile App Developmant",
      "Java Developer",
      "Web Development",
      "Data Science & Analytics",
      "Cloud Computing",
      "Cyber Security",
      "Machine Learning",
      "UI/UX Designer",
    ],
  },

  //giving the types and validationin bootcampSchema/averageRating
  //Importing validation message from  :- import { validation } from "../constants/validation";
  averageRating: {
    type: Number,
    minRating: [1, validation.MIN_RATING],
    maxRating: [5, validation.MAX_RATING],
  },

  //giving the types and validationin bootcampSchema/Cost

  cost: {
    type: Number,
    required: true,
  },

  //giving the types and validationin bootcampSchema/photo
  //Importing validation message from  :- import { validation } from "../constants/validation";
  photo: {
    type: String,
  },

  //giving the types and validationin bootcampSchema/jobGuarantee
  jobGuarantee: {
    type: Boolean,
    default: false,
  },

  //giving the types and validationin bootcampSchema/jobAssisstance
  jobAssisstance: {
    type: Boolean,
    default: false,
  },

  //giving the types and validationin bootcampSchema/user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps:true
});

//creating the slugyfy to remove the emptyy space between the search
//which replace empty space with '-'
bootCampSchema.pre('save', function (next) {
  this.name = slugyfy(this.name.toLowercase())
  next();
})

const Bootcamp = mongoose.model('Bootcamp', bootCampSchema)

export default Bootcamp