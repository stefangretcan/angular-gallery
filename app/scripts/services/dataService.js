'use strict';

angular
    .module('angular-gallery-app')
    .value('config', {
        'imagesUrl': 'data/imageGallery.json'
    })
    .factory('DataService', ['$http', '$q', 'config', function ($http, $q, config) {
        return {
            imagesUrl: config.imagesUrl,
            getImages: function() {
                var defer = $q.defer();

                $http
                    .get(this.imagesUrl)
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function() {
                        defer.reject('An error occurred while getting images.');
                    });

                return defer.promise;
            }
        }
    }]);
