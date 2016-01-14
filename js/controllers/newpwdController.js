define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('NewpwdCtrl', ['$scope' ,'ApiSvc','tools','$modal','$stateParams','$locale','$timeout',function($scope,ApiSvc,Tools,$modal,$stateParams,$locale,$timeout) {
			$scope.newpwd={username:'',email:''};
			$scope.code='';
			$scope.CheckInput=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors[id]=false;
					switch (id) {
						case 'newpwd.username':
							if ( !$scope.newpwd.username ) {
								txt="Používateľské meno je potrebné vyplniť";
								$scope.checkInputErrors[id]=true;
							}
							break;
						case 'newpwd.email':
							if ( !$scope.newpwd.email ) {
								txt="Vašu adresu pre elektronickú poštu je potrebné vyplniť";
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
				Tools.MsgBox("Prihlásenie","Bolo Vám vygenerované nové prihlasovacie heslo.<br /> Prihlasovacie údaje boli poslané na Vašu e-mailovú adresu.");
			};
			$scope.CheckData=function() {
				if ( ApiSvc.checkInputErrors($scope) ) {
					if ( ApiSvc.getData('data/checkusermail',{xdata:ApiSvc.encodeData($scope.newpwd,$scope.$parent.$parent.data.clientData.sid)}) ) {
						ApiSvc.setInputError($scope,"newpwd.username","Zadaný používateľ alebo heslo neboli zadané správne.");
						return;
					}
					ApiSvc.setData('data/newpwd',$scope.$parent.$parent.data.clientData.sid,$scope.newpwd,$scope.EnData);
					$scope.ok();
				}
			};
	}]);
});
