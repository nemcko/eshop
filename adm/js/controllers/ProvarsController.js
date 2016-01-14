define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('ProvarsCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="produktov";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/provars','views/provars_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/products/cmd',{'cmdid':'ProductInfo','idpro': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/product/'+$stateParams.id+'/provars','views/provars_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px',visible:$stateParams.id===undefined},
	       {field:'sku', displayName:'SKU', width:'100px'},
	       {field:'idattr1', visible:false},
	       {field:'idattrval1', displayName:'HODN1', width:'100px'},
	       {field:'idattr2', visible:false},
	       {field:'idattrval2', displayName:'HODN2', width:'100px'},
	       {field:'idattr3', visible:false},
	       {field:'idattrval3', displayName:'HODN3', width:'100px'},
//	       {field:'@proname', displayName:'NÁZOV', width:($stateParams.id===undefined?'220px':'320px')},
	       {field:'quantity', displayName:'MNOŽ'},	       
	       {field:'oprice', displayName:'PôvCen'}, 
	       {field:'price', displayName:'CENA'},
	    ];
	    	
	    $scope.setAttrs=function(data) {
	    	$scope.proattrs=data;
		};    		
		TableService.getValues('dial',{'name':'Attributes'},$scope.setAttrs);
		
		$scope.setAttrVals=function(data) {
			$scope.proattrvals=data;
		};    		
		if ( $stateParams.id!==undefined) {
			TableService.getValues('admin/products/cmd',{'cmdid':'AttrValsId','idpro': $stateParams.id},$scope.setAttrVals);
		}
	    	    
	    $scope.loadGridData();
	    	    
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.proattrs=$scope.proattrs;
	    	
			if ( $scope.proattrvals===undefined ) {
				if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
					$dlgscope.proattrvals=TableService.getValues('admin/products/cmd',{'cmdid':'AttrVals','idpro': $scope.gridOptions.selectedItems[0].idpro});
				}
    		} else {
    			$dlgscope.proattrvals=$scope.proattrvals;    			
    		}					
	    	
			$dlgscope.proattrvals1=TableService.getValues('admin/products/cmd',{'cmdid':'ProAttrVals','idattr':$dlgscope.data.idattr1,'idpro': $scope.gridOptions.selectedItems[0].idpro});
			$dlgscope.proattrvals2=TableService.getValues('admin/products/cmd',{'cmdid':'ProAttrVals','idattr':$dlgscope.data.idattr2,'idpro': $scope.gridOptions.selectedItems[0].idpro});
			$dlgscope.proattrvals3=TableService.getValues('admin/products/cmd',{'cmdid':'ProAttrVals','idattr':$dlgscope.data.idattr3,'idpro': $scope.gridOptions.selectedItems[0].idpro});
			$dlgscope.loadVals=function(name) {
				$dlgscope[name]=$dlgscope.proattrvals=TableService.getValues('admin/products/cmd',{'cmdid':'ProAttrVals','idattr':$dlgscope.data.idattr1,'idpro': $scope.gridOptions.selectedItems[0].idpro});
			};
			
	    	
	    	$dlgscope.data.quantity=TableService.getDecimal($dlgscope.data.quantity,true);
	    	$dlgscope.data.oprice=TableService.getDecimal($dlgscope.data.oprice,true);
	    	$dlgscope.data.price=TableService.getDecimal($dlgscope.data.price,true);
	    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idpro=$scope.parentobj.idpro;
    		}
    		
    		
	    };
	    
	    $scope.DlgValidate=function($dlgscope) {
	    	if ($dlgscope.data.idattrval1!=null && $dlgscope.data.idattrval1.idattrval!==undefined)
	    		$dlgscope.data.idattrval1=$dlgscope.data.idattrval1.idattrval;
	    	if ($dlgscope.data.idattrval2!=null && $dlgscope.data.idattrval2.idattrval!==undefined)
	    		$dlgscope.data.idattrval2=$dlgscope.data.idattrval2.idattrval;
	    	if ($dlgscope.data.idattrval3!=null && $dlgscope.data.idattrval3.idattrval!==undefined)
	    		$dlgscope.data.idattrval3=$dlgscope.data.idattrval3.idattrval;
	    	
	    	if ( $dlgscope.data.idattr1==null ) $dlgscope.data.idattr1='';
	    	if ( $dlgscope.data.idattrval1==null ) $dlgscope.data.idattrval1='';
	    	if ( $dlgscope.data.idattr2==null ) $dlgscope.data.idattr2='';
	    	if ( $dlgscope.data.idattrval2==null ) $dlgscope.data.idattrval2='';
	    	if ( $dlgscope.data.idattr3==null ) $dlgscope.data.idattr3='';
	    	if ( $dlgscope.data.idattrval3==null ) $dlgscope.data.idattrval3='';
	    	
	    	$dlgscope.data.quantity=TableService.getDecimal($dlgscope.data.quantity);
	    	$dlgscope.data.oprice=TableService.getDecimal($dlgscope.data.oprice);
	    	$dlgscope.data.price=TableService.getDecimal($dlgscope.data.price);
	    	
//	    	$dlgscope.errorAdattr=false;
//	    	if ($dlgscope.data.idattr===null || $dlgscope.data.idattr==="") {
//	    		$dlgscope.errorAdattr=true;
//	    		$('#txtIdattr').focus();
//	    		return false;
//	    	}	    	
	    	return true;
	    };
	    
	    
    }]);
    
});
