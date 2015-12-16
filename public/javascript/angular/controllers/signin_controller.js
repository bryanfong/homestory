app.controller('SigninCtrl', ['CurrentUser', '$scope', '$http', '$state',  function (CurrentUser, $scope, $http, $state){
  $scope.submit = function () {
    // your $http
    $http({
      method: "POST",
      url: "http://localhost:3000/signin",
      data: $scope.signinForm
    }).then(function(data){
      console.log(data);
      CurrentUser.user = data.data;
      $state.go('landing');
    }, function(data){
      console.log(data.data.message);
      event.preventDefault();
    })
  }
}])