app.controller('bienController', ['$scope', 'bienService','trFactory', 'transferenciaMock', function ($scope, bienService, trFactory, transferenciaMock) {

    $scope.CantidadPermitida = 200;
    $scope.CantidadCargada = 0;
    $scope.buscando = false;
    $scope.Bienes = null;
    $scope.subCuentas = [];
    $scope.BienesAgregadosAgrupados = [];
    $scope.BienesAgregados = [];
    $scope.ModoEdicion = true;
    $scope.CurrentYear = new Date().getFullYear();
    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.SinOrigen = false;

    $scope.transferencia = transferenciaMock;

    $scope.CargarBienesAgregados = function (modoEdicion, bienes) {
        $scope.ModoEdicion = modoEdicion;
        $scope.AddBienesPage(bienes);
    }

    $scope.searchBienesByFilter = function () {
        bienService.getBienesByFilter($scope.bienesFilter)
            .then(function (data) {
                $scope.Bienes = data;
                $scope.pageCount = Math.ceil(data.TotalCount / data.PageSize);
                $scope.currentPage = data.Page;
                $scope.ModoEdicion = true;
                $scope.buscando = false;
            });
        $scope.buscando = true;
    };

    $scope.removeBien = function (bien) {
        $scope.CantidadCargada--;

        var i = $scope.getIndexExiste($scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc], bien.Id);
        if (i != -1) {
            $scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc].splice(i, 1);
        }

        if ($scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc].length == 0) {
            $scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc] = undefined;
            i = $scope.subCuentas.indexOf(bien.RubroPatrimonialDesc)
            $scope.subCuentas.splice(i, 1);
        }

        var indexBien = $scope.getIndexExiste($scope.BienesAgregados, bien.Id);
        if (indexBien != -1) {
            $scope.BienesAgregados.splice(indexBien, 1);
        }

    }

    $scope.AddBien = function (bien) {
        if ($scope.CantidadCargada < $scope.CantidadPermitida) {
            $scope.CantidadCargada++;
            if ($scope.subCuentas.indexOf(bien.RubroPatrimonialDesc) == -1)
                $scope.subCuentas.push(bien.RubroPatrimonialDesc);

            if ($scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc] == undefined)
                $scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc] = [];

            $scope.BienesAgregadosAgrupados[bien.RubroPatrimonialDesc].push(bien);
            $scope.BienesAgregados.push(bien);
        }
    }

    $scope.getIndexExiste = function (array, id) {
        var indexExiste = -1;
        array.some(function (element, index, array) {
            if (element.Id == id) {
                indexExiste = index;
                return true;
            }
        });
        return indexExiste;
    }


    $scope.existeBien = function (bien) {
        return $scope.BienesAgregados.some(function (element, index, array) {
            return element.Id == bien.Id;
        });
    }

    $scope.existeBienBuscador = function (bien) {
        return $scope.BienesAgregados.some(function (element, index, array) {
            return element.Id == bien.Id;
        });
    }


    this.MostrarResultados = function () {
        return $scope.Bienes !== null && $scope.Bienes.Items.length > 0;
    };

    this.MostrarMensajeSinResultados = function () {
        return $scope.Bienes !== null && $scope.Bienes.Items.length == 0;
    }

    $scope.mostrarAgregarTodos = function (bienes) {
        if (bienes != undefined) {
            return bienes.some(function (element, index, array) {
                return !$scope.existeBien(element);
            });
        }
    }

    $scope.AddBienesPage = function (bienesParam) {
        var bienesClonados = [];
        angular.copy(bienesParam, bienesClonados);
        bienesClonados.forEach(function (bien, index) {
            if (!$scope.existeBien(bien))
                $scope.AddBien(bien);
        });
    }

    $scope.RemoveBienes = function (bienesParam) {
        var bienesClonados = [];
        angular.copy(bienesParam, bienesClonados);
        bienesClonados.forEach(function (bien, index) {
            $scope.removeBien(bien);
        });
    }

    $scope.GetIndexBien = function (bien) {
        return $scope.BienesAgregados.indexOf(bien);
    }

    $scope.$watch('bienesFilter.page', function (newValue) {
        $scope.currentPage = newValue;
    });

    $scope.GoToPage = function (numberPage) {
        $scope.bienesFilter.Page = numberPage;
        return $scope.searchBienesByFilter();
    }

    $scope.GoToPreviusPage = function () {
        $scope.bienesFilter.Page--;
        return $scope.searchBienesByFilter();
    }

    $scope.GoToNextPage = function () {
        $scope.bienesFilter.Page++;
        return $scope.searchBienesByFilter();
    }

    $scope.GoToFirstPage = function () {
        $scope.bienesFilter.Page = 1;
        return $scope.searchBienesByFilter();
    }

    $scope.GoToLastPage = function () {
        $scope.bienesFilter.Page = $scope.pageCount;
        return $scope.searchBienesByFilter();
    }

    $scope.$parent.$on("GoToLastPage", function () {
        $scope.GoToLastPage();
    });

    $scope.$parent.$on("GoToFirstPage", function () {
        $scope.GoToFirstPage();
    });

    $scope.$parent.$on("GoToNextPage", function () {
        $scope.GoToNextPage();
    });

    $scope.$parent.$on("GoToPreviusPage", function () {
        $scope.GoToPreviusPage();
    });

    $scope.$parent.$on("GoToPage", function (e, page) {
        $scope.GoToPage(page);
    });

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    };

}]);