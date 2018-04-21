(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController',['$scope','$http', Controller]);

    function Controller($scope,$http) {
        var vm = this;
        vm.cadastrar = cadastrar;
        vm.servicos = servicos;
        vm.profissionais = profissionais;
        vm.agenda = [];

        $http.get('https://falcon-scheduler-api.herokuapp.com/industries').success(function (response) {
            $scope.parceiros = response.industries;
        });

        $http.get('https://falcon-scheduler-api.herokuapp.com/scheduled').success(function (response) {
            vm.agenda = response.response;
        });

        function profissionais(servicoId) {
            $scope.profissionais = $scope.servicos.filter(
                function (value) {
                    return value.id == parseInt(servicoId)
                }
            )[0].professionals;
        }

        function servicos(servicoId){
            $http.get('https://falcon-scheduler-api.herokuapp.com/industries/' + servicoId + '/services').success(function (response) {
                $scope.servicos = response.services;
            });
        }

        function cadastrar() {
            $http.post('https://falcon-scheduler-api.herokuapp.com/scheduled', { professionalId: vm.profissionalSelecionado, startDate: vm.startDate }).success(function (response) {
                $http.get('https://falcon-scheduler-api.herokuapp.com/scheduled').success(function (response) {
                    vm.agenda = response.response;
                });
            });
        }
    }
})();