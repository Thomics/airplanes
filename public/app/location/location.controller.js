(function() {
  'use strict';

  angular
    .module('airport')
    .controller('ZipController', ZipController);

  ZipController.$inject = ['AirportService', '$location'];

  function ZipController(AirportService, $location) {

    var vm = this;

    vm.getZipInfo = getZipInfo;
    vm.zipInfo = 98133;
    vm.radiusOptions = [];



    function getZipInfo(zip) {

      vm.zipInfo = zip;

      console.log(zip);


      $location.url('/zip');

      AirportService.getZipInfo(vm.zipInfo)
        .success(function(data) {
          console.log(data);

        }).error(function(err) {
          console.log(err);

        });
    }

    function createRadiusOptions(size) {
      size = size || 2;
      var radius = [];
      for (var i = 1; i < size; i++) {
        radius.push(i);
      }
      return radius;

    }


  }

})();