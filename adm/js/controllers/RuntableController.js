define(['controllers/controllers','services/tableService'],
  function(controllers) {
    controllers.controller('RuntableCtrl', ['$scope','$location','TableService','$modal','$stateParams','$state',function($scope,$location,TableService,$modal,$stateParams,$state) {
    	if ( $stateParams.id===undefined) {
    		$scope.showNew=false;
    		$scope.subtitle="tabuľka načasovania aktualizácií";
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/runtable','views/runtable_det.html');
    	} else {
    		$scope.showNew=true;
    		$scope.subtitle="načasovanie kategórie";
    		$scope.parentobj={};
    		$scope.CategoryData=function(data) {
    			$scope.parentobj=data;
    		};    		
    		TableService.getValues('admin/category/name/'+$stateParams.id,null,$scope.CategoryData);
    		TableService.setGridScope($scope,TableService,$modal,$state,'admin/category/'+$stateParams.id+'/runtable','views/runtable_det.html');
    	}
	    $scope.gridOptions.columnDefs=[
	       {field:'id', visible:false},
	       {field:'idcat', displayName:'KATEGÓRIA', width:'100px'}, 
	       {field:'lng', displayName:'', width:'30px'}, 
	       {field:'rundate', displayName:'DÁTUM', width:'90px'},
	       {field:'runtime', displayName:'ČAS', width:'50px'},
	       {field:'runperiod', displayName:'PER', width:'50px'},
	       {field:'url', displayName:'URL',width:"595px" },
	       {field:'stadate', displayName:'ZAČ', width:'150px'},
	       {field:'findate', displayName:'KON', width:'150px'},
	       {field:'loadlimit', displayName:'LIMIT', width:'50px'},
	       {field:'numloaded', displayName:'POČ', width:'50px'},
	       {field:'act', visible:false},
	       {field:'idsupplier', visible:false},
	       {field:'noimg', visible:false},
	       {field:'delweb', visible:false},
	       {field:'delcat', visible:false},
	       {field:'delimg', visible:false},
	       {field:'upload', visible:false},
	    ];
	    $scope.gridOptions.rowTemplate="<div data-ng-style=\"{ 'cursor': row.cursor,'color': (row.getProperty('act')==1?'inherit':'#a94442') }\" data-ng-repeat=\"col in renderedColumns\" data-ng-class=\"col.colIndex()\" class=\"ngCell {{col.cellClass}}\"><div class=\"ngVerticalBar\" data-ng-style=\"{height: rowHeight}\" data-ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div data-ng-cell></div></div>";
	    	
	    $scope.loadGridData();
	    
	    $scope.OpenRundate = function($event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	        $scope.opened = true;
	    };	    
	    
	    
	    $scope.DlgInit=function($dlgscope) {
	    		    	
	    	$dlgscope.runtimehours=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
	    	$dlgscope.runtimemins=["00","01","02","03","04","05","06","07","08","09","10",
	    	                       "11","12","13","14","15","16","17","18","19","20",
	    	                       "21","22","23","24","25","26","27","28","29","30",
	    	                       "31","32","33","34","35","36","37","38","39","40",
	    	                       "41","42","43","44","45","46","47","48","49","50",
	    	                       "51","52","53","54","55","56","57","58","59","60"];
	    	$dlgscope.runperiods=["1min","5min","10min","15min","30min","1h","3h","6h","12h","24h","1d","2d","3d","1w","2w","3w","1M","2M","3M"];
	    	$dlgscope.suppliers=TableService.getValues('admin/suppliers/cmd',{'cmdid':'Suppliers'});	  
	    	$dlgscope.runlngs=TableService.getValues('dial',{name:'Lngs'});
	    	$dlgscope.errorURL=false;

    		if ( $dlgscope.addnew ) {
    			$dlgscope.data.id=0;
    			$dlgscope.data.idcat=$scope.parentobj.idcat;
    			$dlgscope.data.act='1';
    	    	$dlgscope.data.runperiod="24h";
    	    	$dlgscope.runtimehour="00";
    	    	$dlgscope.runtimemin="00";
    		} else {
    	    	$dlgscope.runtimehour=$dlgscope.data.runtime.split(':')[0];
    	    	$dlgscope.runtimemin=$dlgscope.data.runtime.split(':')[1];    			
    		}	    	
	    };
	    
	    $scope.DlgValidate=function($dlgscope) {
	    	$dlgscope.data.runtime=$dlgscope.runtimehour + ":" + $dlgscope.runtimemin;
	    	$dlgscope.errorURL=false;
	    	if ($dlgscope.data.url===null || $dlgscope.data.url==="") {
	    		$dlgscope.errorURL=true;
	    		$('#txtURL').focus();
	    		return false;
	    	}
	    	$dlgscope.errorSupplier=false;
	    	if ($dlgscope.data.idsupplier===null || $dlgscope.data.idsupplier==="") {
	    		$dlgscope.errorSupplier=true;
	    		$('#txtSupplier').focus();
	    		return false;
	    	}
	    	$dlgscope.errorLng=false;
	    	if ($dlgscope.data.lng===null || $dlgscope.data.lng==="") {
	    		$dlgscope.errorLng=true;
	    		$('#txtLng').focus();
	    		return false;
	    	}
	    	
	    	return true;
	    };
	    
    }]);
    
});
