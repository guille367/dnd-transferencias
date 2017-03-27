/// <reference path="ItemController.js" />
app.controller('solicitudBienesController', ['$scope', '$controller', 'itemService', function ($scope, $controller, itemService) {

    angular.extend(this, $controller('itemController', { $scope: $scope }));

    $scope.IdHidden = 'Items[{index}].Id';
    $scope.CantHidden = 'Items[{index}].Cantidad';

    $scope.getId = function (item) {
        return $scope.IdHidden.toString().replace('{index}', $scope.GetIndexItem(item));
    }

    $scope.getCantidad = function (item) {
        return $scope.CantHidden.toString().replace('{index}', $scope.GetIndexItem(item));
    }

    $scope.buscarItems = function () {
        itemService.getItemsByClase($scope.clase.Id)
            .then(function (items) {
                $scope.ItemsDeposito = items;
            })
            .catch(function (e) {
                console.log("error");
                console.log(e);
            });
    }

    $scope.ddlRubrosChange = function () {
        itemService.getClasesBySubCuenta($scope.subcuenta)
            .then(function (items) {
                $scope.ClasesDeCatalogo = items;
            })
            .catch(function (e) {
                console.log("error");
                console.log(e);
            })
    }

    $scope.MostrarMensajeSinResultados = function () {
        //return $scope.ItemsDeposito !== null && $scope.ItemsDeposito.length == 0;
    }

}])