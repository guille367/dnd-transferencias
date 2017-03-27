app.factory('bienesFactory',function(){
	
	function Bien(id, sc){
		this.id = id;
		this.rubroPatrimonialCodigoYDesc = 'rubro #' + this.id;
		this.ejercicio = 'ejercicio ' + (this.id * 3);
		this.subCuenta = sc;
	}

	return Bien;

});