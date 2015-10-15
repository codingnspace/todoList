var uuid = require('uuid');

var TodoModule = {
  todos: [],
  find: function(id,cb){
    for(var i = 0; i<this.todos.length; i++){
      if(id === this.todos[i].id){
        return cb(null,this.todos[i]);
      }
    }
    cb({err: "Cant find a todo with the id of " + id});
  },
  create: function(todo,cb){
    if(!todo.title || !todo.body){
      return cb({err: "Please fill out all required fields"});
    }
    var newToDo = new ToDo(todo.title,todo.body);
    this.todos.push(newToDo);
    cb(null,newToDo);
  },
  remove: function(todo, cb){
    if(this.todos.indexOf(todo) === -1){
      return cb({err: "Couldnt find todo in the array"});
    }
    this.todos.splice(this.todos.indexOf(todo), 1);
    cb(null, "Success!");
  }
};

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

TodoModule.todos.push(hw,shop,bank);
module.exports = TodoModule;
