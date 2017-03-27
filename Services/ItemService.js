app.service('itemService', ['$http', '$q', function ( $http, $q ) {

    var getItemsByClase = function (idClase) {
        var http = $http({
            method: 'GET',
            url: '/API/Items',
            params: {
                ClaseId: idClase
            }
        }).then(function (response) {
            return response.data.Items;
        }).catch(function (error) {
            return $q.reject(error.data.Message);
        })

        return http;
    }

    var getClasesBySubCuenta = function (idSubCuenta) {
        var http = $http({
            method: 'GET',
            url: '/API/Catalogo/GetClaseBySubcuenta',
            params: { subcuentaId: idSubCuenta }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return $q.reject(error.data.Message);
        })

        return http;
    }

    var getRubros = function (filterkey) {
        var http = $http({
            method: 'GET',
            url: '/API/RubroPatrimonial/Get',
            params: {
                like: filterkey || ''
            }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return $q.reject(error.data.Message);
        });

        return http;
    }

    return {
        getClasesBySubCuenta: getClasesBySubCuenta,
        getRubros: getRubros,
        getItemsByClase: getItemsByClase
    }

}]);