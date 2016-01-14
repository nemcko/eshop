define(['directives/directives'], function(directives) {
	directives.directive('checkinput', ['$compile', '$locale', function($compile, $locale) {
		return {
			restrict: 'A',
			link: function(scope, element, attr, ngModel) {
				var comp=false;
				var checkGrp="";
				
				if (element[0].attributes['checkgrp']!==undefined) {
					checkGrp=attr.checkgrp;
				}
				
				if ( scope['checkInputErrors'+checkGrp]===undefined ) {
					scope['checkInputErrors'+checkGrp]=[];
				}

				if (element[0].attributes['data-ng-model']===undefined){
					element.attr("data-ng-model", attr.checkinput);
					comp=true;
				}
				if (element[0].attributes['data-ng-class']===undefined){
					element.attr("data-ng-class", "{'inputerror':checkInputErrors"+checkGrp+"['"+attr.checkinput+"']}");
					comp=true;
				}
				if (element[0].attributes['id']===undefined)	{
					element.attr("id",attr.checkinput.replaceAll('.','_'));
					comp=true;
				}
				if (comp) {
					$compile(element[0])(scope);
				}
								
				if ( !element.parent().find('span.label-danger').length ){
					var aNames=attr.checkinput.split(".");
					var obj=scope;
					for(var key in aNames) {
						if ( obj[aNames[key]]===undefined ) {
							obj[aNames[key]]="";
						}
						obj=obj[aNames[key]];
					}
					var e=angular.element($compile("<span id=\"err_"+attr.checkinput.replaceAll('.','_')+"\" data-ng-show=\"checkInputErrors"+checkGrp+"['"+attr.checkinput+"']\" class=\"label label-danger\">{{CheckInput"+checkGrp+"('"+attr.ngModel+"')}}</span>")(scope));
					e.insertAfter(element);
					element.removeAttr('checkinput');
					element.removeAttr('checkgrp');
				}
			}
		};
	}]);
});