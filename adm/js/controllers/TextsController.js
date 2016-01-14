define(['controllers/controllers','services/tableService'],
function(controllers) {
	controllers.controller('TextsCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
		if ( $stateParams.id!==undefined) {
			if ( $scope.$parent.addSelectedCategory===undefined ) {
				$scope.rowid=$stateParams.id;	
			}
		}
		$scope.gridOptions = {
				data: 'gridData',
				rowHeight:28,
				enablePaging: true,
				showFooter: true,
				multiSelect:false,
				enableCellEdit:false,
				enableColumnResize:true,
				enableColumnReordering:true,
				totalServerItems: 'totalServerItems',
				pagingOptions: $scope.pagingOptions,
				filterOptions: $scope.filterOptions,
				selectedItems: [],
				columnDefs:[
				            {field:'idtxt', displayName:'ID', width:'200px'}, 
				            {field:'sk', displayName:'TEXT'}, 
				            {field:'en', displayName:'', visible:false},
				            {field:'cz', displayName:'', visible:false},
				            {field:'de', displayName:'', visible:false},
				            {field:'pl', displayName:'', visible:false},
				            {field:'hu', displayName:'', visible:false},
				            ]
		};
		$scope.FillTextGroups=function(data) {
			$scope.textgrps=data;
			$scope.selgroup=data[0];
		};
		$scope.FillTextGroup=function(data) {
			if ( data ) {
				$scope.gridData = data.aaData;
				$scope.totalServerItems = data.iTotalRecords;
				$scope.totalFilteredItems=data.iTotalDisplayRecords;
			} else {
				$scope.gridData = null;
				$scope.totalServerItems = 0;
				$scope.totalFilteredItems=0;
			}
			if (!$scope.$$phase) {
				$scope.$apply();
			} 
		};
		$scope.DlgOpen = function (newData) {
			$scope.OpenUpdateDialog(newData,'views/texts_det.html');
		};

		$scope.OpenUpdateDialog = function (newData,templateurl) {
			if ( !newData && $scope.gridOptions.selectedItems[0]===undefined ) return;
			$modal.open({
				templateUrl: templateurl,
				controller: $scope.UpdateDialogCtrl,
				resolve: {
					addnew: function() { return newData; },
					gridscope: function() { return $scope; },
					dlgdata: function () {
						var row = {};
						for (var i = 0; i < $scope.gridOptions.columnDefs.length; i++) {
							if ( $scope.gridOptions.columnDefs[i].expr===undefined ) {
								if ( newData || !$scope.gridOptions.selectedItems.length ) {
									row[$scope.gridOptions.columnDefs[i].field]=null;
								} else {
									row[$scope.gridOptions.columnDefs[i].field]=$scope.gridOptions.selectedItems[0][$scope.gridOptions.columnDefs[i].field];
								}
							}
						}
						return row;
					}
				}
			});
		};

		$scope.UpdateDialogCtrl = function ($scope, $modalInstance,gridscope,dlgdata,addnew) {
			$scope.addnew=addnew;
			$scope.data = dlgdata;
			
			$scope.ok = function () {
				setTimeout(function () {
					TableService.setValues('admin/textgrp/'+gridscope.selgroup,null,$scope.data,gridscope.FillTextGroup);
					$modalInstance.close();
				}, 100);    		  
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		};

		$scope.DelRow=function() {
			if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
				TableService.delValues('admin/textgrp/'+$scope.selgroup,null,{idtxt:$scope.gridOptions.selectedItems[0].idtxt},$scope.FillTextGroup);
			}
		};

		$scope.Refresh=function() {
			$scope.LoadGroup($scope.selgroup);
		};

		$scope.LoadGroup=function (name) {
			TableService.getValues('admin/textgrp/'+name,null,$scope.FillTextGroup);
		};

		$scope.$watch('selgroup', function (newVal, oldVal) {
			if ( !(newVal===undefined || newVal === oldVal) ) {
				$scope.LoadGroup(newVal);
			}
		}, true);
		
		TableService.getValues('admin/textgrps',null,$scope.FillTextGroups);
	}]);
});
