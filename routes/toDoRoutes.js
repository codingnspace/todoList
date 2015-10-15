var express = require('express');
var uuid = require('uuid');
var todos = [];
//has own set of rules that each router gets
var router = express.Router();

function ToDo(title, body){
  this.title = title;
  this.body = body;
  this.created = new Date();
  this.completed = null;
  this.id = uuid.v4();
}

var hw = new ToDo("Do HW","Create a new model for the blog app");
var shop = new ToDo("Go Shopping", "Walk to trader joes and pick up food for the week");
var bank = new ToDo("Go to the Bank", "Go to downtown to make a deosit");

todos.push(hw,shop,bank);

router.param('id', function(req,res,next,id){
  for(var i =0; i <todos.length; i++){
    if(id === todos[i].id){
      req.todo = todos[i];
      return next();
    }
  }
  res.status(400).send({err: "Couldnt find it"});
});
// GET /api/v1/todo
router.get('/',function(req,res){
//req.body is = newToDo (from controller and factory)
res.send(todos);

});
router.put('/:id', function(req,res){
  req.todo.completed = new Date();
  res.send();
});

router.post('/', function(req,res){
  var todo = new ToDo(req.body.title, req.body.body);
   todos.push(todo);
    res.send(todo);
});

router.delete('/:id', function(req,res){
  todos.splice(todos.indexOf(req.todo),1);
   res.send();
});

router.patch('/:id', function(req,res){
  req.todo.completed = null;
    res.send();
});


module.exports = router;
