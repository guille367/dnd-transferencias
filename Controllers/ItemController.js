app.controller('itemController', ['$scope', function ($scope) {

    $scope.CantidadPermitida = 200;
    $scope.CantidadCargada = 0;
    $scope.buscando = false;
    $scope.Items = null;
    $scope.ItemsAgregadosAgrupados = [];
    $scope.ItemsAgregados = [];
    $scope.subCuentas = [];
    $scope.currentPage = 1;
    $scope.pageCount = 1;
    $scope.ModoEdicion = true;
    $scope.errorCantidad = false;

    $scope.AddItem = function (item) {
        $scope.errorCantidad = false;
        var cp = {};

        if (item.Cantidad <= 0 || item.Cantidad == undefined) {
            $scope.errorCantidad = true;
            return;
        }

        if ($scope.subCuentas.indexOf(item.Rubro) == -1)
            $scope.subCuentas.push(item.Rubro);

        if ($scope.ItemsAgregadosAgrupados[item.Rubro] == undefined) {
            $scope.ItemsAgregadosAgrupados[item.Rubro] = [];
        }
        else {
            // Si el ìtem ya existía, le incremento la cantidad
            var itemExistente =  $scope.ItemsAgregadosAgrupados[item.Rubro].find(function (i) { return i.Codigo == item.Codigo });
            if (itemExistente) { 
                itemExistente.Cantidad += item.Cantidad;
                return;
            }
        }

        angular.copy(item, cp);
        $scope.ItemsAgregadosAgrupados[item.Rubro].push(cp);
        $scope.ItemsAgregados.push(cp);
    }

    $scope.removeItem = function (item) {
        $scope.CantidadCargada--;

        var i = $scope.getIndexExiste($scope.ItemsAgregadosAgrupados[item.Rubro], item.Id);
        if (i != -1) {
            $scope.ItemsAgregadosAgrupados[item.Rubro].splice(i, 1);
        }

        if ($scope.ItemsAgregadosAgrupados[item.Rubro].length == 0) {
            $scope.ItemsAgregadosAgrupados[item.Rubro] = undefined;
            i = $scope.subCuentas.indexOf(item.Rubro)
            $scope.subCuentas.splice(i, 1);
        }

        var indexItem = $scope.getIndexExiste($scope.ItemsAgregados, item.Id);
        if (indexItem != -1) {
            $scope.ItemsAgregados.splice(indexItem, 1);
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

    $scope.existeItem = function (item) {
        return $scope.ItemsAgregados.some(function (element, index, array) {
            return element.Id == item.Id;
        });
    }

    $scope.existeItemBuscador = function (item) {
        return $scope.ItemsAgregados.some(function (element, index, array) {
            return element.Id == item.Id;
        });
    }

    this.MostrarResultados = function () {
        return $scope.Items !== null && $scope.Items.Items.length > 0;
    };

    this.MostrarMensajeSinResultados = function () {
        return $scope.Items !== null && $scope.Items.Items.length == 0;
    }

    $scope.mostrarAgregarTodos = function (items) {
        if (items != undefined) {
            return items.some(function (element, index, array) {
                return !$scope.existeItem(element);
            });
        }
    }
    $scope.AddItemsPage = function (itemsParam) {
        var itemsClonados = [];
        $scope.errorCantidad = itemsParam.some(function (e) { return e.Cantidad <= 0 || e.Cantidad == undefined });

        if ($scope.errorCantidad)
            return;

        angular.copy(itemsParam, itemsClonados);
        itemsClonados.forEach(function (item, index) {
            $scope.AddItem(item);
        });
    }

    $scope.RemoveItems = function (itemsParam) {
        var itemsClonados = [];
        angular.copy(itemsParam, itemsClonados);
        itemsClonados.forEach(function (items, index) {
            $scope.removeItem(items);
        });
    }

    $scope.GetIndexItem = function (item) {
        return $scope.ItemsAgregados.indexOf(item);
    }

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

}]);