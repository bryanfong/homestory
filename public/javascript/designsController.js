angular.module('homestory')
.controller('DesignsController', DesignsController);

DesignsController.$inject = ['$http', '$scope'];

function DesignsController($http, $scope){
  $scope.all = [];
  // $scope.addDesign = addDesign;
  // $scope.newDesign = {};
  $scope.getDesigns = getDesigns;
  // $scope.deleteDesign = deleteDesign;

  getDesigns();
  function getDesigns(){
    $http
      .get('http://localhost:3000/api/designs')
      .then(function(response){
        $scope.all = response.data;
      })
  }


}
