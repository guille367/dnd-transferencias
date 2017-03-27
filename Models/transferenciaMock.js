app.factory('transferenciaMock',function(trFactory, envioMock){

	let transferenciaMock = new trFactory();
	transferenciaMock.institucionalOrigen = 21;
	transferenciaMock.institucionalDestino = 44;
	transferenciaMock.envios = envioMock;

	return transferenciaMock;

});