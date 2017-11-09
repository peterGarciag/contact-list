Lista de Contactos
==============

Lista de contactos consumiendo el API de alegra

## Para  ejecutar el proyecto
verificar que esten instalados los paquetes nesesarios

```bash
$ npm install -g ionic cordova
```

clonar el repositorio

```bash
git  clone https://github.com/peterGarciag/contact-list.git
```
instalar  dependencias  npm y bower

```bash
npm i &&  bower install
```

crear el archivo app.constant.js que contiene la URL y llave  del api en  src/js
el archvio debe tener la siguiente estructura


```javascript
(function() {
    'use strict';  
angular.module('main.constants', [])
.constant('API', 
    {
        API_URL: 'url del api',
        TOKEN: 'token de acceso',
        USER: 'nombre de usuario'
        
    }
);
})();

```





compilar 

```bash
gulp ionic:build:before
```

ejecutar el proyecto

```bash
ionic serve  -cs
```


