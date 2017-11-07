
(function() {
    'use strict';

angular.module('main', ['ionic','main.config','main.constants','main.services','main.directives','main.controllers'])

.run(run_main);

function run_main($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}
})();


