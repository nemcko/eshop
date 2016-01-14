define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('CatcatCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="všetky";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/catcat','views/catcat_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="kategória";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/category/name/'+$stateParams.id,null,$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/category/'+$stateParams.id+'/catcat','views/catcat_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'level', visible:false},
	       {field:'id', displayName:'', width:'100px'},
	       {field:'idparcat', displayName:'KATEGÓRIA', width:'100px', visible:$stateParams.id===undefined},
	       {field:'idcat', displayName:'SUBKAT.', width:'100px',visible:false},
	       {field:'catname', expr:true, displayName:'NÁZOV SUBKATEGÓRIE', width:($stateParams.id===undefined?'320px':'420px')},
	       {field:'seq', visible:false},
	    ];
	    $scope.gridOptions.rowTemplate="<div class=\"ngCell col1 colt1\" style=\"background-color:#dff0d8 !important;z-index:1;margin-top:4px;margin-bottom:4px;xmargin-left:{{(5-row.getProperty('level'))*20}}px;width:{{row.getProperty('level')*20}}px;\"></div><div data-ng-repeat=\"col in renderedColumns\" data-ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" data-ng-style=\"{height: rowHeight}\" data-ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div data-ng-cell></div></div>";
	    
	    $scope.loadGridData();	    		
	    
	    $scope.setIdcats=function(data) {
	    	$scope.idcats=data;
		};    		
		TableService.getValues('admin/catcat/cmd',{'cmdid':'Idcats'},$scope.setIdcats);		
		
	    $scope.DlgInit=function($dlgscope) {	    		    	
	    	$dlgscope.idcats=$scope.idcats;
	    };	    
	    	    
	    $scope.addSelectedCategory=function($callscope) {
	    	if ( $callscope.gridOptions2.selectedItems[0]!==undefined ) {
		    	if ( $stateParams.id===undefined) {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddCatcat($scope.gridOptions.selectedItems[0].idparcat,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].id);
		    		} else {
		    			alert('Nie je označená žiadna položka stromu kategórií.');
		    		}
		    	} else {
		    		if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
		    			$scope.AddCatcat($scope.parentobj.idcat,$scope.gridOptions.selectedItems[0].id,$callscope.gridOptions2.selectedItems[0].id);
		    		} else {
		    			$scope.AddCatcat($scope.parentobj.idcat,0,$callscope.gridOptions2.selectedItems[0].id);
		    		}
		    	}
	    	} else {
	    		alert('Nie je označená žiadna kategória.');
	    	}
	    };
	    
	    $scope.AddCatcat=function(idparcat,id,nid) {
	    	TableService.setValues('admin/catcat/cmd','AddCatcat',{'idparcat':idparcat, 'id':id, 'idcat':($stateParams.id===undefined?0:$stateParams.id) ,'nid':nid},$scope);	    	
	    };
	    
	    $scope.ShiftUp=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/catcat/cmd','ShiftUp',{'id':$scope.gridOptions.selectedItems[0].id, 'idcat':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('Najskôr je potrebné označiť položku');
	    	}
	    };
	    $scope.ShiftDn=function() {
	    	if ( $scope.gridOptions.selectedItems[0]!==undefined ) {
	    		TableService.setValues('admin/catcat/cmd','ShiftDn',{'id':$scope.gridOptions.selectedItems[0].id, 'idcat':($stateParams.id===undefined ?0:$stateParams.id )},$scope);
	    	} else {
	    		alert('Najskôr je potrebné označiť položku');
	    	}	    	
	    };
	    
    }]);
    
});
