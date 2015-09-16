'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

      $scope.grid = [
          ['x', 'o', 'x'],
          ['o', 'x', 'o'],
          ['o', 'o', 'x']
      ];




}]);