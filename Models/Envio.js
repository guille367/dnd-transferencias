app.factory('envioFactory',function(){

	let addBien = function(e){
		e.agregado = true;
		this.bienes.push(e);
	}

	let removeBien = function(e){
		e.agregado = false;
		this.bienes.splice(this.getIndexBien(e),1);
	}

	let getIndexBien = function(e){
		return this.bienes.indexOf(this.getBien(e));
	}

	let getBien = function(e){
		return this.bienes.find(function(bien){ return bien.Id == e.Id });
	}

	let addSubCuenta = function(sc){
		this.subCuentas.push(sc);
	}

	let removeSubCuenta = function(sc){
		this.subCuentas.splice(this.subCuentas.indexOf(sc),1);
	}

	let getBienesAgrupados = function(sc){
		return this.bienes.reduce(function(arr, e){

			if(arr.indexOf(e) < 0 )
				arr.push(e.subCuenta);

		    return arr },[]);
	}

	function Envio(){
		this.id = 0,
		this.fechaEntrega = new Date();
		this.bienes = [];
		this.subCuentas = function(){
			return this.bienes.map(function(b){ return b.subCuenta; }).reduce(function(ant, act, indice, arr){

			if(ant.indexOf(act) < 0)
				ant.push(act);

		    return ant },[]);
		};
		this.bienesPorSubCuenta = function(sc){
			return this.bienes.filter(function(b){ return b.subCuenta == sc });
		},
		this.idBienesEnvio
	}

	Envio.prototype = {
		addBien: addBien,
		removeBien: removeBien,
		getIndexBien: getIndexBien,	
		getBien: getBien,
		addSubCuenta: addSubCuenta,
		removeSubCuenta: removeSubCuenta,
		getBienesAgrupados: getBienesAgrupados,
	}

	return Envio;
});