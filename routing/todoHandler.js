const express = require('express');
const mongoose = require('mongoose');
const loginTest = require('../middleware/loginTest');
const router = express.Router();
const todoSchema = require('../schemas/schemaFile')
const TodoModel = new mongoose.model('TodoModel', todoSchema);


//Get a todo..(async await)..
router.get('/:id', loginTest, async (req, res)=>{
  try{
    const data= await TodoModel.find({_id: req.params.id});
    res.status(200).json({
      message: "Data got successfully.....!",
      data: data
     });
     
  } catch(err) {
            res.status(500).json({
              error: "There was a server side error!",
  });
}});


//Get all todos..(cbf)..
router.get('/', loginTest, (req, res)=>{
           TodoModel.find({status:'active'})
          .select({
                    _id: 0,
                    date: 0
          })
          .limit(4)
          .exec((err,data)=> {
                    if (err) {
                      res.status(500).json({
                        error: "There was a server side error...!!",
                      });
                    } else {
                      res.status(200).json({
                        message: "Data got successfully..!",
                        result: data
                      });
                    }
          });

          
});


//Post a todo..
router.post("/",  (req, res) => {
          const newTodo = new TodoModel(req.body);
           newTodo.save((err) => {
            if (err) {
              res.status(500).json({
                error: "There was a server side error!",
              });
            } else {
              res.status(200).json({
                message: "Todo was inserted successfully!",
              });
            }
          });
});


//Post multiple todos..Datas send as array..
router.post('/all', (req, res)=>{
        TodoModel.insertMany(req.body, (err)=> {
          if (err) {
            res.status(500).json({
              error: "There are server side errors for many!",
            });
          } else {
            res.status(200).json({
              message: "Todos are inserted successfully!",
            });
          }
        });


});


//Put a todo and multiple todo..
router.put('/:id', (req, res)=>{
//updateOne..
           TodoModel.updateOne(
                    {_id: req.params.id},
                    {
                    $set:{
                              status: 'active',
                              title: 'This is updated..'
                    }}, (err)=>{ 
                              if (err) {
                       res.status(500).json({
                       error: "There is server side error..",
                       });
                       } else {
                       res.status(200).json({
                        message: "Todo is updated successfully!",
                       });                                      }
             }
          );
});


////updaMany
router.put('/update/all', (req, res)=>{
TodoModel.updateMany(
  {'status': 'inactive'},
  {
  $set:{
            status: 'active',                 
  }}, (err)=>{ 
            if (err) {
     res.status(500).json({
     error: "There is server side error..!!",
     });
     } else {
     res.status(200).json({
      message: "Todos are updated successfully!",
     });                                      }
});
});


//Delete todo..
router.delete('/:id', (req, res)=>{
           TodoModel.deleteOne({_id: req.params.id},(err)=> {
                 if (err) {
                   res.status(500).json({
                     error: "There was a server side error!",
                   });
                 } else {
                   res.status(200).json({
                     message: "Data Deteled successfully!",

                    
                   });
                   console.log('Fntn is going alr8..');
                 }
       });
       

});


//Get active toto by customized fntn(async await)..
router.get('/active/status', async(req, res)=>{
    try{
      const todo= new TodoModel();
      const data= await todo.findActiveStatus();
      res.status(200).json({
        message: 'Data got successfully..',
        data: data
      })
   }catch(err){
     res.status(500).json({
       error: 'The funtion is not working..'
     })
   }
});


//Get active toto by customized fntn(call back fntn)..
router.get('/active/cb',(req, res)=>{
      const todo= new TodoModel();
      todo.findActiveStatusCb((err, data)=>{
        if (err) {
          res.status(500).json({
            error: "There is error!",
          });
        } else {
          res.status(200).json({            
            message: "Active data got successfully!",
            data: data,
});
}})
});


//Get a todo by static method(async await..)
router.get('/js/js', async(req, res)=>{
  try{
    const data= await TodoModel.findByjs();
    res.status(200).json({
      message: 'Data got successfully..',
      data: data
    });
  } catch(err){
    res.status(500).json({
      error: 'There is error..'
    });
  }

});


//Get a todo by static method cb fntn..
router.get('/cb/cb', (req, res)=>{
  TodoModel.findByjsCb((err, data)=>{
    if (err) {
      res.status(500).json({
        error: "There is error!",
      });
    } else {
      res.status(200).json({            
        message: "The data got successfully!",
        data: data,
});
}});
});


//Get a todo by static query helper..
router.get('/ln/ln', async (req, res)=>{
  const data= await TodoModel.find().byLang('mult');
  res.status(200).json({
    message: ' Data got successfully..',
    data: data
  })
 });


module.exports = router;