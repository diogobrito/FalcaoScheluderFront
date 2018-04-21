(function () {
    'use strict';

    angular
        .module('app')
        .run(setupFakeBackend);

    // setup fake backend for backend-less development
    function setupFakeBackend($httpBackend) {
        var testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

        // fake authenticate api end point
        $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            // get parameters from post request
            var params = angular.fromJson(data);
            console.log("logado");

            
            // check user credentials and return fake jwt token if valid
            if (params.username === testUser.username && params.password === testUser.password) {
                return [200, { token: 'fake-jwt-token' }, {}];
            } else {
                return [200, {}, {}];
            }
        });
        

        $httpBackend.whenPOST('/api/profissionais').respond(function () {
            // get parameters from post request
            return  [200, { profissionais: [{ id: 2, nome: "Pedreiro" }, { id: 3, nome: "Manicure" },{ id: 1, nome: "Barbeiro" }]}, {}];
        });

        $httpBackend.whenPOST('/api/horarios').respond(function () {
            // get parameters from post request
            return  [200, { horarios: [{ id: 2, nome: "07/05/2018-11:00" }, { id: 3, nome: "09/05/2018-13:00" },{ id: 1, nome: "09/05/2018-15:00" }]}, {}];
        });

        $httpBackend.whenPOST('/api/parceiros').respond(function () {
            // get parameters from post request
            return  [200, { parceiros: [{ id: 2, nome: "Soho" }, { id: 3, nome: "Salão Stars" },{ id: 1, nome: "Atlas Engenharia" }]}, {}];
        });

        $httpBackend.whenPOST('/api/servicosAgendados').respond(function () {
            // get parameters from post request
            return  [200, { servicosAgendados: [{ parceiro: "Soho", servico: "Cabelo", data: "20/06/2018 às 14:00" }, 
                                                { parceiro: "Cinemark", servico: "Cinema", data: "20/07/2018 às 20:00" },
                                                { parceiro: "PetFacil", servico: "Banho e Tosa", data: "30/05/2018 às 09:00" }
                                            ]}, 
            {}];
        });

        
        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();