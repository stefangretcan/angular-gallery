'use strict';

angular
    .module('angular-auth', ['countrySelect'])
    .value('settings', {
        EMAIL_REGEXP: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
    })
    .run(function() {
        document.createElement('login');
        document.createElement('register');
    })
    .filter('range', function() {
        return function(input, min, max, order) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);

            if (!order || order === 'asc') {
                for (var i = min; i <= max; i++)
                    input[input.length] = i;
            }
            else if (order === 'desc') {
                for (var i = max; i >= min; i--)
                    input[input.length] = i;
            }

            return input;
        }
    })
    /*-------------------------------------------------------------------
    *
    * Request payload (JSON):
    * {
    *    email: emailHere,
    *    password: passwordHere
    * }
    *
    *-----------------------------------------------------------------*/
    .directive('login', function() {
        return {
            restrict: 'E',
            scope: {
                loginUrl: '@',
                forgotUrl: '@',
                successCallback: '&',
                errorCallback: '&',
                email: '=',
                password: '='
            },
            templateUrl: 'views/login.html',
            controller: function($scope, $attrs, $resource, settings) {
                // Make scope visible the injected 'settings' object.
                $scope.settings = settings;

                // Generate new id based on current timestamp.
                $scope.suffix = +new Date();

                $scope.login = function() {
                    var User = $resource($scope.loginUrl,
                                         { id: 'login' },
                                         { login: { method: 'POST' } });

                    User.login({ email: $scope.email, password: $scope.password },
                                // Success handler.
                                function(response) {
                                    $scope.successCallback()(response);
                                },
                                // Error handler.
                                function(response) {
                                    $scope.errorCallback()(response);
                                });
                }
            }
        }
  })
  /*-------------------------------------------------------------------
   *
   * Request payload (JSON):
   * {
   *    name: nameHere,
   *    email: emailHere,
   *    password: passwordHere,
   * }
   *
   *-----------------------------------------------------------------*/
    .directive('register', function() {
        return {
            restrict: 'E',
            scope: {
                termsOfUseUrl: '@',
                privacyPolicyUrl: '@',
                registerUrl: '@',
                minLegalAge: '@',
                successCallback: '&',
                errorCallback: '&',
                firstName: '=',
                lastName: '=',
                email: '=',
                password: '=',
                country: '=',
                dayOfBirth: '=',
                monthOfBirth: '=',
                yearOfBirth: '=',
                termsAndConditions: '=',
                newsletter: '='
            },
            templateUrl: '/views/register.html',
            controller: function($scope, $attrs, $resource, settings) {
                // Make visible into scope, the injected 'settings' object.
                $scope.settings = settings;

                // Generate new id based on current timestamp.
                $scope.suffix = +new Date();

                $scope.currentYear = new Date().getUTCFullYear();

                $scope.register = function() {
                    console.log($scope.registerUrl);

                    var User = $resource($scope.registerUrl,
                                        {},
                                        { register: { method: 'PUT' } });

                    User.register({ name: $scope.firstName + ' ' + $scope.lastName,
                                    email: $scope.email,
                                    password: $scope.password },
                                    // Success handler.
                                    function(response) {
                                        $scope.successCallback()(response);
                                    },
                                    // Error handler.
                                    function(response) {
                                        $scope.errorCallback()(response);
                                    });
                }
            }
        }
  });
