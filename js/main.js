var mincode="";
//mincode=".min";

require.config({
	paths: {
		app: 'app'+mincode,
		jquery: 'lib/jquery/jquery-1.11.1'+mincode,
		jqueryui: 'lib/jquery/jquery-ui-1.9.1.custom.min',
		angular: 'lib/angular/angular'+mincode,
		uirouter: 'lib/angular/angular-ui-router'+mincode,
		animate: 'lib/angular/angular-animate'+mincode,
		uibootstrap: 'lib/angular/ui-bootstrap/ui-bootstrap-tpls-0.10.0'+mincode,
		select2: 'lib/angular/ui-bootstrap/select2',
		polyfill: 'lib/polyfill/number-polyfill',
		md5: 'lib/google/crypto/md5',
		enccore: 'lib/google/crypto/core-min',
		encbase64: 'lib/google/crypto/enc-base64-min',
		encode: 'lib/google/crypto/tripledes',
		
		'services/apiService':'services/apiService'+mincode,
		'directives/checkinput':'directives/checkinput'+mincode,
		'directives/loadImage':'directives/loadImage'+mincode,
		'directives/noimage':'directives/noimage'+mincode,
		'directives/numeric':'directives/numeric'+mincode,
		'directives/submenu':'directives/submenu'+mincode,
		'controllers/rootController':'controllers/rootController'+mincode,
		'controllers/categoryController':'controllers/categoryController'+mincode,
		'controllers/detailController':'controllers/detailController'+mincode,
		'controllers/orderController':'controllers/orderController'+mincode,
		'controllers/checkController':'controllers/checkController'+mincode,
		'controllers/newregController':'controllers/newregController'+mincode,
		'controllers/regdataController':'controllers/regdataController'+mincode,
		'controllers/newpwdController':'controllers/newpwdController'+mincode

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
		uibootstrap: {
			deps: [ 'angular'],
			exports: 'uibootstrap'
		},
		animate: {
			deps: [ 'angular'],
			exports: 'animate'
		},
		select2: {
			deps: [ 'angular'],
			exports: 'select2'
		},
		encbase64: {
			deps: [ 'enccore'],
			exports: 'encbase64'
		},
		encode: {
			deps: [ 'md5','enccore','encbase64'],
			exports: 'encode'
		}
	}

});

require([
	'angular',
	'app',
	'uirouter','animate','uibootstrap','select2',
	'encode',
	'services/apiService',
	'services/tools',
	'controllers/rootController',
	'controllers/homeController',
	'controllers/categoryController',
	'controllers/detailController',
	'controllers/orderController',
	'controllers/checkController',
	'controllers/newregController',
	'controllers/regdataController',
	'controllers/newpwdController',
	'directives/submenu',
	'directives/loadImage',
	'directives/numeric',
	'directives/checkinput'
],
function (angular, app) {
'use strict';
	app.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {
			url: "^/",
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		})
		.state('neworder', {
			url: "^/ord",
			templateUrl: 'views/order.html',
			controller: 'OrderCtrl'
		})
		.state('regdata', {
			url: "^/reg",
			templateUrl: 'views/regdata.html',
			controller: 'RegdataCtrl'
		})
		.state('check', {
			url: "^/orc",
			templateUrl: 'views/check.html',
			controller: 'CheckCtrl'
		})
		.state('category', {
			url: "^/{id}",
			templateUrl: 'views/category.html',
			controller: 'CategoryCtrl'
		})

		;
	}]);
	
	String.prototype.replaceAll = function(stringToFind,stringToReplace){
		if (stringToFind === stringToReplace) return this;
		var temp = this;
		var index = temp.indexOf(stringToFind);
		while(index != -1){
			temp = temp.replace(stringToFind,stringToReplace);
			index = temp.indexOf(stringToFind);
		}
		return temp;
	};
	
	angular.element( document ).ready(function() {
		angular.element('html').addClass('ng-app: myApp');
		angular.bootstrap(document, ['myApp']);
	});

  }
);