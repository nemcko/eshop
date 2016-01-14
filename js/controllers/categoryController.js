define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('CategoryCtrl', ['$scope' ,'ApiSvc','$modal','$stateParams','$sce',function($scope,ApiSvc,$modal,$stateParams,$sce) {
			$scope.products=[];
			$scope.lastParamsCode="";
			$scope.showFilterTabs=[true,true,true,true,true];
			
			$scope.$parent.GetPageSettings($scope);

			$scope.ShowDetail=function(data) {
				$scope.$parent.DlgDetail.Open(data);
			};
			
			$scope.SetFilters = function($data) {
				$scope.filters=$data;
			};
			$scope.SwitchFilterTabs=function(index) {
				var oldValue=$scope.showFilterTabs[index];
				jQuery('#FilterTabs > li').removeClass('active');
				for (key in $scope.showFilterTabs) {
					$scope.showFilterTabs[key]=true;
				}
				$scope.showFilterTabs[index]=!oldValue;
				if (!$scope.showFilterTabs[index]) {
					jQuery('#FilterTabs li:eq('+index+')').addClass('active');
				}
			};
			$scope.SetColorFilter = function() {
				if ($scope.filters===undefined) return;
				$scope.filters.colorFilter="";
				$scope.filters.colorFilterCount=0;
				for (var f in $scope.filters.colorFields) { 
					if ($scope.filters.colorFields[f]!=="" ) {
						$scope.filters.colorFilter+=($scope.filters.colorFilter?'+':'') + $scope.filters.colorFields[f];
						$scope.filters.colorFilterCount++;
					}
				}
			};
			$scope.SetSizeFilter = function() {
				if ($scope.filters===undefined) return;
				$scope.filters.sizeFilter="";
				$scope.filters.sizeFilterCount=0;
				for (var f in $scope.filters.sizeFields) { 
					if ($scope.filters.sizeFields[f]!=="" ) {
						$scope.filters.sizeFilter+=($scope.filters.sizeFilter?'+':'') + $scope.filters.sizeFields[f];
						$scope.filters.sizeFilterCount++;
					}
				}
			};
			$scope.SetBrandFilter = function() {
				if ($scope.filters===undefined) return;
				$scope.filters.brandFilter="";
				$scope.filters.brandFilterCount=0;
				for (var f in $scope.filters.brandFields) { 
					if ($scope.filters.brandFields[f]!=="" ) {
						$scope.filters.brandFilter+=($scope.filters.brandFilter?'+':'') + $scope.filters.brandFields[f];
						$scope.filters.brandFilterCount++;
					}
				}
			};
			$scope.ClearFilters = function() {
				if ($scope.filters===undefined) return;
				for (var f in $scope.filters.colorFields) {
					$scope.filters.colorFields[f]="";
				}
				$scope.SetColorFilter();
				for (var f in $scope.filters.sizeFields) {
					$scope.filters.sizeFields[f]="";
				}
				$scope.SetSizeFilter();
				for (var f in $scope.filters.brandFields) {
					$scope.filters.brandFields[f]="";
				}
				$scope.SetBrandFilter();
				
				$scope.filters.priceFilter.priceFrom=$scope.filters.priceFilters.minPrice;
				$scope.filters.priceFilter.priceTo=$scope.filters.priceFilters.maxPrice;
				$scope.filters.textFilter="";
			};
			$scope.ChangeFilterPrice=function(key) {
				var inc=5;
				switch(key) {
					case '+from':
						$scope.filters.priceFilter.priceFrom+=inc;
						if ( $scope.filters.priceFilter.priceFrom>$scope.filters.priceFilters.maxPrice) {
							$scope.filters.priceFilter.priceFrom=$scope.filters.priceFilters.maxPrice;
						}
						break;
					case '-from':
						$scope.filters.priceFilter.priceFrom-=inc;
						if ( $scope.filters.priceFilter.priceFrom<$scope.filters.priceFilters.minPrice) {
							$scope.filters.priceFilter.priceFrom=$scope.filters.priceFilters.minPrice;
						}
						break;
					case '+to':
						$scope.filters.priceFilter.priceTo+=inc;
						if ( $scope.filters.priceFilter.priceTo>$scope.filters.priceFilters.maxPrice) {
							$scope.filters.priceFilter.priceTo=$scope.filters.priceFilters.maxPrice;
						}
						break;
					case '-to':
						$scope.filters.priceFilter.priceTo-=inc;
						if ( $scope.filters.priceFilter.priceTo<$scope.filters.priceFilters.minPrice) {
							$scope.filters.priceFilter.priceTo=$scope.filters.priceFilters.minPrice;
						}
						break;
				}
			};
			$scope.updateFilterPrice=function(key) {
				var txt="";
				switch(key) {
					case 'from':
						txt=$scope.filters.priceFilter.priceFrom;
						break;
					case 'to':
						txt=$scope.filters.priceFilter.priceTo;
						break;
				}
				var number=ApiSvc.getNumber(txt);
				switch(key) {
				case 'from':
					if ( number>$scope.filters.priceFilters.maxPrice) {
						number=$scope.filters.priceFilters.maxPrice;
					}
					$scope.filters.priceFilter.priceFrom=parseFloat(number);
					break;
				case 'to':
					if ( number<$scope.filters.priceFilters.minPrice) {
						number=$scope.filters.priceFilters.minPrice;
					}
					$scope.filters.priceFilter.priceTo=parseFloat(number);
					break;
			}

			};

			$scope.SetProducts = function($data) {
				$scope.products=$data.rows;
				$scope.pageData.totalItems=$data.count;
				$scope.categoryname=$data.categoryname;
			};
			
			$scope.LoadPage = function(NextPage) {
				if ( NextPage===undefined || NextPage && $scope.lastFilters==undefined ) {
					$scope.lastFilters={};
					if ($scope.filters!==undefined) {
						$scope.SetColorFilter();
						$scope.SetSizeFilter();
						$scope.SetBrandFilter();
						if ($scope.filters.colorFilter) {
							$scope.lastFilters['colorFilter']=$scope.filters.colorFilter;
						}
						if ($scope.filters.sizeFilter) {
							$scope.lastFilters['sizeFilter']=$scope.filters.sizeFilter;
						}
						if ($scope.filters.brandFilter) {
							$scope.lastFilters['brandFilter']=$scope.filters.brandFilter;
						}
						if ($scope.filters.priceFilter.priceFrom!=$scope.filters.priceFilters.minPrice) {
							$scope.lastFilters['priceFrom']=$scope.filters.priceFilter.priceFrom;
						}
						if ($scope.filters.priceFilter.priceTo!=$scope.filters.priceFilters.maxPrice) {
							$scope.lastFilters['priceTo']=$scope.filters.priceFilter.priceTo;
						}
						if ($scope.filters.textFilter) {
							$scope.lastFilters['textFilter']=ApiSvc.removeDiacritic($scope.filters.textFilter,true);
						}
					}
				}
				var params=$.extend({}, $scope.pageData,$scope.lastFilters);
				delete params.totalItems;
				var lastParamsCode=CryptoJS.MD5($stateParams.id+$.param(params)).toString();
//				$scope.$parent.SetFilters($scope);
				if ( $scope.lastParamsCode!=lastParamsCode) {
					ApiSvc.getData('data/acategory/'+$stateParams.id,params,$scope.SetProducts);
					$scope.alias=$stateParams.id;
					$scope.lastParamsCode=lastParamsCode;
//					jQuery("a2").focus();
				}
			};
			$scope.SelectPagesize = function(size) {
				$scope.pageData.pageSize=size.value;
				$scope.pageData.currentPage=1;
				$scope.LoadPage();
			};
			$scope.SelectSortType = function(type) {
				$scope.pageData.sortType=type.value;
				$scope.pageData.currentPage=1;
				$scope.LoadPage();
			};
			$scope.SelectPage = function(page) {
				$scope.pageData.currentPage=page;
				$scope.LoadPage(true);
			};
			ApiSvc.getData('data/filters/'+$stateParams.id,$scope.pageData,$scope.SetFilters);
			$scope.LoadPage();
	}]);
});
