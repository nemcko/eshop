require.config({
	paths: {	  
		jquery: 'lib/jquery/jquery-1.11.1',
		jqueryui: 'lib/jquery/jquery-ui-1.9.1.custom.min',
		angular: 'lib/angular/angular',
		uirouter: 'lib/angular/angular-ui-router',
		ngGrid: 'lib/ng-grid/build/ng-grid.debug',
		ngGridLayout: 'lib/ng-grid/plugins/ng-grid-layout',
		strap: 'lib/angular/strap/angular-strap.tpl',
		strapj: 'lib/angular/strap/angular-strap',
		uibootstrap: 'lib/angular/ui-bootstrap/ui-bootstrap-tpls-0.10.0',
		md5: 'lib/google/crypto/md5',
		enccore: 'lib/google/crypto/core-min',
		encbase64: 'lib/google/crypto/enc-base64-min',
		encode: 'lib/google/crypto/tripledes'
	},
	waitSeconds:180,
	shim: {
		angular: {
			deps: [ 'jquery'],
			exports: 'angular'
		},   
		jqueryui: {
			deps: [ 'jquery'],
			exports: 'jquery-ui'
		},
		uirouter: {
			deps: [ 'angular'],
			exports: 'uirouter'
		},
		ngGrid: {
			deps: [ 'angular' ],
			exports: 'ngGrid'
		},
		ngGridLayout: {
			deps: [ 'angular'],
			exports: 'ngGridLayout'
		},
		strap: {
			deps: [ 'angular','strapj'],
			exports: 'strap'
		},
		strapj: {
			deps: [ 'angular'],
			exports: 'strapj'
		},
		uibootstrap: {
			deps: [ 'angular'],
			exports: 'uibootstrap'
		}   
	}

});

require([
	'angular',
	'app',
	'uirouter',
	'uibootstrap',
	'ngGrid','ngGridLayout','jqueryui','md5',
	'services/tableService',
	'controllers/rootController',
	'controllers/CategoryController',
	'controllers/RuntableController',
	'controllers/CataliasesController',
	'controllers/CatcatController',
	'controllers/ProductsController',
	'controllers/ProattrsController',
	'controllers/ProaliasesController',
	'controllers/ProcntsController',
	'controllers/ProvarsController',
	'controllers/ProcatController',
	'controllers/CatproController',
	'controllers/SuppliersController',
	'controllers/CoefsuController',
	'controllers/SuppbraController',
	'controllers/BanbraController',
	'controllers/CoefspController',
	'controllers/BanproController',
	'controllers/CoefscController',
	'controllers/DlvtypController',
	'controllers/DlvpriController',
	'controllers/DlvweiController',
	'controllers/DlvtarController',
	'controllers/DlvpayController',
	'controllers/PaytypController',
	'controllers/TextsController',
	'directives/uiValidateEquals',
	'directives/strip'
],
function (angular, app) {
	'use strict';
	app.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("products");
		$stateProvider
		.state('category', {
			url: "^/category",
			templateUrl: 'views/category.html',
			controller: 'CategoryCtrl'
		})
		.state('categoryx', {
			url: "^/category/{id:[0-9]{1,20}}",
			templateUrl: 'views/category.html',
			controller: 'CategoryCtrl'
		})
		.state('runtable', {
			url: "^/runtable",
			templateUrl: 'views/runtable.html',
			controller: 'RuntableCtrl'
		})
		.state('runtable-category', {
			url: "^/category/{id:[0-9]{1,20}}/runtable",
			templateUrl: 'views/runtable.html',
			controller: 'RuntableCtrl'
		})

		.state('cataliases', {
			url: "^/cataliases",
			templateUrl: 'views/cataliases.html',
			controller: 'CataliasesCtrl'
		})  
		.state('aliases-category', {
			url: "^/category/{id:[0-9]{1,20}}/aliases",
			templateUrl: 'views/cataliases.html',
			controller: 'CataliasesCtrl'
		})

		.state('catcat', {
			url: "^/catcat",
			templateUrl: 'views/catcat.html',
			controller: 'CatcatCtrl'
		})
		.state('catcat-category', {
			url: "^/category/{id:[0-9]{1,20}}/catcat",
			templateUrl: 'views/catcat.html',
			controller: 'CatcatCtrl'
		})  


		.state('products', {
			url: "^/products",
			templateUrl: 'views/products.html',
			controller: 'ProductsCtrl'
		})
		.state('product', {
			url: "^/product/{id:[0-9]{1,20}}",
			templateUrl: 'views/products.html',
			controller: 'ProductsCtrl'
		})

		.state('proattrs', {
			url: "^/proattrs",
			templateUrl: 'views/proattrs.html',
			controller: 'ProattrsCtrl'
		})
		.state('proattrs-product', {
			url: "^/product/{id:[0-9]{1,20}}/attrs",
			templateUrl: 'views/proattrs.html',
			controller: 'ProattrsCtrl'
		})  

		.state('proaliases', {
			url: "^/proaliases",
			templateUrl: 'views/proaliases.html',
			controller: 'ProaliasesCtrl'
		})  
		.state('aliases-product', {
			url: "^/product/{id:[0-9]{1,20}}/aliases",
			templateUrl: 'views/proaliases.html',
			controller: 'ProaliasesCtrl'
		})

		.state('procnts', {
			url: "^/procnts",
			templateUrl: 'views/procnts.html',
			controller: 'ProcntsCtrl'
		})  
		.state('procnts-product', {
			url: "^/product/{id:[0-9]{1,20}}/cnts",
			templateUrl: 'views/procnts.html',
			controller: 'ProcntsCtrl'
		})  
		.state('provars', {
			url: "^/provars",
			templateUrl: 'views/provars.html',
			controller: 'ProvarsCtrl'
		})
		.state('provars-product', {
			url: "^/product/{id:[0-9]{1,20}}/vars",
			templateUrl: 'views/provars.html',
			controller: 'ProvarsCtrl'
		})  
		.state('procat', {
			url: "^/procat",
			templateUrl: 'views/procat.html',
			controller: 'ProcatCtrl'
		})
		.state('procat-product', {
			url: "^/product/{id:[0-9]{1,20}}/procat",
			templateUrl: 'views/procat.html',
			controller: 'ProcatCtrl'
		})  
		.state('catpro', {
			url: "^/catpro",
			templateUrl: 'views/catpro.html',
			controller: 'CatproCtrl'
		})
		.state('catpro-category', {
			url: "^/category/{id:[0-9]{1,20}}/catpro",
			templateUrl: 'views/catpro.html',
			controller: 'CatproCtrl'
		})  
		.state('suppliers', {
			url: "^/suppliers",
			templateUrl: 'views/suppliers.html',
			controller: 'SuppliersCtrl'
		})
		.state('coefsu', {
			url: "^/suppliers/{id:[0-9]{1,20}}/coefsu",
			templateUrl: 'views/coefsu.html',
			controller: 'CoefsuCtrl'
		})
		.state('suppbra', {
			url: "^/suppliers/{id:[0-9]{1,20}}/suppbra",
			templateUrl: 'views/suppbra.html',
			controller: 'SuppbraCtrl'
		})
		.state('banbra', {
			url: "^/suppliers/{id:[0-9]{1,20}}/banbra",
			templateUrl: 'views/banbra.html',
			controller: 'BanbraCtrl'
		})
		.state('coefsp', {
			url: "^/suppliers/{id:[0-9]{1,20}}/coefsp",
			templateUrl: 'views/coefsp.html',
			controller: 'CoefspCtrl'
		})
		.state('banpro', {
			url: "^/suppliers/{id:[0-9]{1,20}}/banpro",
			templateUrl: 'views/banpro.html',
			controller: 'BanproCtrl'
		})
		.state('coefsc', {
			url: "^/suppliers/{id:[0-9]{1,20}}/coefsc",
			templateUrl: 'views/coefsc.html',
			controller: 'CoefscCtrl'
		})
		.state('delivery', {
			url: "^/delivery",
			templateUrl: 'views/dlvtyp.html',
			controller: 'DlvtypCtrl'
		})
		.state('dlvpri', {
			url: "^/suppliers/{id:[0-9]{1,20}}/dlvpri",
			templateUrl: 'views/dlvpri.html',
			controller: 'DlvpriCtrl'
		})
		.state('dlvwei', {
			url: "^/suppliers/{id:[0-9]{1,20}}/dlvwei",
			templateUrl: 'views/dlvwei.html',
			controller: 'DlvweiCtrl'
		})
		.state('dlvtar', {
			url: "^/suppliers/{id:[0-9]{1,20}}/dlvtar",
			templateUrl: 'views/dlvtar.html',
			controller: 'DlvtarCtrl'
		})
		.state('paytyp', {
			url: "^/paytyp",
			templateUrl: 'views/paytyp.html',
			controller: 'PaytypCtrl'
		})
		.state('dlvpay', {
			url: "^/suppliers/{id:[0-9]{1,20}}/dlvpay",
			templateUrl: 'views/dlvpay.html',
			controller: 'DlvpayCtrl'
		})
		.state('texts', {
			url: "^/texts",
			templateUrl: 'views/texts.html',
			controller: 'TextsCtrl'
		})


		;
	}]);


//.state('clients-list', {
//url: "/clients'",
//templateUrl: 'views/clients/list.html',
//resolve: { factory: checkAuthentication }
//  })
//var checkAuthentication = function ($q, $location) {
//if (window.user) {
//console.log(window.user);
//return true;
//} else {
//console.log("Not logged in...")
//var defered = $q.defer();
//defered.reject();
//$location.path("/");
//return defered.promise;
//}


$( document ).ready(function() {
	$('html').addClass('ng-app: MyApp');
angular.bootstrap(document, ['MyApp']);

});

  }
);
