define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('CataliasesCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="kategórií";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/cataliases','views/cataliases_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="kategórie ";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/category/name/'+$stateParams.id,null,$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/category/'+$stateParams.id+'/aliases','views/cataliases_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idcat', displayName:'KATEGÓRIA', width:'100px'}, 
	       {field:'lng', displayName:'', width:'30px'}, 
	       {field:'alias', displayName:'ALIAS',width:"600px" }
	    ];	    
	    
	    $scope.loadGridData();
	    	
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.lngs=["sk","en","cz","de","pl","hu"];

    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idcat=$scope.parentobj.idcat;
    		} else {
    		}	    	
	    };
	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.errorLng=false;
	    	if ($dlgscope.data.lng===null || $dlgscope.data.lng==="") {
	    		$dlgscope.errorLng=true;
	    		$('#txtLng').focus();
	    		return false;
	    	}
	    	$dlgscope.errorAlias=false;
	    	if ($dlgscope.data.alias===null || $dlgscope.data.alias==="") {
	    		$dlgscope.errorAlias=true;
	    		$('#txtAlias').focus();
	    		return false;
	    	}
	    	$dlgscope.data.alias=TableService.removeDiacritic($dlgscope.data.alias);
	    	
	    	return true;
	    };	    
    }]);
    
});
