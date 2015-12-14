angular.module('homestory')
.controller('DesignsController', DesignsController);

DesignsController.$inject = ['$http', '$scope'];

function DesignsController($http, $scope){
  $scope.all = [];
  // $scope.addDesign = addDesign;
  // $scope.newDesign = {};
  // $scope.searchParams = {};
  $scope.getDesigns = getDesigns;
  $scope.searchDesigns = searchDesigns;
  // $scope.deleteDesign = deleteDesign;

  getDesigns();
  function getDesigns(){
    $http
      .get('http://localhost:3000/api/designs')
      .then(function(response){
        $scope.all = response.data;
      })
  }

  function searchDesigns(){
    console.log($scope.searchParams);
    $http.post('http://localhost:3000/api/designs/search', $scope.searchParams)
      .success(function(data){
        console.log(data)
      })
  }

}
