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
      var states = [];

      for(var i = 0; i < data.states.length; i++) {

        //if (data.states[i][2] === 'United States' ) {
        //  states.push(data.states[i]);
        //}


        if ( (data.states[i][6] > 47.5 && data.states[i][6] < 47.82) && (data.states[i][5] < -122 && data.states[i][5] > -122.55) ) {
          states.push(data.states[i]);

        }
        //[6] lat 47.5/47.82
        //[5]long -122.5/122.2

      }

      console.log(states);

    }


  }


})();
