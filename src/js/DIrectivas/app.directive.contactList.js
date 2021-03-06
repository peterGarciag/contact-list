(function() {
  'use strict';

  angular.module('main.directives')
    .directive('contactList', [_contactList]);

  function _contactList($timeout, ContactService, $ionicActionSheet) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        editar: '&onEdit',
        seleccionar: '&seeDetails',
        filtro: '@',
      },
      controller: _controller,
      controllerAs: 'contacts',
      bindToController: true,
      templateUrl: 'templates/contact-list/contact-list.html',

    };
  }

  function _controller($scope, ContactService, $timeout, $ionicActionSheet) {
    var _vm = this;
    _vm.Contactos = [];
    _vm.deslizar = true;
    _vm.ExistenMasContactos = true;
    _vm.Total;
   
   /**
    * escucha los el evento reloadlist para actualizar la lista de contactos uego de eliminar o crear un contacto
    */
    $scope.$on('reloadlist', function(evt, data){
       if (data === true) {
         _vm.doRefresh();
       }
    });

    /**
     * [obtiene los contactos en grupos para el infinite scroll]
     * @return {[type]} [description]
     */
    _vm.getMoreContacts = function() {
      
      var initialContact = 0;
      if (_vm.Contactos.length > 0) {
        initialContact = 
        _vm.Contactos.length;
      }

      if (_vm.Contactos.length == _vm.Total) {
        _vm.ExistenMasContactos = false;
        return;
      }
      var params = {
        start: parseInt(initialContact),
        limit: 5,
        order_direction: 'ASC',
        order_field: 'id',
      };
      
      ContactService.ObtenerContactos(params).then(function(res) {
        
        _vm.Total = res.total;
        for (var i = 0; i < res.contactos.length; i++) {
          _vm.Contactos.push(res.contactos[i]);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(res) {
        console.error("SURGIO UN ERROR: ", res);
      });

    };  

    /**
     * [cre un enlace telefonico para llamar al contacto]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    _vm.llamar = function(item){
      var URL = "tel:"+item.mobile;
      window.open(URL);
    }; 

    /** [filtro de contactos] */
    _vm.buscar = function(criteria) {

      return function(item) {

        var b;
        if (criteria == "") {
          b = true;
        } else {

          b = (item.name.indexOf(criteria) >= 0);
          if (item.email != null) {
            b = b ||item.email.indexOf(criteria) >= 0 ;
          }

          if (item.phoneSecondary != null) {
            b =  b || item.phoneSecondary.indexOf(criteria) >= 0;
          };

          if (item.phonePrimary != null) {
             b =  b || item.phonePrimary.indexOf(criteria) >= 0 
          };
          if (item.fax != null) {
             b =  b ||item.fax.indexOf(criteria) >= 0
          }
           
        }
        return b;
      };
    };

    /**
     * [funcion encargada de refrescar la lista de contactos , ion-refresher]
     * @param  {[type]} ev [description]
     * @return {[type]}    [description]
     */
    _vm.doRefresh = function(ev) {
      var params = {
        start: 0,
        limit: 5,
        order_direction: 'ASC',
        order_field: 'id',
      };
      ContactService.ObtenerContactos(params).then(function(res) {
        _vm.Total = res.total;
        _vm.Contactos = res.contactos;
        _vm.ExistenMasContactos = true;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(res) {
        console.error("SURGIO UN ERROR: ", res);
      });
    };

    /**
     * [elimina el contato]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    _vm.delete = function(id) {

      var _id = id;
      var deleteSheet = $ionicActionSheet.show({
        destructiveText: 'Si',
        titleText: '¿Esta seguro de eliminar el contacto?',
        cancelText: 'No',
        cancel: function() {
          return false;
        },
        destructiveButtonClicked: function() {

          ContactService.BorrarContacto(_id).then(function(res) {
            // mostrar mensaje
            // res.msg
            _vm.doRefresh();
          }, function(res) {
            console.error("SURGIO UN ERROR: ", res);
          });
          return true;
        }
      });
    };
  }

})(window.angular);
