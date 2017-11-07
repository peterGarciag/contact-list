(function() {
  'use strict';

  angular.module('main.services')
    .factory("ContactService", _contactService);

  function _contactService($http, API) {
    $http.defaults.headers.common["Content-Type"] = "application/json";
    $http.defaults.headers.common.Authorization = 'Basic ' + window.btoa(API.USER + ":" + API.TOKEN);
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS";
    $http.defaults.headers.common['Access-Control-Allow-Headers'] = "Authorization";

    var obj = {};

    obj.post = function(method, param) {

      return $http.post(API.API_URL + method, (param ? param : new Object())).then(function(results, status, headers) {
        return results;
      }, function(results, status, headers) {

        return results;
      });

    };

    /**
     * [ObtenerContacto obtiene un contacto especifico]
     * @param {[int]} idContacto [identificador del contacto]
     */
    obj.ObtenerContacto = function(idContacto) {

      return $http.get(API.API_URL + "contacts/" + idContacto).then(function(results, status, headers) {
        var ret = {};
         ret.contacto = results.data.data;
        return ret;
      }, function(results, status, headers) {
        return results;
      });

    };

    obj.BorrarContacto = function(idContacto) {
      return $http.delete(API.API_URL + "contacts/" + idContacto).then(function(results, status, headers) {
        var ret = {};
         if (status == 200) {
           ret.msg = results.message;
         }
        return ret;
      }, function(results, status, headers) {
        return results;
      });

    };
    /**
   * [ObtenerContactos obtiene la lista de contactos]
   * @param {[object]} params [parametros de consulta: obejto  con la estructura: { start: value,
   * limit: value,
   * order_direction: value,
   * order_field: value,
   * query: value, 
   * type: value 
   * }]
   */
    obj.ObtenerContactos = function(params) {
      var paramString = "?metadata=true&";
      if (typeof params != undefined) {
        for ( const prop in params) {
         paramString +=  `${prop}=${params[prop]}&`;
        }
      }
      const regex = /[&]$/g;
      paramString = paramString.replace(regex,'');
      
      return $http.get(API.API_URL + "contacts" + paramString).then(function(results, status, headers) {
         var ret = {};
         ret.contactos = results.data.data;
         ret.total = results.data.metadata.total;
        return ret;
      }, function(results, status, headers) {
        return results;
      });

    };
    return obj;
  }

})();
