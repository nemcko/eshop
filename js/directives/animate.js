define(['directives/directives'], function(directives) {
	directives.directive('anim', ['$transition', function($transition) {
		return {
			link: function (scope, element,attrs) {
				var initialAnimSkip = true;
				var currentTransition;

				function doTransition(change) {
					var newTransition = $transition(element, change);
					if (currentTransition) {
						currentTransition.cancel();
					}
					currentTransition = newTransition;
					newTransition.then(newTransitionDone, newTransitionDone);
					return newTransition;

					function newTransitionDone() {
						// Make sure it's this transition, otherwise, leave it alone.
						if (currentTransition === newTransition) {
							currentTransition = undefined;
						}
					}
				}

				scope.$watch(attrs.anim, function (newCls, oldCls,scope) {
					if ( oldCls!==undefined && oldCls!=='' ) {
						if ( newCls!==undefined && newCls!=='' ) {
							element.removeClass(oldCls).addClass(newCls);
						} else {
							element.removeClass(oldCls);
						}						
					} else { 
						if ( newCls!==undefined && newCls!=='' ) {
							element.addClass(newCls);
						}
					}
					
				});
			}
		};
	}]);
});


//define(['directives/directives'], function(directives) {
//	directives.directive('anim', ['$animate', function($animate) {
//		return {
//			restrict: 'A',
//			scope: {
//				callback:'=callback'
//			},
//			link: function (scope, element,attrs) {
//				element.bind(attrs.event, function() {
//					if(jQuery("#"+attrs.idelement).hasClass(attrs.anim)) {
//						$animate.removeClass(jQuery("#"+attrs.idelement), attrs.anim);
//					} else {
//						$animate.addClass(jQuery("#"+attrs.idelement), attrs.anim);
//						setTimeout(function(){
//							$animate.removeClass(jQuery("#"+attrs.idelement), attrs.anim);
//							if ( scope.callback!==null && scope.callback!==undefined ) {
//								scope.callback();
//							}
//						},1000);
//					}
//				});
//			}
//		};
//	}]);
//});
