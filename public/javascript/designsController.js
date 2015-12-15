angular.module('homestory')
.controller('DesignsController', DesignsController);

DesignsController.$inject = ['$http', '$scope', '$state', '$stateParams'];

function DesignsController($http, $scope, $state, $stateParams){
  $scope.all = [];
  // $scope.addDesign = addDesign;
  // $scope.newDesign = {};
  $scope.searchResults = $stateParams.searchResults;
  $scope.searchParams = {};

  $scope.getDesigns = function (){
    $http
      .get('http://localhost:3000/api/designs')
      .then(function(response){
        $scope.all = response.data;
      })
  }

  $scope.getDesigns();

  $scope.searchDesigns = function(){
    console.log('$scope.searchParams');
    console.log($scope.searchParams);

    $http
      .post('http://localhost:3000/api/designs/search', $scope.searchParams)
      .success(function(data){
        $state.transitionTo('result', {searchResults: data});
      })
  }

  // function getOneDesign(){
  //   $http
  //     .get('http://localhost:3000/api/designs')
  //     .success(function(data){
  //       $location.path('/result');
  //       $scope.searchResults = data;
  //     })
  // }

}
