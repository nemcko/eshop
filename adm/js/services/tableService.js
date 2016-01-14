define(['services/services'],
	function(services) {
	services.factory('TableService',['$http', function($http) {
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
//				szText = szText.replace("[\s-]+", " ");
//				szText = szText.replace(/^\s+|\s+$/g, "_");
//				szText = szText.replace("\s", "-");
				return szText;
			},
			newGridOption: function($scope,optionname) {
				$scope[optionname] = {
						data: 'gridData',
						rowHeight:28,
						enablePaging: true,
						showFooter: true,
						multiSelect:false,
						enableCellEdit:false,
						enableColumnResize:true,
						enableColumnReordering:true,
						totalServerItems: 'totalServerItems',
						pagingOptions: $scope.pagingOptions,
						filterOptions: $scope.filterOptions,
						selectedItems: []
//				,afterSelectionChange: function (theRow) {      
//				alert(theRow.entity.id);
//				if($scope.selections != null){
//				$scope.disabled = true;
//				} else {
//				$scope.disabled = false;
//				}	    
//				}
				};        
				$scope[optionname].footerTemplate=
					"<div data-ng-show=\"showFooter\" class=\"ngFooterPanel\" data-ng-class=\"{'ui-widget-content': jqueryUITheme, 'ui-corner-bottom': jqueryUITheme}\" data-ng-style=\"footerStyle()\">" +
					"    <div class=\"ngPagerContainer\" style=\"float: right; margin-top: 10px;\" data-ng-show=\"enablePaging\" data-ng-class=\"{'ngNoMultiSelect': !multiSelect}\">" +
					"        <div style=\"float:left; margin-right: 10px;\" class=\"ngRowCountPicker\">" +
					"            <span style=\"float: left; margin-top: 3px;\" class=\"ngLabel glyphicon glyphicon-resize-vertical\"></span>" +
					"            <select style=\"float: left;height: 27px; width: 100px\" data-ng-model=\"pagingOptions.pageSize\" >" +
					"                <option data-ng-repeat=\"size in pagingOptions.pageSizes\">{{size}}</option>" +
					"            </select>" +
					"        </div>" +
					"        <div style=\"float:left; margin-right: 10px; line-height:25px;\" class=\"ngPagerControl\" style=\"float: left; min-width: 135px;\">" +
					"            <button class=\"ngPagerButton\" data-ng-click=\"pageToFirst()\" data-ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerFirstTitle}}\"><div class=\"ngPagerFirstTriangle\"><div class=\"ngPagerFirstBar\"></div></div></button>" +
					"            <button class=\"ngPagerButton\" data-ng-click=\"pageBackward()\" data-ng-disabled=\"cantPageBackward()\" title=\"{{i18n.ngPagerPrevTitle}}\"><div class=\"ngPagerFirstTriangle ngPagerPrevTriangle\"></div></button>" +
					"            <input class=\"ngPagerCurrent\" min=\"1\" max=\"{{maxPages()}}\" type=\"number\" style=\"width:50px; height: 24px; margin-top: 1px; padding: 0 4px;\" data-ng-model=\"pagingOptions.currentPage\"/>" +
					"            <button class=\"ngPagerButton\" data-ng-click=\"pageForward()\" data-ng-disabled=\"cantPageForward()\" title=\"{{i18n.ngPagerNextTitle}}\"><div class=\"ngPagerLastTriangle ngPagerNextTriangle\"></div></button>" +
					"            <button class=\"ngPagerButton\" data-ng-click=\"pageToLast()\" data-ng-disabled=\"cantPageToLast()\" title=\"{{i18n.ngPagerLastTitle}}\"><div class=\"ngPagerLastTriangle\"><div class=\"ngPagerLastBar\"></div></div></button>" +
					"        </div>" +
					"    </div>" +
					"</div>";		    	


			},
			setGridScope: function($scope,TableService,$modal,$state,queryID,templateDlgUrl,cmdID) {
				$scope.queryID=queryID;
				$scope.filterOptions = {
						filterText: "",
						commandID: (cmdID===undefined ?'':cmdID),
						useExternalFilter: true
				}; 
				$scope.totalServerItems = 0;
				$scope.totalFilteredItems=0;
				$scope.pagingOptions = {
						pageSizes: [15, 50, 100],
						pageSize: 15,
						currentPage: 1
				};	

				this.newGridOption($scope,"gridOptions");

				$scope.Refresh = function () {			
					setTimeout(function () {
						$scope.rowid=0;
						TableService.getTableData($scope);
					}, 100);
				};
				$scope.loadGridData = function () {			
					setTimeout(function () {
						TableService.getTableData($scope);
					}, 100);
				};	    

				$scope.RefreshData = function (data) {			
					TableService.setTableData($scope,data);
				};	    

				$scope.$watch('pagingOptions', function (newVal, oldVal) {
					if (newVal !== oldVal ) {
						if ( newVal.currentPage !== oldVal.currentPage) {
							$scope.loadGridData();
						} else if ( newVal.pageSize!==oldVal.pageSize )
						{
							newVal.currentPage=1;
							$scope.loadGridData();
						}
					}
				}, true);
				$scope.$watch('filterOptions', function (newVal, oldVal) {
					if (newVal !== oldVal) {
						$scope.loadGridData();
					}
				}, true);

//				$scope.$on('ngGridEventStartCellEdit', function(evt){
//				$scope.OriginalRow = angular.copy(evt.targetScope.row.entity);
//				console.log("OriginalRow", $scope.OriginalRow);
//				});

				$scope.$on('ngGridEventEndCellEdit', function(evt){
					$scope.UpdatedRow = evt.targetScope.row.entity;
					console.log('UpdatedRow', $scope.UpdatedRow, $scope.OriginalRow);
				});



//				$scope.updateEntity = function(column, row) {
//				console.log(row.entity);
//				console.log(column.field);
				//
//				// code for saving data to the server...
//				// row.entity.$update() ... <- the simple case
				//
//				// I have nested Entity / data in the row <- the complex case
//				// var answer = new Answer(question.answers[answerIndex]); // answerIndex is computed with "column.field" variable
//				// answer.$update() ...
//				}	    

//				$scope.gridOptions = {
//				data: 'gridData',
//				rowHeight:28,
//				enablePaging: true,
//				showFooter: true,
//				multiSelect:false,
//				enableCellEdit:false,
//				enableColumnResize:true,
//				enableColumnReordering:true,
//				totalServerItems: 'totalServerItems',
//				pagingOptions: $scope.pagingOptions,
//				filterOptions: $scope.filterOptions,
//				selectedItems: []
////				,afterSelectionChange: function (theRow) {      
////				alert(theRow.entity.id);
////				if($scope.selections != null){
////				$scope.disabled = true;
////				} else {
////				$scope.disabled = false;
////				}	    
////				}
//				};

				$scope.goToState = function(name,id) {
					if ( id===undefined ) {
						$state.transitionTo(name);
					} else if ( typeof id =='boolean' ) {
						if ( id ) {
							if ( $scope.gridOptions.selectedItems[0]===undefined ) return;
							$state.transitionTo(name, {id:$scope.gridOptions.selectedItems[0].id});
						} else {	          			
							if ( $scope.parentobj.id===undefined ) return;	          			
							$state.transitionTo(name, {id:$scope.parentobj.id});
						}
					} else {
						$state.transitionTo(name, {'id':id});
					}
				};          

				$scope.DelRow = function () {
					if ( $scope.gridOptions.selectedItems[0]===undefined ) return;
					if ( window.confirm('Chcete vymazať označený riadok?') ) {
						TableService.deleteTableRow($scope,$scope.gridOptions.selectedItems[0].id);
					}
				};

				$scope.DlgOpen = function (newData) {
					$scope.OpenUpdateDialog(newData,templateDlgUrl,$scope.DlgInit,$scope.DlgValidate);
				};


				$scope.OpenUpdateDialog = function (newData,templateurl,callbackinit,callbackvalidate) {
					if ( !newData && $scope.gridOptions.selectedItems[0]===undefined ) return;

//					$scope.gridOptions.selectedItems[0]={};
//					$scope.gridOptions.selectedItems.push(row);	    	
					$modal.open({	    	  
						templateUrl: templateurl,
						controller: $scope.UpdateDialogCtrl,
						resolve: {
							addnew: function() { return newData; },
							cbinit: function() { return callbackinit; },
							cbvalidate: function() { return callbackvalidate; },
							gridscope: function() { return $scope; },
							dlgdata: function () {
								var row = {};
								for (var i = 0; i < $scope.gridOptions.columnDefs.length; i++) {
									if ( $scope.gridOptions.columnDefs[i].expr===undefined ) {
										if ( newData || !$scope.gridOptions.selectedItems.length ) {
											row[$scope.gridOptions.columnDefs[i].field]=null;
										} else {
											row[$scope.gridOptions.columnDefs[i].field]=$scope.gridOptions.selectedItems[0][$scope.gridOptions.columnDefs[i].field];
										}
									}
								}			        		
								return row;
							}
						}
					});	       
				};


				$scope.UpdateDialogCtrl = function ($scope, $modalInstance,gridscope,dlgdata,addnew,cbinit,cbvalidate) {
					var rowid=(addnew || dlgdata=== undefined ? 0 : dlgdata.id);	    	  
					if ( !(addnew || rowid) ) {
						$modalInstance.dismiss('cancel');
						return;
					}
					$scope.addnew=!rowid;
					$scope.data = dlgdata;
					if ( cbinit!==undefined ) {
						var retVal=cbinit($scope);
						if (  retVal!==undefined && retVal===false ){
							$modalInstance.dismiss('cancel');
							return;	    			  
						}
					}

					$scope.ok = function () {
						if ( cbvalidate!==undefined ) {
							if ( !cbvalidate($scope) ) {
								return;
							}
						}

						setTimeout(function () {
							TableService.postTableData(gridscope,rowid,$scope.data);
							$modalInstance.close();
						}, 100);    		  
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				};	 

//				$scope.Refresh();
//				TableService.getTableData($scope);
			},        	      	      
			getDecimal: function (strval,format)
			{
				var digits="1234567890,.";
				var val="";
				strval=strval+"";
				for (var i=0; i < strval.length; i++) {
					if (digits.indexOf(strval.charAt(i))>=0)
					{
						if ( strval.charAt(i)==',' ) {
							val+='.';
						} else {
							val+=strval.charAt(i);
						}
					}
				}
				if ( val ) {
					if ( format===undefined ) {
						return parseFloat(val);
					} else {
						return (""+parseFloat(val)).replace('.', ',');
					}

				} else {
					return 0;
				}
			},	      	      
			getValues: function(queryID,params,cbUpdate,showError) {
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
						alert('XMLHTTP error');
						return null;					
					}
					var url='../api/index.php/?/'+queryID;
					if ( params!==null && params!==undefined) {
						url = url + '&' + $.param( params );
					} 
					xhr.open("GET",url,false);

					xhr.setRequestHeader('Accept','application/json');
					xhr.send(null);	    		  
					if (xhr.status === 200) {
						try {
							var retval=angular.fromJson(xhr.responseText);
							if ( retval.status==200) {
								return retval.data;	
							}								
						} catch (e) {}						
					} 						
					return null;
				} else {
					$http({ method: 'GET',
						responseType: 'json',
						url: '../api/index.php/?/'+queryID,
						params: params ,
					}).success(function (data) {
						if ( cbUpdate!==undefined && data ) {
							cbUpdate(angular.fromJson(data.data));
						}
					}).error(function(data) {          
						if ( showError===undefined || showError ) {
							if ( typeof data=== 'object' ) {
								alert(data.message);
							} else {
								alert(data);
							}
						}
					});	 
				}
			},	      
			getGridColumns: function($scope) {
				var columns="";
				for (var f in $scope.gridOptions.columnDefs) { 
					if ($scope.gridOptions.columnDefs[f].field!==undefined )
						columns+=(columns?'+':'') + $scope.gridOptions.columnDefs[f].field;
				}
				return columns;
			},
			setValues: function(queryID,CommndId,postData,callback,showError) {
				if (typeof callback === "function") {
					$http({ method: 'POST',
						responseType: 'json',
						url: '../api/index.php/?/'+queryID,    
						params: {'cmdid':CommndId },
						data: postData
					}).success(function (data) {
						if ( callback!==undefined  && data ) {
							callback(angular.fromJson(data.data));
						}
					}).error(function(data) {          
						if ( showError===undefined || showError ) {
							if ( typeof data=== 'object' ) {
								alert(data.message);
							} else {
								alert(data);
							}
						}
					});	    	  
				} else {
					var $scope=callback;
					var self = this;
					var columns=self.getGridColumns($scope);

					$http({ method: 'POST',
						responseType: 'json',
						url: '../api/index.php/?/'+queryID,    
						params: {'cmdid':CommndId,'iDisplayLength':$scope.pagingOptions.pageSize,'iDisplayStart':$scope.pagingOptions.currentPage, 'columns': columns, 'sSearch':$scope.filterOptions.filterText, 'rowid':($scope.rowid===undefined?0:$scope.rowid),  'timestamp': new Date().getTime() },
						data: postData
					}).success(function (data) {
						self.setTableData($scope,data);
					}).error(function(data) {          
						if ( showError===undefined || showError ) {
							if ( typeof data=== 'object' ) {
								alert(data.message);
							} else {
								alert(data);
							}
						}
					});	    	  	    		  
				}
			},
			delValues: function(queryID,CommndId,postData,callback,showError) {
				$http({ method: 'DELETE',
					responseType: 'json',
					url: '../api/index.php/?/'+queryID,    
					params: {'cmdid':CommndId },
					data: postData
				}).success(function (data) {
					if ( callback!==undefined  && data ) {
						callback(angular.fromJson(data.data));
					}
				}).error(function(data) {
					if ( showError===undefined || showError ) {
						if ( typeof data=== 'object' ) {
							alert(data.message);
						} else {
							alert(data);
						}
					}
				});
			},
			setTableData: function($scope,data) {
				if ( data ) {
					$scope.gridData = data.aaData;
					$scope.totalServerItems = data.iTotalRecords;
					$scope.totalFilteredItems=data.iTotalDisplayRecords;

					if (!$scope.$$phase) {
						$scope.$apply();
					} 
				}
			},
			getTableData: function($scope) {
				var self = this;
				var columns=self.getGridColumns($scope);              
//				if ( $scope.filterOptions.commandID===undefined ) $scope.filterOptions.commandID='';              
				$http({ method: 'GET',
					responseType: 'json',
					url: '../api/index.php/?/'+$scope.queryID,
					params: {'cmdid':$scope.filterOptions.commandID,'iDisplayLength':$scope.pagingOptions.pageSize,'iDisplayStart':$scope.pagingOptions.currentPage, 'columns': columns, 'sSearch':$scope.filterOptions.filterText, 'rowid':($scope.rowid===undefined?0:$scope.rowid), 'timestamp': new Date().getTime() },
				}).success(function (data) {
					self.setTableData($scope,data);
				}).error(function(data) {          
					if ( typeof data=== 'object' ) {
						alert(data.message);
					} else {
						alert(data);
					}
				});
			},
			postTableData: function($scope,id,postData) {
				var self = this;
				var columns=self.getGridColumns($scope);              
//				if ( $scope.filterOptions.commandID===undefined ) $scope.filterOptions.commandID='';        	  
				$http({ method: 'POST',
					responseType: 'json',
					url: '../api/index.php/?/'+$scope.queryID+'/'+id,
					params: {'cmdid':$scope.filterOptions.commandID,'iDisplayLength':$scope.pagingOptions.pageSize,'iDisplayStart':$scope.pagingOptions.currentPage,'columns': columns,'sSearch':$scope.filterOptions.filterText, 'rowid':($scope.rowid===undefined?0:$scope.rowid), 'timestamp': new Date().getTime() },
					data: postData
				}).success(function (data) {
					self.setTableData($scope,data);
				}).error(function(data) {
					if ( typeof data=== 'object' ) {
						alert(data.message);
					} else {
						alert(data);
					}
				});	  
			},
			deleteTableRow: function($scope,id) { 
				var self = this;
				var columns=self.getGridColumns($scope);
//				if ( $scope.filterOptions.commandID===undefined ) $scope.filterOptions.commandID='';
				$http({ method: 'DELETE',
					responseType: 'json',
					url: '../api/index.php/?/'+$scope.queryID+'/'+id,
					params: {'cmdid':$scope.filterOptions.commandID,'iDisplayLength':$scope.pagingOptions.pageSize,'iDisplayStart':$scope.pagingOptions.currentPage, 'columns': columns,'sSearch':$scope.filterOptions.filterText, 'rowid':($scope.rowid===undefined?0:$scope.rowid), 'timestamp': new Date().getTime() }
				}).success(function (data) {
					self.setTableData($scope,data);
				}).error(function(data) {      
					if ( typeof data=== 'object' ) {
						alert(data.message);
					} else {
						alert(data);
					}
				});        	  
			},

		};
	}]);
});
