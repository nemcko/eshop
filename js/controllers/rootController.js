define(['controllers/controllers','services/apiService'],
	function(controllers) {
		controllers.controller('RootCtrl', ['$scope' ,'ApiSvc','tools','$sce','$locale', function($scope,ApiSvc,Tools,$sce,$locale) {
			$scope.showBasket="";
			$scope.clientData={sid:'sid',uid:0};
			$scope.defOptions=ApiSvc.getData('data/defaultOptions');

			$scope.ClientData=function(data) {
				data=ApiSvc.decodeData(data,$scope.clientData.sid);
				if ( data ) {
					$scope.clientData=data;
				}
			};
			$scope.SetMenus = function($data) {
				$scope.menus=$data;
			};
			$scope.GetPageSettings = function($pagescope) {
				$pagescope['pageData']=$scope.defOptions.pageSettings;
				$pagescope.pageData.totalItems=0;
				$pagescope.pageData.currentPage=1;
				$pagescope.pageSizes=$scope.defOptions.pageSizes;
				$pagescope.sortTypes=$scope.defOptions.sortTypes;
			};
			$scope.DetailDlgInit=function($dlgscope) {
				if ( $dlgscope.data.sku===undefined ) 
					$dlgscope.product=ApiSvc.getData('data/product/'+$dlgscope.data.idpro);
				else
					$dlgscope.product=ApiSvc.getData('data/productvar/'+encodeURIComponent($dlgscope.data.idpro)+'/'+encodeURIComponent($dlgscope.data.sku));
				$dlgscope.product.selSize=$dlgscope.product.selColor.provars[$dlgscope.product.selSizeIndex];
				$dlgscope.descr = $sce.trustAsHtml($dlgscope.product.descr);
				return true;
			};
			$scope.DetailDlgVal=function($dlgscope) {
				var id=$dlgscope.product.selSize.id;
				var quantity=$dlgscope.product.quantity;
				if (quantity===undefined) {
					jQuery("#txtQuantity").focus();
					Tools.MsgBox("Nesprávne zadané množstvo","Nesprávne zadané množstvo.");
					return false;
				}
				$scope.AddBasketItem(id,quantity);
				$scope.ShowBasket(true);
				return true;
			};
			$scope.AddBasketItem=function(id,quantity) {
				ApiSvc.setData('data/addbasketitem',$scope.clientData.sid,{'idvar':id,'quantity':quantity,'lng':$scope.defOptions.pageSettings.lng},$scope.FillBasket);
			};
			$scope.UpdBasketItem=function(id,quantity) {
				ApiSvc.setData('data/updbasketitem',$scope.clientData.sid,{'idvar':id,'quantity':quantity,'lng':$scope.defOptions.pageSettings.lng},$scope.FillBasket);
			};
			$scope.DelBasketItem=function(id) {
				ApiSvc.setData('data/delbasketitem',$scope.clientData.sid,{'idvar':id,'lng':$scope.defOptions.pageSettings.lng},$scope.FillBasket);
			};
			$scope.ClearBasket=function() {
				ApiSvc.setData('data/clearbasket',$scope.clientData.sid,{'lng':$scope.defOptions.pageSettings.lng},$scope.FillBasket);
			};
			$scope.FillBasket=function(data) {
				$scope.basket=data;
				if (!$scope.$$phase) {
					$scope.$apply();
				} 
			};
			$scope.ToggleBasket=function() {
				$scope.ShowBasket(!$("#BasketMenu").hasClass('ShowBasket'));
			};
			$scope.ShowBasket=function(show) {
				if ( show ) {
					$scope.showBasket="ShowBasket";
				} else {
					$scope.showBasket="";
				}
			};
			$scope.ShowDetail=function(data) {
				$scope.DlgDetail.Open(data);
			};
			$scope.NewOrder=function() {
				$scope.ShowBasket(false);
				ApiSvc.goToState('neworder');
			};
			$scope.LogIn=function() {
				$scope.DlgLogin.Open({'usr':'','pwd':''});
			};
			$scope.LoginDlgInit=function($dlgscope) {
				$dlgscope.username=$scope.clientData.username;
				$dlgscope.uid=$scope.clientData.uid;
			};
			$scope.LoginDlgVal=function($dlgscope) {
				if ( $scope.clientData.uid ) {
					ApiSvc.getData('data/logout',null,$scope.ClientData);
					return true;
				} else {
					var data=ApiSvc.setData('data/login',$scope.clientData.sid,$dlgscope.data);
					if ( data ) {
						$scope.ClientData(data);
						return true;
					} 
					Tools.MsgBox("Prihlásenie","Zle zadané používateľské meno alebo heslo.");
					return false;
				}
			};
			$scope.NewReg=function() {
				$scope.DlgNewreg.Open($scope);
			};
			$scope.NewPwd=function() {
				$scope.DlgNewpwd.Open($scope);
			};
			$scope.FillDelivery=function(data,scope) {
				scope.delivery=data;
				scope.delivery.selDlv=scope.delivery.items[0];
				scope.delivery.selDlvpay=scope.delivery.items[0].dlvpay[0];

				if ( data.userdata ) {
					scope.userdata=data.userdata;
					for (var i in scope.delivery.items) {
						if ( scope.delivery.items[i].iddeliver===data.iddeliver ) {
							scope.delivery.selDlv=scope.delivery.items[i];
							for (var j in scope.delivery.selDlv.dlvpay) {
								if ( scope.delivery.selDlv.dlvpay[j].idmpay===data.idmpay ) {
									scope.delivery.selDlvpay=scope.delivery.selDlv.dlvpay[j];
									break;
								}
							}
							break;
						}
					}
					delete scope.delivery.iddeliver;
					delete scope.delivery.idmpay;
				} 
				
				if (!scope.$$phase) {
					scope.$apply();
				}
				$scope.CalculateOrder(scope);
			};
			$scope.CalculateOrder=function(scope) {
				scope.delivery.price=0;
				scope.delivery.szprice="";
				var weight=0;
				var idwei="";
				var idpri="";
				if ( $scope.basket===undefined ) {
					$scope.basket={};
				}
				if ( $scope.basket.weight!==undefined ) {
					weight=$scope.basket.weight;
					price=$scope.basket.incVAT;
				}
				if ( scope.userdata===undefined ) {
					scope.userdata={};
				}
				if ( scope.userdata.country===undefined ) {
					scope.userdata['country']="";
				}
				
				for (var npri in scope.delivery.selDlv.dlvpri) {
					if ( scope.delivery.selDlv.dlvpri[npri].pfrom<price && scope.delivery.selDlv.dlvpri[npri].pto>=price) {
						idpri=scope.delivery.selDlv.dlvpri[npri].idpri;
					}
				}
				for (var nwei in scope.delivery.selDlv.dlvwei) {
					if ( scope.delivery.selDlv.dlvwei[nwei].wfrom<weight && scope.delivery.selDlv.dlvwei[nwei].wto>=weight) {
						idwei=scope.delivery.selDlv.dlvwei[nwei].idwei;
					}
				}
				for (var tar in scope.delivery.selDlv.dlvtar) {
					if ( scope.delivery.selDlv.dlvtar[tar].country==scope.userdata.country && scope.delivery.selDlv.dlvtar[tar].idwei==idwei && scope.delivery.selDlv.dlvtar[tar].idpri==idpri) {
						scope.delivery.price=scope.delivery.selDlv.dlvtar[tar].price;
					}
				}
				if ( scope.delivery.price===0 ) {
					for (var tar in scope.delivery.selDlv.dlvtar) {
						if ( scope.delivery.selDlv.dlvtar[tar].idwei==idwei && scope.delivery.selDlv.dlvtar[tar].idpri==idpri) {
							scope.delivery.price=scope.delivery.selDlv.dlvtar[tar].price;
						}
					}
				}
				if ( scope.delivery.price!==0 ) {
					scope.delivery.szprice=scope.delivery.price.toString().replaceAll('.',$locale.NUMBER_FORMATS.DECIMAL_SEP);
				}
				
				$scope.basket.DlvPrice=ApiSvc.getNumber(scope.delivery.price,'.')+ApiSvc.getNumber(scope.delivery.selDlvpay.payprice,'.');
				$scope.basket.DlvPrice=$scope.basket.DlvPrice.toFixed(2);
				$scope.basket.TotalPrice=parseFloat($scope.basket.incVAT)+parseFloat($scope.basket.DlvPrice);
				$scope.basket.TotalPrice=$scope.basket.TotalPrice.toFixed(2);
				$scope.basket.szDlvPrice=$scope.basket.DlvPrice.toString().replaceAll('.',',');
				$scope.basket.szTotalPrice=$scope.basket.TotalPrice.toString().replaceAll('.',',');
			};

			ApiSvc.getData('data/clientdata',{xdata:ApiSvc.encodeData($scope.clientData.sid,"sid")},$scope.ClientData);
			ApiSvc.getData('data/menus',null,$scope.SetMenus);
			ApiSvc.getData('data/basket',null,$scope.FillBasket);
			Tools.AddDialog($scope,'DlgDetail','views/prodetail.html',$scope.DetailDlgInit,$scope.DetailDlgVal);
			Tools.AddDialog($scope,'DlgLogin','views/login.html',$scope.LoginDlgInit,$scope.LoginDlgVal);
			Tools.AddDialog($scope,'DlgNewreg','views/newreg.html');
			Tools.AddDialog($scope,'DlgNewpwd','views/newpwd.html');
	}]);
});
