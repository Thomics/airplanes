
(function() {
  'use strict';

  angular
    .module('airport')
    .service('AirportService', AirportService);

  AirportService.$inject = ['$http', '$route'];

  function AirportService($http, $route) {

    var vm = this;

    vm.getPlanes = getPlanes;
    vm.getPlaneData = getPlaneData;
    vm.getLocationInfo = getLocationInfo;


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


    function getPlaneData() {

      return $http.get('/planeData');

    }





  }

})();
