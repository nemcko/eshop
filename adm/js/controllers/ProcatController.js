define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('ProcatCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="všetky produkty";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/procat','views/procat_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="produktu";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/products/cmd',{'cmdid':'ProductInfo','idpro': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/product/'+$stateParams.id+'/procat','views/procat_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px', visible:$stateParams.id===undefined},
	       {field:'idcat', displayName:'KATEGÓRIA', width:'100px'},
	       {field:'catname', expr:true, displayName:'NÁZOV', width:($stateParams.id===undefined?'320px':'420px')},
	       {field:'seq', visible:false}
	    ];
	    
	    $scope.loadGridData();	    		
	    
//	    $scope.setIdcats=function(data) {
//	    	$scope.idcats=data;
//		};    		
//		TableService.getValues('admin/procat/cmd',{'cmdid':'Idcats'},$scope.setIdcats);		
		
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.idcats=$scope.idcats;
	    };	    
	    	    
	    $scope.addSelectedCategory=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
		    	if ( $stateParams.id===undefined) {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddProcat($scope.gridOptions.selectedItems[0].idpro,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].id);
		    		} else {
		    			alert('Nie je označená žiadna položka.');
		    		}
		    	} else {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddProcat($scope.parentobj.idpro,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].id);
		    		} else {
		    			$scope.AddProcat($scope.parentobj.idpro,0,$callscope.gridOptions2.selectedItems[0].id);
		    		}
		    	}
	    	} else {
	    		alert('Nie je označená žiadna kategória.');
	    	}
	    };
	    
	    $scope.AddProcat=function(idpro,id,nid) {
	    	TableService.setValues('admin/procat/cmd','AddProcat',{'idpro':idpro, 'id':id, 'idcat':($stateParams.id===undefined?0:$stateParams.id) ,'nid':nid},$scope);	    	
	    };
	    
	    $scope.ShiftUp=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/procat/cmd','ShiftUp',{'id':$scope.gridOptions.selectedItems[0].id, 'idpro':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('Najskôr je potrebné označiť položku');
	    	}
	    };
	    $scope.ShiftDn=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/procat/cmd','ShiftDn',{'id':$scope.gridOptions.selectedItems[0].id, 'idpro':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('Najskôr je potrebné označiť položku');
	    	}	    	
	    };
	    
    }]);
    
});
