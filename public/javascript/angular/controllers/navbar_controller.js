app.controller('NavbarCtrl', ['CurrentUser', '$scope', '$http', '$resource', function (CurrentUser, $scope, $http, $resource){
  $scope.current_user = CurrentUser.user

  $scope.logout = function () {
    $http({
      url: "http://localhost:3000/signout",
      method: "DELETE"
    }).then(function(data){
      console.log(data);
      CurrentUser.user = null;
      $scope.current_user = null;
    })
  };
}]);