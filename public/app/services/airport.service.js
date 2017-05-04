
(function() {
  'use strict';

  angular
    .module('airport')
    .service('AirportService', AirportService);

  AirportService.$inject = ['$http'];

  function AirportService($http) {

    var vm = this;

    vm.getPlanes = getPlanes;
    vm.getZipInfo = getZipInfo;



    function getPlanes() {

      return $http.get('../data/airplane.json');

    }

    function getZipInfo(zip) {

      return $http.get('/zip', {params : {'zip' : zip} });

    }



  }

})();
