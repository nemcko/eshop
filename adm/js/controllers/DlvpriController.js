define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('DlvpriCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/delivery/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/dlvpri','views/dlvpri_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'iddeliver', visible:false},
	       {field:'pfrom', displayName:'OD'}, 
	       {field:'pto', displayName:'DO'}
	    ];	    
	    
	    $scope.loadGridData();
	    $scope.rowid=0;
	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.data.pfrom=TableService.getDecimal($dlgscope.data.pfrom,true);
	    	$dlgscope.data.pto=TableService.getDecimal($dlgscope.data.pto,true);
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.iddeliver=$scope.parentobj.iddeliver;
    			$dlgscope.data.idpri=TableService.newId();
    		} 	    	
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.pfrom=TableService.getDecimal($dlgscope.data.pfrom);
	    	$dlgscope.data.pto=TableService.getDecimal($dlgscope.data.pto);
	    	$dlgscope.data.idpri="("+$dlgscope.data.pfrom +")-("+$dlgscope.data.pto+")";
	    	return true;
	    };	    
	    
    }]);
    
});
