const jwt= require('jsonwebtoken');

const loginTest= (req, res, next)=>{
  const { authorization }= req.headers;
  try{
      const token= authorization.split(' ')[1];
      const decoded= jwt.verify(token, process.env.JWT_SECRET);//provides data..
      const { username, userId }= decoded;
      req.username= username;
      req.userId= userId;
      next();

  } catch(err){
            res.status(500).json({
                      error: "Here is error.."
            });
            
  }

};

module.exports= loginTest;