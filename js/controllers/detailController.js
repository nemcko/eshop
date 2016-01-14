define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('DetailCtrl', ['$scope' ,'ApiSvc','$timeout',function($scope,ApiSvc,$timeout) {
			$scope.showImage=false;
			$scope.showDescr=true;
			$scope.showFace=true;
			$scope.showTab=[false,true,true];
			$scope.showSizeTabs=[true,true,true,true,true,true];

			$scope.DoSwitch=function() {
				$scope.showImage = !$scope.showImage;
				$scope.showDescr = !$scope.showDescr;
			};
			$scope.DoSwitchFace=function() {
				$scope.showFace = !$scope.showFace;
			};
			$scope.SelectColor=function(color) {
				$scope.product.selColor=color;
				$scope.product.selSize=color.provars[0];
				
				if ( $scope.showFace ) {
					$scope.clsFace1='puffIn';
				} else {
					$scope.clsFace2='puffIn';
				}
				
				$timeout(function() {
					if ( $scope.showFace ) {
						$scope.clsFace1='';
					} else {					
						$scope.clsFace2='';
					}
				}, 500, true);
			};
			$scope.SelectSize=function(size) {
				$scope.product.selSize=size;
			};
			$scope.SwitchTabs=function(index) {
				jQuery('#DescrTabs > li').removeClass('active');
				jQuery('#DescrTabs li:eq('+index+')').addClass('active');
				for (key in $scope.showTab) {
					$scope.showTab[key]=true;
				}
				$scope.showTab[index]=false;
			};
			$scope.SwitchSizeTabs=function(index) {
				var oldValue=$scope.showSizeTabs[index];
				jQuery('#DescrSizeTabs > li').removeClass('active');				
				for (key in $scope.showSizeTabs) {
					$scope.showSizeTabs[key]=true;
				}
				$scope.showSizeTabs[index]=!oldValue;
				if (!$scope.showSizeTabs[index]) {
					jQuery('#DescrSizeTabs li:eq('+index+')').addClass('active');
				}
			};
	}]);
});
