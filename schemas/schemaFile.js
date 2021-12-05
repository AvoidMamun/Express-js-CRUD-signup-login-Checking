const mongoose = require('mongoose');


const schemaFile = mongoose.Schema({
      
          title: {
                    type: String,
                    required: true,
          },
          description: String,
          status: {
                    type: String,
                    enum: ['active', 'inactive'],
          },
          date: {
                    type: Date,
                    default: Date.now,
          },
});

//Customized function instance methods..(async await)..
schemaFile.methods= {
          findActiveStatus: function(){
          return mongoose.model('TodoModel').find({status: 'active'});
          },

//Customized function instance methods..(call back fntn)..
          findActiveStatusCb: function(cb){
          return mongoose.model('TodoModel').find({status: 'active'},cb);          
          },
};

//Get a todo by static method(async await..)
schemaFile.statics= {
   findByjs: function(){
    return this.find({description: /fun/i});//this= mongoose.model(TodoModel..)
   },

   //Get a todo by static method cb fntn..
   findByjsCb: function(cb){
          return this.find({description: /fun/i},cb);
        },
};

//Query helper..
schemaFile.query= {
          byLang: function(lang){
          return this.find({title: new RegExp(lang, 'i')});
          }
}

module.exports = schemaFile;