app.factory('trFactory',function(envioFactory){

	let addEnvio = function(e){
		this.envios.push(e);
	}

	let removeEnvio = function(e){
		let indexEnvio = this.getIndexEnvio(e);
		this.envios.splice(indexEnvio,1);
	}

	let getIndexEnvio = function(e){
		return this.envios.indexOf(this.getEnvio(e));
	}

	let getEnvio = function(e){
		return this.envios.find(function(env){ return env.id == e.id });
	}

	let setEnvio = function(e){
		this.envios[this.getIndexEnvio(e)] = e;
	}

	let loadTransferencia = function(o){
		this.institucionalOrigen = o.IdinstitucionalOrigen;
		this.institucionalDestino = o.IdinstitucionalDestino;
	}

	function Transferencia(){
		this.institucionalOrigen = 0;
		this.institucionalDestino = 0;
		this.envios = [];
		this.getIdBienesAgregados = function(){ return this.envios.reduce(function(ant,act,i,arr){ 
			act.bienes.forEach(function(b) { ant.push(b.id) });
			return ant;	
		},[]);
		}
	}

	Transferencia.prototype = {
		addEnvio: addEnvio,
		removeEnvio: removeEnvio,
		getIndexEnvio: getIndexEnvio,	
		getEnvio: getEnvio,
		setEnvio: setEnvio,
		loadTransferencia: loadTransferencia,

	}

	return Transferencia;

});