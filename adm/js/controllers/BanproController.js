define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('BanproCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/suppliers/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/banpro','views/banpro_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT'},
	    ];
	    
	    $scope.loadGridData();	    		
		
	    $scope.DlgInit=function($dlgscope) {
	    	return false;
	    };	    
	    
	    
	    $scope.addSelectedProduct=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
    			$scope.AddNewItem($scope.parentobj.idsupplier,$callscope.gridOptions2.selectedItems[0].idpro);
	    	} else {
	    		alert('Nie je označený žiaden produkt.');
	    	}
	    };
	    
	    $scope.AddNewItem=function(idsupplier,idpro) {
	    	TableService.setValues('admin/suppliers/cmd','AddBanpro',{'id':$scope.parentobj.id,'idsupplier':idsupplier, 'idpro':idpro},$scope);	    	
	    };	    
    }]);
    
});
