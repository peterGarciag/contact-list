(function(angular) {
  'use strict';
  angular.module('main.controllers').controller('OptionsCtrl', _OptionsCtrl);

  function _OptionsCtrl($scope, $state, $stateParams, $ionicModal) {
    var vm = this;
    vm.Paises = [
      { nombre: "Colombia", valor: 1 },
      { nombre: "Chile", valor: 2 },
      { nombre: "España", valor: 3 },
      { nombre: "México", valor: 4 },
      { nombre: "USA", valor: 5 },
      { nombre: "Panamá", valor: 6 },
      { nombre: "Perú", valor: 7 },
      { nombre: "Costa Rica", valor: 8 },
      { nombre: "República Dominicana", valor: 9 },
      { nombre: "Internacional", valor: 10 }

    ];
    vm.pais = {};
    vm.init = function () {

        vm.pais = parseInt(localStorage.getItem("pais"));
        console.log(vm.pais);
    }
    vm.newPais = function(){
        console.log(vm.pais);
        localStorage.setItem("pais",vm.pais);
    };
  }
})(window.angular);
