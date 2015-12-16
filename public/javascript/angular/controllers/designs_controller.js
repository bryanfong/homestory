app
.controller('DesignsController', DesignsController);

DesignsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function DesignsController($http, $scope, $state, $stateParams){
  $scope.goToSearch = function () {
    window.localStorage.setItem("searchParams", JSON.stringify($scope.searchParams));

    $state.go('result');
  }

  $scope.getDesigns = function (){
    $http.get('http://localhost:3000/api/designs').then(function(response){
      $scope.all = response.data;
    });
  };

  $scope.searchDesigns = function(){
    $http.post('http://localhost:3000/api/designs/search', $scope.searchParams).then(function(response){
      console.log(response);
      $scope.searchResults = response.data;
    });
  };

  $scope.getOneDesign = function(){
    $http.get('http://localhost:3000/api/designs/'+ $stateParams.id).then(function(response){
      console.log(response);
      $scope.design = response.data;
    });
  };

  $scope.bookmarkDesign = function(){
    $http.post('http://localhost:3000/api/bookmarks', {bookmark: {design_id: $stateParams.id}}).then(function(response){
      console.log(response);
    }, function(response) {
      console.log(response);
    });
  };

  // init my variables
  $scope.all = [];

  if ($state.current.name == "landing") { // landing
    $scope.searchParams = {};
    $scope.getDesigns();
  } else if ($state.current.name == "result") { // result
    $scope.searchParams = window.JSON.parse(window.localStorage.getItem("searchParams") + '')
    if ($scope.searchParams) {
      $scope.searchDesigns();
    } else {
      $state.go('landing');
    }
  } else { // show
    $scope.getOneDesign();
  }
}
