(function() {
    'use strict'; 
 angular.module('main.config', []).config(_config);

 function _config($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('main', {
    url: '/',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  });
  $urlRouterProvider.otherwise('/');
}

})();