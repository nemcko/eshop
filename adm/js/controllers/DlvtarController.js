define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('DlvtarCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/delivery/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/dlvtar','views/dlvtar_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'iddeliver', visible:false},
	       {field:'country', displayName:'KRAJINA'}, 
	       {field:'idwei', displayName:'HMOTNOSŤ'}, 
	       {field:'idpri', displayName:'HODNOTA'},
	       {field:'price', displayName:'CENA'}
	    ];	    
	    
	    $scope.loadGridData();
	    $scope.rowid=0;
	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.data.price=TableService.getDecimal($dlgscope.data.price,true);
	    	$dlgscope.weights=TableService.getValues('admin/delivery/cmd',{'cmdid':'Weights','iddeliver': $scope.parentobj.iddeliver});
	    	$dlgscope.prices=TableService.getValues('admin/delivery/cmd',{'cmdid':'Prices','iddeliver': $scope.parentobj.iddeliver});
	    	$dlgscope.countries=TableService.getValues('dial',{name:'Countries'});
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.iddeliver=$scope.parentobj.iddeliver;
    		} 	    	
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.price=TableService.getDecimal($dlgscope.data.price);
	    	return true;
	    };	    
	    
    }]);
    
});
