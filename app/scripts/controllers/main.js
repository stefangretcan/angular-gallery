'use strict';

angular.module('angularLoginApp')
    .controller('MainCtrl', function ($scope, config) {
        /*-------------------------------------------------------------------
         *
         * Properties
         *
         *-----------------------------------------------------------------*/

        $scope.config = config;

        /*-------------------------------------------------------------------
         *
         * Methods
         *
         *-----------------------------------------------------------------*/

        // User was successfully logged in?
        $scope.loginSuccessCallback = function(response) {
            // to implement this
        };

        // Login error?
        $scope.loginErrorCallback = function(response) {
            // to implement this
        };

        $scope.registerSuccessCallback = function(response) {
            // to implement this
        };

        $scope.registerErrorCallback = function(response) {
            // to implement this
        };
    });
