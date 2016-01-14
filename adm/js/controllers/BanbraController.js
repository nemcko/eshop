define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('BanbraCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/suppliers/cmd',{'cmdid':'Info','id': $stateParams.id},$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/suppliers/'+$stateParams.id+'/banbra','views/banbra_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false}, 
	       {field:'sbrand', displayName:'Značka',width:'150px'}, 
	    ];	    
	    
	    $scope.loadGridData();
	    $scope.rowid=0;
	    
	    $scope.DlgInit=function($dlgscope) {	    		    		    	
    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idsupplier=$scope.parentobj.idsupplier;
    		} 	    	
	    };	    
	    
    }]);
    
});
