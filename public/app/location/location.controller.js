(function() {
  'use strict';

  angular
    .module('airport')
    .controller('ZipController', ZipController);

  ZipController.$inject = ['AirportService', '$location'];

  function ZipController(AirportService, $location) {

    var vm = this;

    vm.getLocationInfo = getLocationInfo;
    vm.zipInfo = 98133;
    vm.radius = 1;




    function getLocationInfo(zip, radius) {

      vm.zipInfo = zip || 98133;
      vm.radius = radius || 1;

      console.log(zip);
      console.log(radius);


      AirportService.getLocationInfo()
        .success(function(data) {

          if ( isNaN(data.lat) ) {
            console.log('Zip Broke!');
          }

          AirportService.lat = data.lat;
          AirportService.long = data.long;


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