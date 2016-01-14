define(['directives/directives'], function(directives) {
	directives.directive('submenu', ['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
			replace:true,
			scope: {
				submenu: '@',
				data:'=data',
				boxsize:'@'
			},
			template: "<div class=\"box col-md-{{boxsize}}\"><h3><b>{{data[submenu]['name']}}</b></h3><div class=\"item\" data-ng-repeat=\"items in data[submenu]['items']\"><a href=\"#/{{items.xref}}\">{{items.name}}</a></div></div>",
			link: function (scope, element, attrs) {
				element.removeAttr('submenu').removeAttr('data').removeAttr('boxsize');
			}
		};
	}]);
});
