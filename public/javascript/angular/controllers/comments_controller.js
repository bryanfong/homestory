app
.controller('CommentsController', CommentsController);

CommentsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function CommentsController($http, $scope, $state, $stateParams){

  $scope.getComments = function(){
    console.log($stateParams);
    console.log('http://localhost:3000/api/comments/' +$stateParams.id);
    $http.get('http://localhost:3000/api/comments/' + $stateParams.id).then(function(response){
      console.log(response.data);
      $scope.all = response.data;
    })
  }

  // init my variables
  $scope.all = [];
  $scope.getComments();
}