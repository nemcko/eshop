define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('ProcntsCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="produktov";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/procnts','views/procnts_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="produktu ";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/products/cmd',{'cmdid':'ProductInfo','idpro': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/product/'+$stateParams.id+'/cnts','views/procnts_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px'}, 
	       {field:'lng', displayName:'', width:'30px'}, 
	       {field:'cntlng', displayName:'KONTEXT',width:"600px" },
	       {field:'cnt', visible:false}
	    ];	    
	    
	    $scope.loadGridData();
	    	
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.lngs=["sk","en","cz","de","pl","hu"];

    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idpro=$scope.parentobj.idpro;
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
	    	$dlgscope.errorCnt=false;
	    	if ($dlgscope.data.cnt===null || $dlgscope.data.cnt==="") {
	    		$dlgscope.errorCnt=true;
	    		$('#txtCnt').focus();
	    		return false;
	    	}
	    	$dlgscope.data.cnt=TableService.removeDiacritic($dlgscope.data.cntlng,true);	    	
	    	return true;
	    };	    
    }]);
    
});
