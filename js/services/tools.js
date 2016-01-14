define(['services/services'],
function(services) {
	services.factory('tools',['$http','$modal', '$state','$timeout','$sce',
	function($http,$modal,$state,$timeout,$sce) {
		return {
			MsgBox: function (title,message,icon,type,callback) {
				var ModalInstanceCtrl = function ($scope, $modalInstance, title,message,icon,type) {
					if ( title && message===undefined ) {
						$scope.message = $sce.trustAsHtml(title);
						$scope.title = "";
						$scope.notitle=true;
					} else {
						$scope.message = $sce.trustAsHtml(message);
						$scope.title = (title===undefined?"":title);
						$scope.notitle=false;
					}
					
					$scope.type = (type===undefined?"":type);
					$scope.icon = (icon===undefined?"glyphicon glyphicon-warning-sign":"glyphicon glyphicon-"+icon);
					$scope.cancel = function () {
						 $modalInstance.dismiss('cancel');
					};
					$scope.Close = function (value) {
						 $modalInstance.close(value);
					};
				};
				var modalInstance = $modal.open({
					'templateUrl': "views/msgbox.html",
					'backdrop': false,
					'static': true,
					'controller': ModalInstanceCtrl,
					'resolve': {
						title: function () {
							return title;
						},
						message: function () {
							return message;
						},
						type: function () {
							return type;
						},
						icon: function () {
							return icon;
						}
					}
				});
				modalInstance.result.then(function (value) {
					if ( callback!==undefined ) {
						callback(value);
					}
				}, function () {
					if ( callback!==undefined ) {
						callback('cancel');
					}
				});
			},
			AddDialog: function ($scope,$DlgName,templateDlgUrl,DlgInit,DlgValidate) {
				$scope[$DlgName]={};
				$scope[$DlgName].Open = function (dlgData) {
					$scope[$DlgName].OpenUpdateDialog(dlgData,templateDlgUrl,DlgInit,DlgValidate);
				},
				$scope[$DlgName].OpenUpdateDialog = function (dlgData,templateurl,callbackinit,callbackvalidate) {
					$modal.open({
						templateUrl: templateurl,
						controller: $scope[$DlgName].UpdateDialogCtrl,
						resolve: {
							dlgdata: function() { return dlgData; },
							cbinit: function() { return callbackinit; },
							cbvalidate: function() { return callbackvalidate; }
						}
					});
				},
				$scope[$DlgName].UpdateDialogCtrl = function ($scope, $modalInstance,dlgdata,cbinit,cbvalidate) {
//					if ( typeof dlgdata=== 'object' ) {
					
					$scope.data = dlgdata;	
					
					if ( cbinit!==undefined && cbinit ) {
						var retVal=cbinit($scope);
						if (  retVal!==undefined && retVal===false ){
							$modalInstance.dismiss('cancel');
							return;	    			  
						};
					}
					$scope.ok = function () {
						if ( cbvalidate!==undefined ) {
							if ( !cbvalidate($scope) ) {
								return;
							}
						}
						$modalInstance.close();
						
//						setTimeout(function () {
//							TableService.postTableData(gridscope,rowid,$scope.data);
//							$modalInstance.close();
//						}, 100);    		  
					};
	
					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				};
			}
		
		};

	}]);
});
