(function() {
  'use strict';
  angular.module('main.controllers').controller('MainCtrl', _mainCtrl);

  function _mainCtrl($scope, $state ,$stateParams, $ionicModal, ContactService) {
    var vm = this;
    vm.titleModal = "Nuevo contacto";
    vm.search = "";
    vm.Editar = false;
    vm.Detalles  = false;
    vm.emailRegex  = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$";
    vm.telefonosRegex = "[0-9*+#()]";
    vm.pais = localStorage.getItem("pais");
    vm.indetificationTypes = [
     { id:1 , valor: 'SIN RUC'},
     { id: 2, valor: ' RUC'},
     { id: 3, valor: ' DNI'},
     { id: 4, valor: ' PP'},
     { id: 5, valor: ' CE'},
     { id: 6, valor: ' CDI'},
    ];
    vm.base = {};

    $ionicModal.fromTemplateUrl('templates/modal/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modal = modal;
    });

    /**
     * [muestra la modal para edicion]
     * @return {[type]} [description]
     */
    vm.edita = function(item) {
      vm.titleModal = "Editar contacto";
      vm.Editar = true;
       vm.Detalles = false;
      vm.cargar(item);
      vm.modal.show();
    };

    vm.Edit = function(){
        vm.Editar = true;
        vm.Detalles = false;
         vm.titleModal = "Editar contacto";
    }

    vm.cargar = function(item){
      vm.base = item;
      if (item.type.indexOf('client') >= 0) {
        vm.base.typec = true;
      }
      if (item.type.indexOf('provider') >= 0) {
        vm.base.typep = true;
      }
      // validar pais, no me fue posible enviar los datos nesesarios para la creacion de un contacto en otro pais, el api no almacena los datos enviados.
      // if (typeof item.identification != 'object' && vm.pais == '7' ) {
      //   vm.base.identification = {};
      // }
      

    };
    /**
     * muestra la informacion del contacto
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    vm.verDetalles  = function(item){

      vm.titleModal = "Detalles contacto";
      vm.Editar = false;
       vm.Detalles = true;
       vm.cargar(item);
      vm.modal.show();
    };
    vm.opciones  = function(){
        $state.go('options');
    }

    /**
     * [muestra la modal para creacion]
     * @return {[type]} [description]
     */
    vm.mostarModalAdd = function(){
        vm.base = {};
        vm.titleModal = "Nuevo contacto";
        vm.modal.show();
        vm.Editar = false;
        vm.Detalles = false;
    };



    vm.cerrarModal = function(){
       vm.modal.hide();
       vm.base = {};

    };




    vm.tipo = function(){
         vm.base.type =[];
        if(vm.base.typec){
            vm.base.type.push('client');
        }
        if(vm.base.typep){
            vm.base.type.push('provider');
        }
        
    };

    vm.nuevoContacto = function(form){
        
     ContactService.addContact(vm.base).then(function(res){
        $scope.$broadcast('reloadlist',true);
            vm.cerrarModal();
      }, function(res) {
        console.error("SURGIO UN ERROR: ", res);
      });   
    };


    vm.editarContacto = function(form){
        
     ContactService.ActualizarContacto(vm.base.id,vm.base).then(function(res){
        $scope.$broadcast('reloadlist',true);
             vm.titleModal = "Detalles contacto";
            vm.Editar = false;
             vm.Detalles = true;
      }, function(res) {
        console.error("SURGIO UN ERROR: ", res);
      });   
    };
  }
})(window.angular);
