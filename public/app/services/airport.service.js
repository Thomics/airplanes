
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
    vm.zip = 98133;
    vm.lat;
    vm.long;



    function getPlanes() {

      return $http.get('/home');

    }


    function getLocationInfo() {

      return $http.get('/zip');

    }



  }

})();
