import express from "express";
import 'dotenv/config'
import config from "./config/config.js";
import { dbconnect } from "./config/dbconnect.js";
import mainrouter from "./routes/main.js";
import morgan from "morgan";
import { mongo } from "mongoose";
import ExpressMongoSanitize from "express-mongo-sanitize";
import 'dotenv/config'

const app = express();

dbconnect()


// app.use('/api/v1/',indexRouter)

//Handeling error for unmatched routes
// app.use((req, res,next) => {
//   const error = new Error("Page not found")
//   error.status(404)
//   next(error)
// })


//Middle ware to handel error

// app.use((req, res) => {
//   res.status(error.status || 500).json({
//     status: false,
//     error:error.message
//   })
// })
app.use(express.json())

app.use(morgan('combined'))

//helps to prevent from SQL injection
//NO SQL Injection 
app.use(ExpressMongoSanitize())

app.use("/api/v1", mainrouter);

app.listen(config.PORT, () => {
  console.log(`Server is running as ${config.NODE_ENV} on port ${config.PORT}`);
});
