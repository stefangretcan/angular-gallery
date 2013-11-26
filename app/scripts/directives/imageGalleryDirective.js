'use strict';

angular
    .module('angular-image-gallery', [])
    .value('KEYCODES', {
        'leftArrow': 37,
        'rightArrow': 39
    })
    .directive('imageGallery', function (KEYCODES) {
        return {
            templateUrl: 'views/_imageGallery.html',
            restrict: 'E',
            scope: {
                images: '=',
                selectedIndex: '=',
                // By default, we can use arrow keys to navigate.
                // Suppres this behaviour by setting the attribute 'use-arrows=false' on directive declaration.
                useArrows: '@'
            },
            controller: function($scope, $attrs, $location) {
                $scope.minIndex = 0;
                $scope.maxIndex = $scope.images.length - 1;

                if ($scope.useArrows) {
                    $scope.useArrows = $scope.useArrows === 'false' ? false : true;
                }
                else
                    $scope.useArrows = true;

                $scope.shouldRenderImage = function($index) {
                    // Cyclic condition.
                    if ($index == $scope.minIndex || $index == $scope.maxIndex)
                        return true;

                    return $index >= +$scope.selectedIndex - 1 && $index <= +$scope.selectedIndex + 1;
                };
            },
            link: function($scope, $elem) {
                var windowKeyupHandler = function(e) {
                        var key = e.keyCode || e.which,
                            // For unity purposes...
                            newValue = $scope.selectedIndex;

                        switch (key) {
                            case KEYCODES.leftArrow:
                                newValue = $scope.selectedIndex == $scope.minIndex ? $scope.maxIndex : $scope.selectedIndex - 1;
                            break;
                            case KEYCODES.rightArrow:
                                newValue = $scope.selectedIndex == $scope.maxIndex ? $scope.minIndex : $scope.selectedIndex + 1;
                            break;
                        }

                        $scope.selectedIndex = newValue;

                        $scope.$apply();
                    },
                    imagesChangeHandler = function(newVal, oldVal) {
                        // Update references...
                        $scope.images = newVal;
                        $scope.maxIndex = $scope.images.length - 1;
                    };

                $scope.$watch('images', imagesChangeHandler);

                // Should we use keyboard arrows (left/right)?
                $scope.useArrows && angular.element(window).on('keyup', windowKeyupHandler);
            }
        };
    })
    .run(function() {
        document.createElement('image-gallery');
    });
