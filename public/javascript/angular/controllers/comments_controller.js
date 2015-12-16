app
.controller('CommentsController', CommentsController);

CommentsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function CommentsController($http, $scope, $state, $stateParams){

  $scope.getComments = function(){
    $http.get('http://localhost:3000/api/bookmarks').then(function(response){
      console.log(response.data);
      $scope.all = response.data;
    })
  }

  // init my variables
  $scope.all = [];
  $scope.getComments();
}