define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('ProductsCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	TableService.setGridScope($scope,TableService,$modal,$state,'admin/products','views/products_det.html');
    	if ( $stateParams.id!==undefined) {
    		if ( $scope.$parent.addSelectedProduct===undefined ) {
    			$scope.rowid=$stateParams.id;	
    		} 
    	}
    	
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px'},
	       {field:'name_sk', displayName:'NÁZOV'},	       
	       {field:'name_en', displayName:'NAME'}, 
	       {field:'name_cz', visible:false},
	       {field:'name_de', visible:false},
	       {field:'name_pl', visible:false},
	       {field:'name_hu', visible:false},
	       {field:'desc_en', visible:false}, 
	       {field:'desc_sk', visible:false},
	       {field:'desc_cz', visible:false},
	       {field:'desc_de', visible:false},
	       {field:'desc_pl', visible:false},
	       {field:'desc_hu', visible:false},
	       
	       {field:'unit', visible:false},
	       {field:'taxper', visible:false},
	       {field:'warranty', visible:false},
	       {field:'idsupplier', visible:false},
	       {field:'act', visible:false},
	    ];
	    $scope.gridOptions.rowTemplate="<div data-ng-style=\"{ 'cursor': row.cursor,'color': (row.getProperty('act')==1?'inherit':'#a94442') }\" data-ng-repeat=\"col in renderedColumns\" data-ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" data-ng-style=\"{height: rowHeight}\" data-ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div data-ng-cell></div></div>";
	    
	    
	    TableService.newGridOption($scope,'gridOptions2');
	    $scope.gridOptions2.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idpro', displayName:'PRODUKT', width:'100px'}, 
	       {field:'name_sk', displayName:'NÁZOV'},
	       {field:'act', visible:false},
	    ];    		
	    
	    $scope.loadGridData();
	    
	    $scope.DlgInit=function($dlgscope) {
	    	$dlgscope.units=TableService.getValues('dial',{name:'Units'});
	    	$dlgscope.taxpers=TableService.getValues('dial',{name:'Taxper'});
	    	$dlgscope.warrantys=TableService.getValues('dial',{name:'Warranty'});
	    	$dlgscope.suppliers=TableService.getValues('dial',{name:'Suppliers'});
	    	
	    	
	    	$dlgscope.newIdpro=function() {
    			$dlgscope.data.idpro=TableService.newId();
	    	};

    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idpro=TableService.newId();
    			$dlgscope.data.act='1';
    			$dlgscope.data.unit='ks';
    			$dlgscope.data.warranty='24';
    			$dlgscope.data.taxper='20';
    			$dlgscope.data.idsupplier='sd';
    		}	    	
	    };
	    
	    $scope.ClearAndRefresh=function() {
	    	$scope.filterOptions.filterText="";
	    };
	    
	    $scope.AddCategoryItem=function() {
	    	$scope.$parent.addSelectedProduct($scope);
	    };
	    
    }]);
});
