var app = angular.module('homestory', ['ui.router', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('landing', {
      url: "/",
      templateUrl: "/templates/static_pages/landing.html",
      controller: 'DesignsController'
    })
    .state('result', {
      url: "/result",
      templateUrl: "/templates/designs/result.html",
      controller: 'DesignsController'
    })
    .state('show', {
      url: "/designs/:id",
      templateUrl: "/templates/designs/show.html",
      controller: 'DesignsController'
    })
    .state('bookmarks', {
      url: '/bookmarks',
      templateUrl: '/templates/bookmarks/index.html',
      controller: 'BookmarksController'
    })
    .state('signup', {
      url: '/signup' ,
      templateUrl: '/templates/signup/index.html',
      controller: 'SignupCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: '/templates/signin/index.html',
      controller: 'SigninCtrl'
    });
}]);
