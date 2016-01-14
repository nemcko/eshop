define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('CoefsuCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/suppliers/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/coefsu','views/coefsu_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'pfrom', displayName:'OD',width:'150px'}, 
	       {field:'pto', displayName:'DO',width:'150px'}, 
	       {field:'coef', displayName:'KOEF.',width:'100px'}
	    ];	    
	    
	    $scope.loadGridData();
	    $scope.rowid=0;
	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.data.pfrom=TableService.getDecimal($dlgscope.data.pfrom,true);
	    	$dlgscope.data.pto=TableService.getDecimal($dlgscope.data.pto,true);
	    	$dlgscope.data.coef=TableService.getDecimal($dlgscope.data.coef,true);
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idsupplier=$scope.parentobj.idsupplier;
    		} 	    	
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.pfrom=TableService.getDecimal($dlgscope.data.pfrom);
	    	$dlgscope.data.pto=TableService.getDecimal($dlgscope.data.pto);
	    	$dlgscope.data.coef=TableService.getDecimal($dlgscope.data.coef);
	    	return true;
	    };	    
	    
    }]);
    
});
