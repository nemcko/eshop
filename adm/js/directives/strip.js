define(['directives/directives'], function(directives) {
  directives.directive('strip', ['$rootScope', function($rootScope) {

  return {
    restrict: 'E',
    scope: {
      field: '@',
      data: '=ngModel'
    },
    templateUrl: 'views/strip.html'
  }

  }]);
});
