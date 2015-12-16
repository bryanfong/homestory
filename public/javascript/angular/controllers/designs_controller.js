app
.controller('DesignsController', DesignsController);

DesignsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function DesignsController($http, $scope, $state, $stateParams){
  $scope.goToSearch = function () {
    window.localStorage.setItem("searchParams", JSON.stringify($scope.searchParams));

    $state.go('result');
  }

  $scope.getDesigns = function (){
    $http.get('/api/designs').then(function(response){
      $scope.all = response.data;
    });
  };

  $scope.searchDesigns = function(){
    $http.post('/api/designs/search', $scope.searchParams).then(function(response){
      console.log(response);
      $scope.searchResults = response.data;
    });
  };

  $scope.getOneDesign = function(){
    $http.get('/api/designs/'+ $stateParams.id).then(function(response){
      console.log(response);
      $scope.design = response.data;
    });
  };

  $scope.bookmarkDesign = function(){
    $http.post('/api/bookmarks', {bookmark: {design_id: $stateParams.id}}).then(function(response){
      console.log(response);
    }, function(response) {
      console.log(response);
    });
  };


  $scope.addDesign = function(){
    $http
      .post('/api/designs', {design: $scope.newDesign})
      .then(function(response){
        // $scope.getDesigns();
        console.log(response.data._id );
        $state.go('show', {id: response.data._id});
      });
  };

  // init my variables
  $scope.all = [];
  $scope.newDesign = {};

  // landing
  if ($state.current.name == "landing") {
    $scope.searchParams = {};
    $scope.getDesigns();
  }

  // result
  if ($state.current.name == "result") {
    $scope.searchParams = window.JSON.parse(window.localStorage.getItem("searchParams") + '')

    if ($scope.searchParams) {
      $scope.searchDesigns();
    } else {
      $state.go('landing');
    }
  }

  // show
  if ($state.current.name == "show") {
    $scope.getOneDesign();
  }
}
