const express = require('express');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const loginTest = require('../middleware/loginTest');
const userModel = new mongoose.model('userModel', userSchema);

//Sign up..(async await..)better idea.. 
router.post('/signup', async(req, res)=>{
          try{
                    const hashPassword= await bcrypt.hash(req.body.password, 10);
                    const newUser = new userModel({
                                name: req.body.name,
                                username: req.body.username,
                                password: hashPassword,
                      });
                      await newUser.save();
                      res.status(200).json({
                                message: "Signed up successfully!",
                              });
          } catch{
                    res.status(500).json({
                              message: "Sign up failed!",
                            });
          }
});

//sign up cb..
router.post('/signup',async(req, res)=>{
          const hashPassword= await bcrypt.hash(req.body.password, 10);
                    const newUser = new userModel({
                                name: req.body.name,
                                username: req.body.username,
                                password: hashPassword,
                      });
                       newUser.save((err)=>{
                                if(err){
                                        res.status(200).json({
                                          message: "Signed up successfully!",
                                         });

                                }else{
                                        res.status(500).json({
                                                  message: "Signed up unsuccessful!",
                                         });
                                }
                      });
});

//Login..
router.post('/login', async(req, res)=>{
       try{   
      const user= await userModel.find({username: req.body.username});
      if(user && user.length>0){
       const isValidPass= await bcrypt.compare(req.body.password, user[0].password);      
                 if(isValidPass){
                  const token= jwt.sign({
                      username: user[0].username,
                      userId: user[0]._id,      
                  }, process.env.JWT_SECRET, {
                      expiresIn: '1h',      
                  });
                  res.status(200).json({
                    "access token": token,
                    "message": "Login success.."
                 });
          } else{
                    res.status(401).json({
                              "error": "Authentication failed.."
                    });          
                 } 
        } else{
                  res.status(401).json({
                            "error": "Authentication failed.."
                  });
        }} 
          catch{
          res.status(401).json({
                    "error": " authentication failed..!!"
          });
        }

});

module.exports= router;
 