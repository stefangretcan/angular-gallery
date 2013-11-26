'use strict';

angular.module('angularLoginApp', ['ngResource', 'ngRoute', 'angular-image-gallery'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/gallery', {
                templateUrl: 'views/imageGallery.html',
                controller: 'ImageGalleryCtrl',
                reloadOnSearch: false,
                resolve: {
                    images: function(DataService) {
                        return DataService.getImages();
                    }
                }
            })
            .otherwise({
                redirectTo: '/',
                reloadOnSearch: false
            });
    });
