
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
    vm.getZipFile = getZipFile;
    vm.zip = 98133;



    function getPlanes() {

      return $http.get('/home');

    }


    //function getPlanes() {
    //
    //  return $http.get('../data/airplane.json');
    //
    //}

    function getZipInfo(zip) {

      vm.zip = zip || 98133;

      console.log(vm.zip);

      return $http.get('/zip', {params : {'zip' : zip} });

    }

    function getZipFile() {

      return $http.get('../data/zipInfo.json');

    }



  }

})();
