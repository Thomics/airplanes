
(function() {
  'use strict';

  angular
    .module('airport')
    .service('AirportService', AirportService);

  AirportService.$inject = ['$http'];

  function AirportService($http) {

    var vm = this;

    vm.getPlanes = getPlanes;
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


  }

})();
