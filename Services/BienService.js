app.service('bienService', ["$http", "$q", function ($http, $q) {

    var getBienesByFilter = function (filter) {
        var http = $http({
            method: 'GET',
            url: '/API/Bien/GetByFilter',
            params: {
                Id: filter.Id,
                Ejercicio: filter.Ejercicio,
                RubroPatrimonial: filter.RubroPatrimonial,
                CodigoRubroPatrimonial: filter.CodigoRubroPatrimonial,
                IdInstitucionalPatrimonio: filter.IdInstitucionalPatrimonio,
                Page: filter.Page
            }
        });
        return http.then(function (response) {
            return response.data;
        }, function (error) {
            return $q.reject(error.data.Message);
        });
    }

    return {
        getBienesByFilter: getBienesByFilter
    }

}]);