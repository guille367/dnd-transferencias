app.controller('enviosController',['$scope', 'trFactory', 'transferenciaMock',function($scope, trFactory, transferenciaMock){
	
	q = transferenciaMock;
	a = $scope;
	$scope.transferencia = transferenciaMock;
	$scope.bienes = transferenciaMock.envios.reduce(function(ant,act,i,arr){ 
		act.bienes.forEach(function(b) { ant.push(b); } );
		return ant; 
	},[]);

	$scope.bienes.push({ id:9, rubroPatrimonialCodigoYDesc:'rubro #9', ejercicio: 'NUEVO!',subCuenta:'sc1' });

	$scope.existeBien = function(bien){
		return $scope.transferencia.getIdBienesAgregados().some(function(b){ return bien.id == b; });
	}

	$scope.editEnvio = function(e){
		var q = {};
		angular.copy(e,q);
		q.__proto__ = e.__proto__;	
		$scope.envio = q;
	}

	$scope.guardarCambios = function(){
		var q = {};
		angular.copy($scope.envio,q);
		q.__proto__ = $scope.envio.__proto__;
		$scope.transferencia.setEnvio(q);
	}

	$scope.recargarLista = function(){
		$scope.envio = {};
		$scope.bienes = transferenciaMock.envios.reduce(function(ant,act,i,arr){ 
		act.bienes.forEach(function(b) { ant.push(b); } );
		return ant; 
		},[]);

		$scope.bienes.push({ id:9, rubroPatrimonialCodigoYDesc:'rubro #9', ejercicio: 'NUEVO!',subCuenta:'sc1' });

	}

}]);