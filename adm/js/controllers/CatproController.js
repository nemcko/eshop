define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('CatproCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="všetky";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/catpro','views/catpro_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="kategória";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/category/name/'+$stateParams.id,null,$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/category/'+$stateParams.id+'/catpro','views/catpro_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idcat', displayName:'KATEGÓRIA', width:'100px', visible:$stateParams.id===undefined},
	       {field:'idpro', displayName:'PRODUKT', width:'100px'},
	       {field:'proname', expr:true, displayName:'NÁZOV', width:($stateParams.id===undefined?'320px':'420px')},
	       {field:'seq', visible:false},
	    ];
	    
	    $scope.loadGridData();	    		
	    
	    $scope.setIdcats=function(data) {
	    	$scope.idcats=data;
		};    		
		TableService.getValues('admin/catcat/cmd',{'cmdid':'Idcats'},$scope.setIdcats);		
		
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.idcats=$scope.idcats;
	    };	    
	    
	    $scope.addSelectedProduct=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
		    	if ( $stateParams.id===undefined) {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddCatpro($scope.gridOptions.selectedItems[0].idcat,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].idpro);
		    		} else {
		    			alert('Nie je označený žiaden produkt.');
		    		}
		    	} else {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddCatpro($scope.parentobj.idcat,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].idpro);
		    		} else {
		    			$scope.AddCatpro($scope.parentobj.idcat,( $stateParams.id===undefined?0:$stateParams.id),$callscope.gridOptions2.selectedItems[0].idpro);
		    		}
		    	}
	    	} else {
	    		alert('Nie je označený žiaden produkt.');
	    	}
	    };
	    
	    $scope.AddCatpro=function(idcat,id,idpro) {
	    	TableService.setValues('admin/catpro/cmd','AddCatpro',{'id':id, 'idcat':idcat ,'idpro':idpro},$scope);	    	
	    };
	    
	    $scope.ShiftUp=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/catcat/cmd','ShiftUp',{'id':$scope.gridOptions.selectedItems[0].id, 'idcat':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('NajskĂ´r je potrebnĂ© oznaÄŤiĹĄ poloĹľku');
	    	}
	    };
	    $scope.ShiftDn=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/catcat/cmd','ShiftDn',{'id':$scope.gridOptions.selectedItems[0].id, 'idcat':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('NajskĂ´r je potrebnĂ© oznaÄŤiĹĄ poloĹľku');
	    	}	    	
	    };
	    
    }]);
    
});
