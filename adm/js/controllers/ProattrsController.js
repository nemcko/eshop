define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('ProattrsCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="produktov";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/proattrs','views/proattrs_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="produktu";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/products/cmd',{'cmdid':'ProductInfo','idpro': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/product/'+$stateParams.id+'/proattrs','views/proattrs_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px',visible:$stateParams.id===undefined}, 
	       {field:'idattr', displayName:'ATRIBÚT', width:'100px'},
	       {field:'idattrval', displayName:'HODNOTA', width:'100px'},
	       {field:'name_sk', displayName:'NÁZOV'},	       
	       {field:'name_en', displayName:'NAME'}, 
	       {field:'name_cz', visible:false},
	       {field:'name_de', visible:false},
	       {field:'name_pl', visible:false},
	       {field:'name_hu', visible:false},
	    ];
	    	
	    $scope.loadGridData();
	    
	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.attribs=TableService.getValues('dial',{name:'Attributes'});
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idpro=$scope.parentobj.idpro;
    		}	    	
	    };
	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.errorAdattr=false;
	    	if ($dlgscope.data.idattr===null || $dlgscope.data.idattr==="") {
	    		$dlgscope.errorAdattr=true;
	    		$('#txtIdattr').focus();
	    		return false;
	    	}	    	
	    	return true;
	    };
	    
	    
    }]);
    
});
