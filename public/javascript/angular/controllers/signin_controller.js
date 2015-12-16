app.controller('SigninCtrl', ['CurrentUser', '$scope', '$http', '$state',  function (CurrentUser, $scope, $http, $state){
  $scope.submit = function () {
    $http({
      method: "POST",
      url: "/signin",
      data: $scope.signinForm
    }).then(function (response){
      console.log(response);
      CurrentUser.user = response.data;
      $state.go('landing');
    }, function (response){
      console.log(response.data.message);
    })
  }
}])