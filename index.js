import express from "express";
import 'dotenv/config'
import config from "./config/config.js";
import { dbconnect } from "./config/dbconnect.js";
import mainrouter from "./routes/main.js";
import morgan from "morgan";

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

app.use(morgan('combined'))

app.use("/api/v1", mainrouter);

app.listen(config.PORT, () => {
  console.log(`Server is running as ${config.NODE_ENV} on port ${config.PORT}`);
});
