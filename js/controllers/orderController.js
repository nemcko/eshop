define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('OrderCtrl', ['$scope' ,'ApiSvc','$modal','$stateParams','$locale','$timeout',function($scope,ApiSvc,$modal,$stateParams,$locale,$timeout) {
			$scope.userdata={};
			$scope.showOrderSection=[false,false,true,true,true,true];
			$scope.ToggleOrderSelection=function(index) {
				$scope.showOrderSection[index]=!$scope.showOrderSection[index];
			};
			$scope.CheckInput=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors[id]=false;
					switch (id) {
						case 'userdata.name':
							if ( !$scope.userdata.name ) {
								txt="Meno pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.surname':
							if ( !$scope.userdata.surname ) {
								txt="Priezvisko pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.ico':
							if ( $scope.userdata.company && !$scope.userdata.ico) {
								txt="Pre firmu je potrebné vyplniť IČO";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.dic':
							if ( $scope.userdata.company && !$scope.userdata.dic) {
								txt="Pre firmu je potrebné vyplniť DIČ";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.phone':
							if ( !$scope.userdata.phone ) {
								txt="Telefónne číslo je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.zip':
							if ( !$scope.userdata.zip ) {
								txt="PSČ pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'userdata.city':
							if ( !$scope.userdata.city ) {
								txt="Obec pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
					}
					return txt;
				} else {
					return ApiSvc.checkInputErrors($scope);
				}
			};
			$scope.UpdOrderItem=function(id,quantity) {
				ApiSvc.setData('data/updbasketitem',$scope.$parent.clientData.sid,{'idvar':id,'quantity':quantity,'lng':$scope.$parent.defOptions.pageSettings.lng},$scope.FillOrder);
			};
			$scope.DelOrderItem=function(id) {
				ApiSvc.setData('data/delbasketitem',$scope.$parent.clientData.sid,{'idvar':id,'lng':$scope.$parent.defOptions.pageSettings.lng},$scope.FillOrder);
			};
			$scope.FillOrder=function(data) {
				$scope.$parent.FillBasket(data);
				$scope.$parent.CalculateOrder($scope);
			};

			$scope.SelectDlv=function(dlv) {
				$scope.delivery.selDlv=dlv;
				$scope.delivery.selDlvpay=dlv.dlvpay[0];
				$scope.$parent.CalculateOrder($scope);
			};
			$scope.SelectDlvpay=function(pay) {
				$scope.delivery.selDlvpay=pay;
				$scope.$parent.CalculateOrder($scope);
			};
			$scope.SelectCountry=function(item) {
				if ( $scope.userdata===undefined ) {
					$scope.userdata={};
				}
				$scope.userdata.country=item;
				$scope.$parent.CalculateOrder($scope);
			};
			$scope.DoCheck=function() {
				for (var section in $scope.showOrderSection) {
					if ( $scope.showOrderSection[section] ) {
						$scope.showOrderSection[section]=false;
					}
				}
				if ( $scope.CheckInput() ) {
					var params={'userdata': $scope.userdata,'comment': $scope.basket.comment,'iddeliver': $scope.delivery.selDlv.iddeliver,'idmpay':$scope.delivery.selDlvpay.idmpay,'dlvprice':$scope.delivery.price,'payprice':$scope.delivery.selDlvpay.payprice};
					ApiSvc.setData('data/userdata',$scope.$parent.clientData.sid,params,"");
					ApiSvc.goToState('check');
				} 
			};
			$scope.FillUserData=function(data) {
				data=ApiSvc.decodeData(data,$scope.$parent.clientData.sid);
				if ( data ) {
					$scope.userdata=data;
				}
			};
			$scope.$watch('$parent.clientData.uid', function (newVal, oldVal) {
				if (newVal !== oldVal) {
					ApiSvc.getData('data/userdata',null,$scope.FillUserData);
				}
			}, true);
			$scope.FillDeliveryData=function(data) {
				$scope.$parent.FillDelivery(data,$scope);
			};
			ApiSvc.getData('data/dlvpay',null,$scope.FillDeliveryData);
	}]);
});
