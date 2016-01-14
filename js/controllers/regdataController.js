define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('RegdataCtrl', ['$scope' ,'ApiSvc','tools','$modal','$stateParams','$locale','$timeout',function($scope,ApiSvc,Tools,$modal,$stateParams,$locale,$timeout) {
			$scope.showUserdataSection=[true,true,true,true,true];
			$scope.regdata={};
			$scope.xdata=null;
			$scope.persdata=1;
			
			$scope.ToggleUserdataSelection=function(index) {
				$scope.showUserdataSection[index]=!$scope.showUserdataSection[index];
			};
			$scope.Saved=function(data) {
				Tools.MsgBox(data);
			};
			$scope.SaveRegdata=function(group) {
				if ( ApiSvc.checkInputErrors($scope,group) ) { 
					if ( group==2 ) {
						if ( !ApiSvc.setData('data/checkuser',$scope.$parent.clientData.sid,$scope.regdata.data2) ) {
							ApiSvc.setInputError($scope,"regdata.data2.pwd","Nesprávne zadané heslo");
							return;
						}
					} 
					ApiSvc.setData('data/regdata'+group,$scope.$parent.clientData.sid,$scope.regdata['data'+group],$scope.Saved);
				}
			};
			$scope.CheckInput1=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors1[id]=false;
					switch (id) {
						case 'regdata.data1.email':
							if ( !$scope.regdata.data1.email ) {
								txt="Vašu adresu pre elektronickú poštu je potrebné vyplniť";
								$scope.checkInputErrors1[id]=true;
							}
							break;
					}
					return txt;
				} else {
					return ApiSvc.checkInputErrors($scope,"1");
				}
			};
			$scope.CheckInput2=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors2[id]=false;
					switch (id) {
						case 'regdata.data2.pwd':
							if ( !$scope.regdata.data2.pwd ) {
								txt="Používateľské heslo je potrebné vyplniť";
								$scope.checkInputErrors2[id]=true;
							}
						break;
						case 'regdata.data2.npwd':
							if ( !$scope.regdata.data2.npwd ) {
								txt="Používateľské nové heslo je potrebné vyplniť";
								$scope.checkInputErrors2[id]=true;
							}
							break;
						case 'npwd2':
							if ( $scope.npwd2!=$scope.regdata.data2.npwd  ) {
								txt="kontrolné heslo nie je totožné so zadaným heslom";
								$scope.checkInputErrors2[id]=true;
							}
							break;
						}
					return txt;
				} else {
					return ApiSvc.checkInputErrors($scope,"2");
				}
			};
			$scope.CheckInput3=function(id) {
				var txt="";
				if ( id!==undefined) {
					$scope.checkInputErrors3[id]=false;
					switch (id) {
						case 'regdata.data3.name':
							if ( !$scope.regdata.data3.name ) {
								txt="Meno pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.surname':
							if ( !$scope.regdata.data3.surname ) {
								txt="Priezvisko pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.ico':
							if ( $scope.regdata.data3.company && !$scope.regdata.data3.ico) {
								txt="Pre firmu je potrebné vyplniť IČO";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.dic':
							if ( $scope.regdata.data3.company && !$scope.regdata.data3.dic) {
								txt="Pre firmu je potrebné vyplniť DIČ";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.phone':
							if ( !$scope.regdata.data3.phone ) {
								txt="Telefónne číslo je potrebné vyplniť";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.zip':
							if ( !$scope.regdata.data3.zip ) {
								txt="PSČ pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						case 'regdata.data3.city':
							if ( !$scope.regdata.data3.city ) {
								txt="Obec pre fakturáciu je potrebné vyplniť";
								$scope.checkInputErrors3[id]=true;
							}
							break;
						}
					return txt;
				} else {
					return ApiSvc.checkInputErrors($scope,"2");
				}
			};
			$scope.ErasePersData=function(data) {
				if ( data=='yes' ) {
					ApiSvc.getData('data/nopersdata',{xdata:ApiSvc.encodeData($scope.$parent.clientData.uid,$scope.$parent.clientData.sid)},$scope.$parent.ClientData);
				} 
				$scope.persdata=1;
			};
			$scope.NoPersData=function() {
				Tools.MsgBox("Osobné údaje","V prípade, ak nesúhlasíte so spracovaním Vašich osobných údajov, Vaša registrácia v e-shope bude zrušená a Vaše osobné údaje odstránené zo systému, nebudete môcť využiť výhody registrovaného používateľa e-shopu.<br /><br />Chcete vykonať túto operáciu?","exclamation-sign","yes-no-cancel",$scope.ErasePersData);
			};
			$scope.RegData=function(data) {
				data=ApiSvc.decodeData(data,$scope.$parent.clientData.sid);
				if ( data ) {
					$scope.regdata=data;
				}
			};
			$scope.SaveEmail=function(val) {
				ApiSvc.setData('data/regdata5',$scope.$parent.clientData.sid,{'sendemail':val});
			};
			$scope.$watch('$parent.clientData.uid', function (newVal, oldVal) {
				if (newVal !== oldVal) {
					$scope.LoadData();
				}
			}, true);

			$scope.LoadData=function() {
				ApiSvc.getData('data/regdata',{xdata:ApiSvc.encodeData($scope.$parent.clientData.uid,$scope.$parent.clientData.sid)},$scope.RegData);
			};
			
			$scope.LoadData();
	}]);
});
