
(function() {
  'use strict';

  angular
    .module('airport')
    .service('AirportService', AirportService);

  AirportService.$inject = ['$http', '$route'];

  function AirportService($http, $route) {

    var vm = this;

    vm.getPlanes = getPlanes;
    vm.getLocationInfo = getLocationInfo;
    vm.reloadRoute = reloadRoute;



    function getPlanes() {

      return $http.get('/home');

    }


    function getLocationInfo(zip) {

      var config = {
        params: {
          zip: zip
        }
      };

      return $http.get('/zip', config);

    }


    function reloadRoute() {
      setTimeout(function(){
        $route.reload();
      }, 300);
    }


  }

})();
