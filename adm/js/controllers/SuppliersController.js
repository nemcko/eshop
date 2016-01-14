define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('SuppliersCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers','views/suppliers_det.html');
    	if ( $stateParams.id!==undefined) {
			$scope.rowid=$stateParams.id;	
    	}    	
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idsupplier', displayName:'DODÁVATEĽ', width:'100px'},
	       {field:'prefix', displayName:'PREFIX', width:'70px'},	       
	       {field:'assembly', displayName:'ASSEMBLY'}
	    ];
	        			    
	    $scope.loadGridData();
	    
	    $scope.DlgInit=function($dlgscope) {
	    	$dlgscope.assemblies=TableService.getValues('dial',{name:'Assemblies'});	  
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    		}	    	
	    };
	    
	    $scope.ClearAndRefresh=function() {
	    	$scope.filterOptions.filterText="";
	    };
    }]);
});
