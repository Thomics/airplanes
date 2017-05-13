(function() {
  'use strict';

  angular
    .module('airport')
    .controller('ZipController', ZipController);

  ZipController.$inject = ['AirportService'];

  function ZipController(AirportService) {

    var vm = this;

    vm.getLocationInfo = getLocationInfo;
    vm.zipInfo = 98133;
    vm.radius = 1;




    function getLocationInfo(zip, radius) {

      vm.zipInfo = zip || 98133;
      console.log(vm.zipInfo);
      vm.radius = Number(radius) || 1;



      AirportService.getLocationInfo()
        .success(function(data) {

          if ( isNaN(data.lat) ) {
            console.log('Zip Broke!');
          }

          AirportService.lat = data.lat;
          AirportService.long = data.long;



          DisplayPlaneService.displayPlanes(DisplayPlaneService.planeData);

        }).error(function(err) {
          console.log(err);
        });

    }

  }

})();
