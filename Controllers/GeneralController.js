app.controller('generalController',['$scope','trFactory',function($scope, trFactory, Falopa){
	
    q = new trFactory();

	q.addEnvio({id:2});
	console.log(q.envios);

}]);