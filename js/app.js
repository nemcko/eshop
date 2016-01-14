define(['angular','controllers/controllers', 'services/services', 'directives/directives','uibootstrap'], function (angular) {
  return angular.module('myApp', ['controllers', 'services', 'directives','ui.router','ui.bootstrap']);
});
