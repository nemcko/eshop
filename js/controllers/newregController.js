define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('NewregCtrl', ['$scope' ,'ApiSvc','tools','$modal','$stateParams','$locale','$timeout',function($scope,ApiSvc,Tools,$modal,$stateParams,$locale,$timeout) {
			$scope.newreg={username:'',pwd:'',email:'',sendemail:true};
			$scope.pwd2='';
			$scope.CheckInput=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors[id]=false;
					switch (id) {
						case 'newreg.username':
							if ( !$scope.newreg.username ) {
								txt="Používateľské meno je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'newreg.email':
							if ( !$scope.newreg.email ) {
								txt="Vašu adresu pre elektronickú poštu je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'newreg.pwd':
							if ( !$scope.newreg.pwd ) {
								txt="Používateľské heslo je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'pwd2':
							if ( $scope.pwd2!=$scope.newreg.pwd  ) {
								txt="kontrolné heslo nie je totožné so zadaným heslom";
								$scope.checkInputErrors[id]=true;
							}
							break;
						}
					return txt;
				} else {
					return ApiSvc.checkInputErrors($scope);
				}
			};
			$scope.EnData=function(data) {
				$scope.$parent.$parent.data.ClientData(data);
				Tools.MsgBox("Registrácia","Vaša registrácia prebehla úspešne, prihlasovacie údaje boli poslané na Vašu e-mailovú adresu.");
			};
			$scope.CheckData=function() {
				if ( ApiSvc.checkInputErrors($scope) ) {
					if ( ApiSvc.getData('data/checkuser',{'usr':$scope.newreg.username}) ) {
						ApiSvc.setInputError($scope,"newreg.username","Zadaný používateľ už existuje");
						return;
					}
					ApiSvc.setData('data/newreg',$scope.$parent.$parent.data.clientData.sid,$scope.newreg,$scope.EnData);					
					$scope.ok();
				}
			};
	}]);
});
