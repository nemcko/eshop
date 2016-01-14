define(['controllers/controllers','services/userService'],
  function(controllers) {
    controllers.controller('RootCtrl', ['$scope', 'UserService' , function($scope,UserService) {
        if ( !$scope.tabs ) {
          $scope.UserData = UserService.getUserData();
          $scope.taburl='tab1';
        }
    }]);
});
