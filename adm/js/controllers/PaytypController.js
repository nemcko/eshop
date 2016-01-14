define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('PaytypCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id!==undefined) {
    		if ( $scope.$parent.addSelectedPaytyp===undefined ) {
    			$scope.rowid=$stateParams.id;	
    		}     		
    	}
    	
    	TableService.setGridScope($scope,TableService,$modal,$state,'admin/paytyp','views/paytyp_det.html');
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idmpay', displayName:'KÓD', width:'100px'},
	       {field:'name_sk', displayName:'NÁZOV'},	       
	       {field:'name_en', displayName:'NAME', visible:false}, 
	       {field:'name_cz', displayName:'NÁZOV', visible:false},
	       {field:'name_de', displayName:'NÁZOV', visible:false},
	       {field:'name_pl', displayName:'NÁZOV', visible:false},
	       {field:'name_hu', displayName:'NÁZOV', visible:false},
	       {field:'act', visible:false},
	    ];
	    $scope.gridOptions.rowTemplate="<div data-ng-style=\"{ 'cursor': row.cursor,'color': (row.getProperty('act')==1?'inherit':'#a94442') }\" data-ng-repeat=\"col in renderedColumns\" data-ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" data-ng-style=\"{height: rowHeight}\" data-ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div data-ng-cell></div></div>";

	    TableService.newGridOption($scope,'gridOptions2');
	    $scope.gridOptions2.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idmpay', displayName:'KÓD', width:'100px'}, 
	       {field:'name_sk', displayName:'NÁZOV'},
	       {field:'act', visible:false},
	    ];    		

	    $scope.loadGridData();	    
	    
	    $scope.DlgInit=function($dlgscope) {
	    	$dlgscope.newId=function() {
    			$dlgscope.data.idmpay=TableService.newId();
	    	};

    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idmpay=TableService.newId();
    			$dlgscope.data.act='1';
    		}	    	
	    };
	    	    
	    $scope.ClearAndRefresh=function() {
	    	$scope.filterOptions.filterText="";
	    	
	    };
	    $scope.AddPaytypItem=function() {
	    	$scope.$parent.addSelectedPaytyp($scope);
	    };
    }]);
});
