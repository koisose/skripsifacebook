var app = angular.module("main", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "pages/index.html"
  })
//   .when("/red", {
//     templateUrl : "red.htm"
//   })
//   .when("/green", {
//     templateUrl : "green.htm"
//   })
//   .when("/blue", {
//     templateUrl : "blue.htm"
//   });
});