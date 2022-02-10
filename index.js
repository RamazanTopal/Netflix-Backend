const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan")
dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");
const listRoutes = require("./routes/lists");
app.use(morgan('combined'))
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true
}).then(()=>{
  console.log("DB connection succession!")
}).catch((error)=>{
  console.log(error)
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/movies",movieRoutes)
app.use("/api/lists",listRoutes)
app.listen(8800,()=>{
  console.log("Backend server is running!")
})