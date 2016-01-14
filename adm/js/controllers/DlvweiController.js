define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('DlvweiCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/delivery/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/dlvwei','views/dlvwei_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'iddeliver', visible:false},
	       {field:'wfrom', displayName:'OD'}, 
	       {field:'wto', displayName:'DO'}
	    ];	    
	    
	    $scope.loadGridData();
	    $scope.rowid=0;
	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.data.wfrom=TableService.getDecimal($dlgscope.data.wfrom,true);
	    	$dlgscope.data.wto=TableService.getDecimal($dlgscope.data.wto,true);
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.iddeliver=$scope.parentobj.iddeliver;
    			$dlgscope.data.idwei=TableService.newId();
    		} 	    	
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.wfrom=TableService.getDecimal($dlgscope.data.wfrom);
	    	$dlgscope.data.wto=TableService.getDecimal($dlgscope.data.wto);
	    	$dlgscope.data.idwei="("+$dlgscope.data.wfrom +")-("+$dlgscope.data.wto+")";
	    	return true;
	    };	    
	    
    }]);
    
});
