const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const authRoutes = require("./routes/auth");

app.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true
}).then(()=>{
  console.log("DB connection succession!")
}).catch((error)=>{
  console.log(error)
})
app.use("/api/auth",authRoutes)


app.listen(8800,()=>{
  console.log("Backend server is running!")
})