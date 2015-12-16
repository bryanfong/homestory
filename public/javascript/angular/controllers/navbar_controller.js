app.controller('NavbarCtrl', ['CurrentUser', '$scope', '$http', '$resource', '$state', function (CurrentUser, $scope, $http, $resource, $state){
  $scope.validateUser = function () {
    $http({
      url: "http://localhost:3000/validate",
      method: "GET",
    }).then(function(response){
      console.log(response);
      CurrentUser.user = response.data;
      $scope.current_user = CurrentUser.user;
    }, function(response){
      console.log(response);
    });
  }

  $scope.logout = function () {
    $http({
      url: "http://localhost:3000/signout",
      method: "DELETE"
    }).then(function(response){
      console.log(response);
      CurrentUser.user = null;
      $scope.current_user = null;
      $state.go('landing');
    });
  };

  // init my variables
  $scope.current_user = CurrentUser.user
  if (!$scope.current_user){
    $scope.validateUser();
  }
}]);
