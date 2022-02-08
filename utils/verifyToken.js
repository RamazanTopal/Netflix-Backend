const jwt = require("jsonwebtoken")

function verify(req,res,next){
  const authHeader = req.headers;
  if(authHeader){
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
      if(err){
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    })  
  }
}

module.exports = verify;