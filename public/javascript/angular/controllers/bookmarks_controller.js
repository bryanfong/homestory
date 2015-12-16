app
.controller('BookmarksController', BookmarksController);

BookmarksController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function BookmarksController($http, $scope, $state, $stateParams){

  $scope.getBookmarks = function(){
    $http.get('http://localhost:3000/api/bookmarks').then(function(response){
      console.log(response.data);
      $scope.all = response.data;
    })
  }

  // init my variables
  $scope.all = [];
  $scope.getBookmarks();
}