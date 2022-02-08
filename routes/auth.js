const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//REGISTER
router.post("/register",async (req,res)=>{
  let salt = bcrypt.genSaltSync(10)                                                                                                                                     
  const hashPassword  = bcrypt.hashSync(req.body.password, salt)  
  const newUser = new User({
    username:req.body.username,
    email:req.body.email,
    password:hashPassword
  });
  try{
  const user = await newUser.save();
  res.status(201).json(user)
  }catch(err){
    res.status(500).json("You can't registered");
  }
})

//LOGIN
router.post("/login",async (req,res)=>{
  try{
  const {email,password}=req.body;
  const user = await User.findOne({email:email})
  console.log("USER",user)
  if(!user){
    throw new Error("User is not exist");
  }
  const cmp = await bcrypt.compare(password, user.password);
  if (cmp) {
    const accessToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"})
    res.status(200).json({success:true,accessToken:accessToken})
  } else {
    throw new Error("Wrong username or password.");
  }
  }catch(err){
    res.status(500).json("Login is not successful");
  }
})
module.exports = router;