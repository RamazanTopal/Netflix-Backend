const mongoose = require("mongoose");
var bcrypt = require('bcrypt')  
const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  profilePic:{
    type:String,
    default:""
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},{timestamps:true});

                                                                                                                                                                      
UserSchema.pre('save', function(next) {                                                                                                                                        
  if(this.password) {                                                                                                                                                        
      var salt = bcrypt.genSaltSync(10)                                                                                                                                     
      this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
  }                                                                                                                                                                          
  next()                                                                                                                                                                     
})    

module.exports = mongoose.model("User",UserSchema)