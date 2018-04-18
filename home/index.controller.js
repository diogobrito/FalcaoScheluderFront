(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController',['$scope','$http', Controller]);

    function Controller($scope,$http) {
        var vm = this;

        profissionais();
        horarios();

        function profissionais(){

            $http.post('/api/profissionais').success(function (response) {
                $scope.profissionais = response;
            });
        }
        function horarios(){

            $http.post('/api/horarios').success(function (response) {
                $scope.horarios = response;
            });
        }

    }
})();