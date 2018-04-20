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

        function cadastrar() {
            console.log("cadastrando...");
            vm.loading = true;

       
        console.log(vm);
        /*vm.horarioSelecionado  = horarioSelecionado;
        vm.parceiroSelecionado = parceiroSelecionado;*/
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

    }
})();