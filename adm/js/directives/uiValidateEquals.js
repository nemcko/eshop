define(['directives/directives'], function(directives) {
  directives.directive('uiValidateEquals', ['$rootScope', function($rootScope) {

  return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            function validateEqual(myValue, otherValue) {
                if ( typeof myValue == 'undefined' ) {
                    ctrl.$setValidity('equal', false);
                    return myValue;
                }
                else if (myValue === otherValue) {
                    ctrl.$setValidity('equal', true);
                    return myValue;
                } else {
                    ctrl.$setValidity('equal', false);
                    return undefined;
                }
            }

            scope.$watch(attrs.uiValidateEquals, function(otherModelValue) {
                validateEqual(ctrl.$viewValue, otherModelValue);
            });

            ctrl.$parsers.unshift(function(viewValue) {
                return validateEqual(viewValue, scope.$eval(attrs.uiValidateEquals));
            });

            ctrl.$formatters.unshift(function(modelValue) {
                return validateEqual(modelValue, scope.$eval(attrs.uiValidateEquals));
            });
        }
    };


  }]);
});
