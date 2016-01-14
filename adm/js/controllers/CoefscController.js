define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('CoefscCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/suppliers/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/coefsc','views/coefsc_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idcat', displayName:'KATEGÓRIA', width:'100px'},
	       {field:'catname', expr:true, displayName:'NÁZOV'},
	       {field:'coef', displayName:'KOEF.', width:'100px'},
	    ];
	    
	    $scope.loadGridData();	    		
		
	    $scope.DlgInit=function($dlgscope) {
	    	$dlgscope.data.coef=TableService.getDecimal($dlgscope.data.coef,true);
	    	if ( !$dlgscope.addnew ) {
	    		$dlgscope.subtitle=$scope.gridOptions.selectedItems[0].idpro;
	    	} else return false;
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.coef=TableService.getDecimal($dlgscope.data.coef);
	    	return true;
	    };	    
	    
	    
	    $scope.addSelectedCategory=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
    			$scope.AddNewItem($scope.parentobj.idsupplier,$callscope.gridOptions2.selectedItems[0].idcat);
	    	} else {
	    		alert('Nie je označený žiaden produkt.');
	    	}
	    };
	    
	    $scope.AddNewItem=function(idsupplier,idcat) {
	    	TableService.setValues('admin/suppliers/cmd','AddCoefsc',{'id':$scope.parentobj.id,'idsupplier':idsupplier, 'idcat':idcat},$scope);	    	
	    };	    
    }]);
    
});
