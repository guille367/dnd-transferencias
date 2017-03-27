app.controller('solicitudBajaController', ['$scope', '$controller', 'bienService', function ($scope, $controller, bienService) {

    angular.extend(this, $controller('bienController', { $scope: $scope }));

    $scope.SinOrigen = false;
    $scope.IdHidden = 'Bienes[{index}].Id'

    $scope.getId = function (bien) {
        return $scope.IdHidden.toString().replace('{index}', $scope.GetIndexBien(bien));
    }

    $scope.bienesFilter = {
        Id: '',
        RubroPatrimonial: '',
        CodigoRubroPatrimonial: '',
        Ejercicio: '',
        IdInstitucionalPatrimonio: 0
    }

    $scope.searchBienesByFilter = function () {
        $scope.buscando = true;
        if ($scope.InstitucionalDeOrigenCargado()) {
            $scope.SetOrigenToFilter();

            bienService.getBienesByFilter($scope.bienesFilter)
                .then(function (data) {
                    $scope.Bienes = data;
                    $scope.pageCount = Math.ceil(data.TotalCount / data.PageSize);
                    $scope.currentPage = data.Page;
                    $scope.ModoEdicion = true;
                    $scope.buscando = false;
                });
        }
        else {
            $scope.SinOrigen = true;
            $scope.Bienes = null;
            $scope.buscando = false;
        }
    };

    $scope.InstitucionalDeOrigenCargado = function () {
        return $('#InstitucionalDC_Id').val() != '';
    }

    $scope.SetOrigenToFilter = function () {
        $scope.SinOrigen = false;
        $scope.bienesFilter.IdInstitucionalPatrimonio = parseInt($('#Institucional_Id').val());
    }
}]);