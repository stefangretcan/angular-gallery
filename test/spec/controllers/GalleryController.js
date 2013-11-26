'use strict';

describe('Controller: GallerycontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('angularLoginApp'));

  var GallerycontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GallerycontrollerCtrl = $controller('GallerycontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
