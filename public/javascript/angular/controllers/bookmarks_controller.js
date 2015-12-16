app
.controller('BookmarksController', BookmarksController);

BookmarksController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function BookmarksController($http, $scope, $state, $stateParams){

  $scope.all = [];

  $scope.getBookmarks = function(){
    $http
      .get('http://localhost:3000/api/bookmarks')
      .then(function(response){
        $scope.all = response.data;
        console.log(response.data);
      })
  }

  $scope.getBookmarks();
}