define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('DlvpayCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.PaytypData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/paytyp/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.PaytypData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/dlvpay','views/dlvpay_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'seq', displayName:'', width:'40px'},
	       {field:'idmpay', displayName:'KÓD', width:'100px'},
	       {field:'payname', expr:true, displayName:'NÁZOV'},
	       {field:'payprice', displayName:'PRÍPLATOK', width:'100px'},
	    ];
	    
	    $scope.loadGridData();	    		
		
	    $scope.DlgInit=function($dlgscope) {
	    	$dlgscope.data.payprice=TableService.getDecimal($dlgscope.data.payprice,true);
	    	if ( !$dlgscope.addnew ) {
	    		$dlgscope.subtitle=$scope.gridOptions.selectedItems[0].payname;
	    	} else return false;
	    };	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.payprice=TableService.getDecimal($dlgscope.data.payprice);
	    	return true;
	    };	    
	    
	    
	    $scope.addSelectedPaytyp=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
    			$scope.AddNewItem($scope.parentobj.iddeliver,$callscope.gridOptions2.selectedItems[0].idmpay);
	    	} else {
	    		alert('Nie je označený žiaden spôsob úhrady');
	    	}
	    };
	    
	    $scope.AddNewItem=function(idd,idp) {
	    	TableService.setValues('admin/paytyp/cmd','AddDlvpay',{'id':$scope.parentobj.id,'iddeliver':idd, 'idmpay':idp},$scope);	    	
	    };	    
    }]);
    
});
