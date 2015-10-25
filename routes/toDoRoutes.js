var express = require('express');
//has own set of rules that each router gets
var mongoose = require('mongoose');
var ToDo = mongoose.model('ToDo');
var router = express.Router();




//one use of middleware
router.use('/', function(req,res,next){
  console.log('hit the todo router');
  next();
});

router.param('id', function(req,res,next,id){
  ToDo.findOne({_id:id}, function(err, result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find that specific todo"});
    req.todo = result;
    next();
  });
});
// GET /api/v1/todo
router.get('/',function(req,res,next){
  ToDo.find({}, function(err, result, next){
    if(err) return next(err);
    res.send(result);
  });
});

router.post('/', function(req,res,next){
  //passes in entire object and mogoose checks which align to model and puts it in db and sets its new value
  var todo = new ToDo(req.body);
  todo.completed = null;
  todo.created = new Date();
  todo.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.put('/:id', function(req,res,next){
  ToDo.update({_id: req.todo._id},{ $set: {completed: new Date()}},
  function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});


router.delete('/:id', function(req,res,next){
  ToDo.remove({_id:req.todo.id}, function(err,result){
    if(err) return next(err);
    res.send();
  });
});

router.patch('/:id', function(req,res,next){
  req.todo.completed = null;
  req.todo.save(function(err,result){
    if(err) return next(err);
    res.send(result);
  });
    // res.send();
});


module.exports = router;
