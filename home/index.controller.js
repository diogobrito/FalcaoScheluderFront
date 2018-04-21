(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController',['$scope','$http', Controller]);

    function Controller($scope,$http) {
        var vm = this;
        vm.cadastrar = cadastrar;

        profissionais();
        horarios();
        parceiros();
        servicosAgendados();

        function cadastrar() {
            console.log("cadastrando...");
            vm.loading = true;
            console.log(vm.nomeParceiro.id);
            console.log(vm.nomeParceiro.nome);
            console.log(vm.nomeProfissional.id);
            console.log(vm.nomeProfissional.nome);
            console.log(vm.nomeHorario.id);
            console.log(vm.nomeHorario.nome);
        }

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

        function parceiros(){
            $http.post('/api/parceiros').success(function (response) {
                $scope.parceiros = response;
            });
        }

        function servicosAgendados() {
            $http.post('/api/servicosAgendados').success(function (response) {
                $scope.servicosAgendados = response;
            });
            
        }
    }
})();