define(['angular','ngGrid','controllers/controllers', 'services/services', 'directives/directives','uibootstrap'], function (angular) {
  return angular.module('MyApp', ['ngGrid','controllers', 'services', 'directives','ui.router','ui.bootstrap']);
});
