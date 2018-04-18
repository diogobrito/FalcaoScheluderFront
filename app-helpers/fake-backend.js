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
        
        /*$httpBackend.whenGET('/api/profissionais').respond(function ( ) {
            return [200, { profissionais: [{ id: 1, nome: "Denis" }, { id: 2, nome: "Marcelo" }]}, {}];
        });*/

        $httpBackend.whenPOST('/api/profissionais').respond(function () {
            // get parameters from post request
            return  [200, { profissionais: [{ id: 2, nome: "Pedreiro" }, { id: 3, nome: "Manicure" },{ id: 1, nome: "Barbeiro" }]}, {}];
        });

        $httpBackend.whenPOST('/api/horarios').respond(function () {
            // get parameters from post request
            return  [200, { horarios: [{ id: 2, nome: "07/05/2018-11:00" }, { id: 3, nome: "09/05/2018-13:00" },{ id: 1, nome: "09/05/2018-15:00" }]}, {}];
        });

        /*
        $httpBackend.whenGET('/api/profissional/:id/agenda').respond(function (method, url, data, headers, params) {
            return [200, {  }, {}];
        });

        $httpBackend.whenPOST('/api/profissional/:id/agenda').respond(function (method, url, data, headers, params) {
            // get parameters from post request
            var params = angular.fromJson(data);

            /*{
                "professionalId": 1,
                "dataInicio": "2010-06-09T15:20:00Z",
                "usuarioId": 1
            }
            
            return [200, {  }, {}];
        });
        */
        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();