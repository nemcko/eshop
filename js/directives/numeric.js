define(['directives/directives'], function(directives) {
	directives.directive('numeric', ['$filter', '$locale', function($filter, $locale) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attr, ngModel) {
				var decN = scope.$eval(attr.decimalPlaces); 
				function theDecimalPlaces(num) {
					var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
					if (!match) { return 0; }
						return Math.max(
							0,
							(match[1] ? match[1].length : 0)
							- (match[2] ? +match[2] : 0));
				}
				function fromUser(text) {
					var x = text.replaceAll($locale.NUMBER_FORMATS.GROUP_SEP, '');
					var y = x.replaceAll($locale.NUMBER_FORMATS.DECIMAL_SEP, '.');
					return Number(y); 
				}
				function toUser(n) {
					return $filter('number')(n, decN); 
				}

				ngModel.$parsers.push(fromUser);
				ngModel.$formatters.push(toUser);
				
				element.bind('blur', function() {
					element.val(toUser(ngModel.$modelValue));
				});

				element.bind('focus', function() {
					var n = ngModel.$modelValue;
					var formattedN = $filter('number')(n, theDecimalPlaces(n));
					element.val(formattedN);
				});
			} // link
		};
	}]);
});