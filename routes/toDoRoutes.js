var express = require('express');
var uuid = require('uuid');
//has own set of rules that each router gets
var ToDo = require('../models/todos');
var router = express.Router();




//one use of middleware
router.use('/', function(req,res,next){
  console.log('hit the todo router');
  next();
});

router.param('id', function(req,res,next,id){
  ToDo.find(id, function(err, result){
    if(err) return next(err);
    req.todo = result;
    next();
  });
});
// GET /api/v1/todo
router.get('/',function(req,res){
//req.body is = newToDo (from controller and factory)
res.send(ToDo.todos);

});
router.put('/:id', function(req,res){
  req.todo.completed = new Date();
  res.send();
});

router.post('/', function(req,res,next){
  ToDo.create(req.body, function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.delete('/:id', function(req,res,next){
  ToDo.remove(req.todo, function(err,result){
    if(err) return next(err);
    res.send();
  });
});

router.patch('/:id', function(req,res){
  req.todo.completed = null;
    res.send();
});


module.exports = router;
