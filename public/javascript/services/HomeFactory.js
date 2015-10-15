(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};

	o.getTodos = function(){
		var q = $q.defer();
		$http.get('/api/v1/todo')
		.then(function(res){
			q.resolve(res.data);
		});
		return q.promise;
	};

	o.createToDo = function(newToDo){
		var q = $q.defer();

		// $http.verb('url', body)
		$http.post('/api/v1/todo',newToDo )
		.then(function(res){
		 q.resolve(res.data);
	 });
	 return q.promise;
 };

o.completeToDo = function(todo){
	var q = $q.defer();
	$http.put('/api/v1/todo/' + todo.id).then(function(){
		q.resolve();
	});
	return q.promise;
};

o.unCompleteToDo = function(todo){
	var q = $q.defer();
	$http.patch('/api/v1/todo/' + todo.id).then(function(){
			q.resolve();
	});
	return q.promise;
};
 o.deleteToDo = function(todo){
	 var q = $q.defer();

	 $http.delete('/api/v1/todo/' + todo.id).then(function(){
		 q.resolve();
	 });
	 return q.promise;
 };
		return o;
	}
})();
