'use strict';

var ImgCtrl = angular
    .module('angular-gallery-app')
    .controller('ImageGalleryCtrl', ['$scope', '$location', 'images', function ($scope, $location, images) {
        /*-------------------------------------------------------------------
         *
         * Properties
         *
         *-----------------------------------------------------------------*/

        $scope.selectedIndex = undefined;
        $scope.images = images;

        /*-------------------------------------------------------------------
         *
         * Methods
         *
         *-----------------------------------------------------------------*/

        var getIndexFromSearch = function() {
                var queryParams = $location.search(),
                    index = queryParams ? parseInt(queryParams.index) : 0;

                // Did we get here from '/gallery'? Then redirect to the first image.
                if (!isValidIndex(index))
                    $location.search({ index: 0 });
                else
                    $scope.selectedIndex = +$location.search().index;
            },
            isValidIndex = function(index) {
                return !(typeof index === 'undefined' || index > $scope.images.length - 1 || index < 0 || isNaN(index));
            },
            updateSearch = function(newVal, oldVal) {
                $location.search({ index: newVal });
            };

        /*------------------------------------------------------------------
        Event Handling
        ------------------------------------------------------------------*/

        angular.forEach(['$routeUpdate', '$routeChangeSuccess'], function(value) {
            $scope.$on(value, getIndexFromSearch);
        });

        $scope.$watch('selectedIndex', updateSearch);
    }]);
