app.controller('SignupCtrl', ['CurrentUser', '$scope', '$http', '$state', function (CurrentUser, $scope, $http, $state){
  $scope.submit = function () {
    $http({
      method: "POST",
      url: "http://localhost:3000/signup",
      data: $scope.signupForm
    }).then(function (response){
      console.log(response);
      CurrentUser.user = response.data;
      $state.go('landing');
    }, function (response){
      console.log(response.data.message);
    })
  }
}])