app
.controller('CommentsController', CommentsController);

CommentsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function CommentsController($http, $scope, $state, $stateParams){

  $scope.getComments = function(){
    $http.get('http://localhost:3000/api/comments/' + $stateParams.id).then(function(response){
      console.log(response.data);
      $scope.all = response.data;
    })
  }

  $scope.addComment = function(){
    $http
      .post('http://localhost:3000/api/comments', {comment: {design_id: $stateParams.id, comment: $scope.newComment}})
      .then(function(data){
        $scope.getComments();
      });
    $scope.newComment = '';
  }

  // init my variables
  $scope.all = [];
  $scope.getComments();
}