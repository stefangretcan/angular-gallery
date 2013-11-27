'use strict';

angular
    .module('angular-gallery-app', ['ngResource', 'ngRoute', 'angular-gallery'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/gallery', {
                templateUrl: 'views/imageGallery.html',
                controller: 'ImageGalleryCtrl',
                reloadOnSearch: false,
                resolve: {
                    images: ['DataService', function(DataService) {
                        return DataService.getImages();
                    }]
                }
            })
            .otherwise({
                redirectTo: '/',
                reloadOnSearch: false
            });
    });
