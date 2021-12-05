const express = require('express');
const todoHandler = require('./routing/todoHandler');
const userHandler = require('./routing/userHandler');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());

//Database connection with mongoose..
mongoose.connect('mongodb://localhost/todos',{
          useNewUrlParser: true,
          useUnifiedTopology: true,
}).then(()=>console.log('Successful connection.....'))
.catch((err)=>console.log(err));

//application routes..
app.use('/todos', todoHandler);
app.use('/user', userHandler);//for authentication..

//Error handling..
const errorHandler=(err, req, res, next)=>{
          if(res.headersSent){
                    return next(err);
          }else{
                    res.status(500).json({error: 'error'});
          }
};
app.use(errorHandler);

app.listen(5000,()=>{
          console.log('Server is running at port 5000..');
});