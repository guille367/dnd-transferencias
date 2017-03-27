app.factory('envioMock',function(envioFactory, bienesFactory){

	let enviosMock = [];

	let envioUno = new envioFactory();
	envioUno.id = 1;
	envioUno.fechaEntrega = new Date();
	envioUno.bienes = [
		new bienesFactory(0,'sc1'),
		new bienesFactory(1,'sc2'),
		new bienesFactory(2,'sc1'),
	];

	enviosMock.push(envioUno);

	let envioDos = new envioFactory();
	envioDos.id = 2;
	envioDos.fechaEntrega = new Date();
	envioDos.bienes = [
		new bienesFactory(3,'sc2'),
		new bienesFactory(4,'sc1'),
		new bienesFactory(5,'sc2'),
	];
	enviosMock.push(envioDos);

	let envioTres = new envioFactory();
	envioTres.id = 3;
	envioTres.fechaEntrega = new Date();
	envioTres.bienes = [
		new bienesFactory(6,'sc1'),
		new bienesFactory(7,'sc1'),
		new bienesFactory(8,'sc1'),
	];
	enviosMock.push(envioTres);
	


	return enviosMock;

});