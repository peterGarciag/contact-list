(function() {
  'use strict';
  angular.module('main.controllers').controller('MainCtrl', _mainCtrl);

  function _mainCtrl($scope , $state ,$stateParams, $ionicModal,ContactService) {
    var vm = this;

    vm.titleModal = "Nuevo contacto";
    vm.search = "";
     $ionicModal.fromTemplateUrl('templates/modal/modal.html', {
        scope: vm.$scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modal = modal;
      });
    vm.edita = function(item) {
      vm.titleModal = "Nuevo contacto";
      vm.contacto = item;
      console.log(item);
    };
    vm.mostarModalAdd = function(){
        vm.titleModal = "Nuevo contacto";
        vm.modal.show();
    };
    vm.cerrarModal = function(){
       vm.modal.hide();
    };
    vm.detalles = function(item) {
      console.log(item);
    };
  }
})(window.angular);
