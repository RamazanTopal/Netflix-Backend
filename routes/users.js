const router = require("express").Router();
const User = require("../models/User");
const verify = require("../utils/verifyToken")
const bcrypt = require("bcrypt")
//UPDATE
router.put("/:id",verify,async (req,res)=>{
  if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
      let salt = bcrypt.genSaltSync(10)                                                                                                                                     
      req.body.password = bcrypt.hashSync(req.body.password, salt)  
    }
    try{
      console.log("req.body",req.body,req.params.id)
      const updatedUser=await User.updateOne({_id:req.params.id}, req.body, { runValidators: true });
      console.log("UPDATED USER",updatedUser)
      res.status(200).json(updatedUser)
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("You can update only your account")
  }
})

//DELETE
router.delete("/:id",verify,async (req,res)=>{
  if(req.user.id === req.params.id || req.user.isAdmin){
    try{
      const updatedUser=await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User is deleted!")
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("You can delete only your account")
  }
})

//GET
router.get("/find/:id",verify,async (req,res)=>{
    try{
      const user=await User.findById(req.params.id);
      res.status(200).json(user)
    }catch(err){
      res.status(500).json(err);
    }
})

//GET ALL
router.get("/",verify,async (req,res)=>{
  const query = req.query.new;
  console.log("isAdmin",req.user.isAdmin)
  if( req.user.isAdmin){
    try{
      const users = query ? await User.find().limit(10):await User.find();
      res.status(200).json(users)
    }catch(err){
      res.status(500).json(err);
    }
  }else{
    res.status(403).json("You are not allowed to see all users!")
  }
})


//STATS
router.get("/stats",verify,async (req,res)=>{
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear()-1);
  
  try{
    const data = await User.aggregate([
      {
        $project:{
          month:{
            $month:"$createdAt"
          }
        }
      },{
        $group:{
          _id:"$month",
          total:{$sum:1}
        }
      }
    ])
    res.status(200).json(data)
  }catch(err){
    res.status(500).json(err);
  }
})
module.exports = router