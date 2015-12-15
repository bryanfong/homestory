var app = angular.module('homestory', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('landing', {
      url: "/",
      templateUrl: "/templates/static_pages/landing.html"
    })
    .state('result', {
      url: "/result",
      templateUrl: "/templates/designs/result.html",
      params: {
        searchResults: { array: true }
      }
    })
    .state('show', {
      url: "/designs/:id",
      templateUrl: "/templates/designs/show.html"
    })
}]);
