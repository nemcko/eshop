define(['services/services'],
function(services) {
	services.factory('ApiSvc',['$http','$modal', '$state','$timeout','$sce','tools',
	function($http,$modal,$state,$timeout,$sce,Tools) {
		return {
			newId: function() {
				return new Date().getTime().toString();
			},
			removeDiacritic: function(phrase,bOnlyAscii) {
				var szDiaCritic = "áäčďéěíľĺňóôôöřŕšťúůüýřžÁÄČĎÉĚÍĽĹŇÓÔÖŘŠŤÚÜÝŘŽ";
				var szDiacRemoved = "aacdeeillnoooorrstuuuyrzAACDEEILLNOOORSTUUYRZ";
				var szText = "";

				if ( bOnlyAscii===undefined ) {
					szDiaCritic += " +=*/";
					szDiacRemoved += "_____";
				}

				for (var z = 0; z < phrase.length; z++)
				{
					var bFound = false;
					for (var d = 0; d < szDiaCritic.length; d++)
					{
						if (phrase[z] == szDiaCritic[d])
						{
							szText += szDiacRemoved[d];
							bFound = true;
							break;
						};
					}
					if (!bFound)
					{
						szText += phrase[z];
					};
				}
				return szText;
			},
			getNumber: function(txt,decpoint) {
				var number="";
				var index=0; 
				if ( txt ) {
					txt=txt.toString();
					while (index < txt.length) {
						var ch = txt.charAt(index++);
						if ( decpoint===undefined ) {
							if ( ch % 1 == 0 ) {
								number += ch;
							}
						} else {
							if ( ch % 1 == 0 || ch===decpoint) {
								number += ch;
							}
						}
					}
					return parseFloat(number);
				}
				return 0;
			},
			checkInputErrors: function($scope,checkGrp) {
				if ( checkGrp===undefined ) {
					checkGrp="";
				}
				for (var key in $scope['checkInputErrors'+checkGrp]) {
					if ( $scope['checkInputErrors'+checkGrp][key] ) {
//						alert($scope.CheckInput(key));
						$timeout(function () {
							jQuery('#'+key.replaceAll('.','_')).focus();
							jQuery('#'+key.replaceAll('.','_')).select();
						}, 100);
						return false;
					};
				}
				return true;
			},
			setInputError: function($scope,id,msg) {
				jQuery('#err_'+id.replaceAll('.','_')).html(msg);
				$scope.checkInputErrors[id]=true;
				jQuery('#err_'+id.replaceAll('.','_')).removeClass("ng-hide");
				$timeout(function () {
					jQuery('#'+id.replaceAll('.','_')).focus();
					jQuery('#'+id.replaceAll('.','_')).select();
				}, 100);
			},
			encodeData: function(obj,secret) {
				var data;
				var key = CryptoJS.enc.Latin1.parse(CryptoJS.MD5(secret).toString().substr(0,24));
				var iv  = CryptoJS.enc.Latin1.parse(CryptoJS.MD5(secret).toString().substr(0,8));

				try {
					data=CryptoJS.enc.Base64.stringify(CryptoJS.TripleDES.encrypt(angular.toJson(obj), key,{ iv: iv }).ciphertext);
				} catch(e) {
					data=null;
				}
				return data;
			},
			decodeData: function(data,secret) {
				var obj;
				var key = CryptoJS.enc.Latin1.parse(CryptoJS.MD5(secret).toString().substr(0,24));
				var iv  = CryptoJS.enc.Latin1.parse(CryptoJS.MD5(secret).toString().substr(0,8));
				
				try {
					obj=angular.fromJson(CryptoJS.enc.Utf8.stringify(CryptoJS.TripleDES.decrypt(data, key,{ iv: iv })));
				} catch(e) {
					obj=null;
				}
				return obj;
			},
			getData: function(queryID,params,cbUpdate,showError) {
				var self=this;
				jQuery("*").css("cursor", "progress");

				if ( cbUpdate==null || cbUpdate===undefined ) {
					var xhr = false;
					if (window.XMLHttpRequest) {
						xhr = new XMLHttpRequest();
					} else if (window.ActiveXObject) {
						try {
							xhr = new ActiveXObject("Msxml2.XMLHTTP");
						} catch (e) {
							try {
								xhr = new ActiveXObject("Microsoft.XMLHTTP");
							} catch (e) {}
						}
					}
					if (!xhr) {
						Tools.MsgBox("Error",'XMLHTTP error',"exclamation-sign");
						jQuery("*").css("cursor", "default");
						return null;
					}
					var url='api/?/'+queryID;
					if ( params!==null && params!==undefined) {
						url = url + '&' + $.param( params );
					} 
					xhr.open("GET",url,false);
					xhr.setRequestHeader('Accept','application/json');
//					xhr.setRequestHeader('User-Agent',"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1");
					xhr.send(null);
					if (xhr.status === 200) {
						try {
							var retval=angular.fromJson(xhr.responseText);
							if ( retval.status==200) {
								jQuery("*").css("cursor", "default");
								return angular.fromJson(retval.data);	
							};
						} catch (e) {};
					}
					jQuery("*").css("cursor", "default");
					return null;
				} else {
					$http({ method: 'GET',
						responseType: 'json',
						url: 'api/?/'+queryID,
						params: params 
					}).success(function (data) {
						jQuery("*").css("cursor", "default");
						if ( cbUpdate!==undefined && data ) {
							cbUpdate(angular.fromJson(data.data));
						}
					}).error(function(data) {
						jQuery("*").css("cursor", "default");
						if ( showError===undefined || showError ) {
							if ( typeof data=== 'object' ) {
								Tools.MsgBox("Error",data.message,"exclamation-sign");
							} else {
								Tools.MsgBox("Error",data,"exclamation-sign");
							}
						}
					});	 
				};
			},
			setData: function(queryID,sid,postData,callback,showError) {
				jQuery("*").css("cursor", "progress");
				var self=this;
				if ( sid!==null && sid!==undefined) {
					if ( postData!==null ) {
						postData=this.encodeData(postData,sid);
					}
				}
				if ( callback==null || callback===undefined ) {
					var xhr = false;
					if (window.XMLHttpRequest) {
						xhr = new XMLHttpRequest();
					} else if (window.ActiveXObject) {
						try {
							xhr = new ActiveXObject("Msxml2.XMLHTTP");
						} catch (e) {
							try {
								xhr = new ActiveXObject("Microsoft.XMLHTTP");
							} catch (e) {}
						}
					}
					if (!xhr) {
						Tools.MsgBox("Error",'XMLHTTP error',"exclamation-sign");
						jQuery("*").css("cursor", "default");
						return null;
					}
					var url='api/?/'+queryID;
					xhr.open("POST",url,false);
					xhr.setRequestHeader('Accept','application/json');
//					xhr.setRequestHeader('User-Agent',"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.1) Gecko/20061204 Firefox/2.0.0.1");
					xhr.send(postData);
					if (xhr.status === 200) {
						try {
							var retval=angular.fromJson(xhr.responseText);
							if ( retval.status==200) {
								jQuery("*").css("cursor", "default");
								return angular.fromJson(retval.data);	
							};
						} catch (e) {};
					}
					jQuery("*").css("cursor", "default");
					return null;
				} else {
					$http({ method: 'POST',
						responseType: 'json',
						url: 'api/?/'+queryID,
						data: postData
					}).success(function (data) {
						jQuery("*").css("cursor", "default");
						if ( typeof callback === 'function' && data ) {
							callback(angular.fromJson(data.data));
						}
					}).error(function(data) {
						jQuery("*").css("cursor", "default");
						if ( showError===undefined || showError ) {
							if ( typeof data=== 'object' ) {
								Tools.MsgBox("Error",data.message,"exclamation-sign");
							} else {
								Tools.MsgBox("Error",data,"exclamation-sign");
							}
						}
					});
				}
			},
			goToState: function(name,id) {
				if ( id===undefined ) {
					$state.transitionTo(name);
				} else if ( typeof id =='boolean' ) {
					if ( $scope.parentobj.id===undefined ) return;	          			
					$state.transitionTo(name, {id:$scope.parentobj.id});
				} else {
					$state.transitionTo(name, {'id':id});
				}
			}

		};

	}]);
});
