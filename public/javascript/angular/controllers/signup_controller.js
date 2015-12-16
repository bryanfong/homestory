angular.module('homestory')
.controller('SignupCtrl', ['CurrentUser', '$scope', '$http', '$state', function (CurrentUser, $scope, $http, $state){
  $scope.submit = function () {
    $http({
      method: "POST",
      url: "http://localhost:3000/signup",
      data: $scope.signupForm
    }).then(function (data){
      console.log(data);
      $state.go('landing');
    }, function (data){
      console.log(data.data.message)
    })
  }
}])