(function() {
  'use strict';

  angular
    .module('airport')
    .controller('AirportController', AirportController);

  AirportController.$inject = ['AirportService'];

  function AirportController(AirportService) {

    var vm = this;

    vm.getPlanes = getPlanes;
    vm.planeData;
    vm.planes;


    vm.lat = 0;

    activate();

    function activate() {

      vm.getPlanes();

    }


    function getPlanes() {

      AirportService.getPlanes()
        .success(function(data) {

          vm.planeData = data;
          //console.log(vm.planeData);

          displayPlanes(data);

        }).error(function(err){
          console.log(err);
        });

    }


    function displayPlanes(data) {
      var displayedPlanes = [];


      for(var i = 0; i < data.states.length; i++) {

        if ( (data.states[i][6] > 47.5 && data.states[i][6] < 47.82) && (data.states[i][5] < -122 && data.states[i][5] > -122.55) ) {
          var planes = {
            lat: data.states[i][5],
            long: data.states[i][6],
            country: data.states[i][2],
            callsign: data.states[i][1],
            velocity: data.states[i][9],
            altitude: data.states[i][7],
            verticalRate: data.states[i][11]
          };

          displayedPlanes.push(planes);


        }

      }

      vm.lat = 100;

      console.log(displayedPlanes);
      vm.planeData = displayedPlanes;

    }


  }


})();
