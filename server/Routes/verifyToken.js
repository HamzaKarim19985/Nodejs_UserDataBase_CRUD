const jwt = require("jsonwebtoken");

module.exports = function (req,res,next){

    const token = req.header("auth-token");
    if(!token) return res.status(401).send("Access denied:No Token");

   //verified returns _id of respective user object 
   try{
       const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       //all routes now have access to req.user(user ID) 
       req.user = verified; 
       //Moves to next middleware after verification
       next()
   }
   catch(err){
      res.status(400).send("Access denied:Invalid Token");
   }
}

