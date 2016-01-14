define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('CheckCtrl', ['$scope' ,'ApiSvc','tools','$modal','$stateParams','$locale','$timeout',function($scope,ApiSvc,Tools,$modal,$stateParams,$locale,$timeout) {
			$scope.userdata={};
			$scope.FillDeliveryData=function(data) {
				$scope.$parent.FillDelivery(data,$scope);
			};
			$scope.BackToOrder=function() {
				ApiSvc.goToState('neworder');
			};
			$scope.OrderSaved=function(data) {
				Tools.MsgBox("Objednávka","Vaša objednávka bola zapísaná, údaje boli poslané na Vašu e-mailovú adresu.","ok","ok");
				ApiSvc.goToState('home');
			};
			$scope.SaveOrder=function() {
				ApiSvc.setData('data/saveorder',$scope.$parent.clientData.sid,{'lng':$scope.$parent.defOptions.pageSettings.lng},$scope.OrderSaved);
			};
			$scope.FillUserData=function(data) {
				data=ApiSvc.decodeData(data,$scope.$parent.clientData.sid);
				if ( data ) {
					$scope.userdata=data;
				}
				if ( !($scope.userdata['name'] && $scope.userdata['surname'] && $scope.userdata['phone'] && $scope.userdata['zip'] && $scope.userdata['city']) ) {
					ApiSvc.goToState('neworder');
				}
			};
			$scope.$watch('$parent.clientData.uid', function (newVal, oldVal) {
				if (newVal !== oldVal || $scope.userdata.username===undefined ) {
					ApiSvc.getData('data/userdata',null,$scope.FillUserData);
				}
			}, true);
			ApiSvc.getData('data/dlvpay',null,$scope.FillDeliveryData);
	}]);
});
