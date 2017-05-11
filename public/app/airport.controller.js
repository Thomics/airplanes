(function() {
  'use strict';

  angular
    .module('airport')
    .controller('AirportController', AirportController);

  AirportController.$inject = ['AirportService', '$interval', '$http'];

  function AirportController(AirportService, $interval, $http) {

    var vm = this;

    vm.getPlanes = getPlanes;
    vm.planeData;
    vm.planes;


    vm.lat = 0;

    activate();

    function activate() {

      //$interval(function() {
      //  console.log('aip');
        vm.getPlanes();
      //}, 5000);

    }




    function getPlanes() {

      AirportService.getPlanes()
        .success(function(data) {

          vm.planeData = data;
          //console.log(vm.planeData);

          getZipFile();
          displayPlanes(data);

        }).error(function(err){
          console.log(err);
        });

    }


    function getZipFile() {

      AirportService.getZipFile()
        .success(function(data) {

          console.log(data);

          //vm.planeData = data;
          //console.log(vm.planeData);

          //displayPlanes(data);

        }).error(function(err){
          console.log(err);
        });

    }




    function displayPlanes(data) {

      var displayedPlanes = [];

      console.log(AirportService.zip);


      for(var i = 0; i < data.states.length; i++) {

        if ( (data.states[i][6] > -947.5 && data.states[i][6] < 947.82) && (data.states[i][5] < -122 && data.states[i][5] > -122.55) ) {

          var mph = Math.floor(Number(data.states[i][9]) / 0.44704);
          var altitude = Math.floor(Number(data.states[i][7]) * 3.28084);
          var verticalRate = Math.floor(Number(data.states[i][11]) * 3.28084);
          var direction = getDirection(Number(data.states[i][10]));

          var planes = {
            lat: data.states[i][5],
            long: data.states[i][6],
            country: data.states[i][2],
            callsign: data.states[i][1] || 'NONE',
            velocity: mph,
            altitude: altitude,
            verticalRate: verticalRate,
            direction: direction
          };

          displayedPlanes.push(planes);


        }

      }

      //Find plane data http://flightaware.com/live/flight/#flightnumber

      vm.lat = 100;

      //console.log(displayedPlanes);
      vm.planeData = displayedPlanes;

    }


    function calculateUserData(data) {



    }


    function getDirection(deg) {
      if (deg >= 30 && deg <= 60) {
        return 'North-East';
      } else if (deg > 60 && deg < 120) {
        return 'East';
      } else if (deg >= 120 && deg <= 150) {
        return 'South-East'
      } else if (deg > 150 && deg < 210) {
        return 'South';
      } else if (deg >= 210 && deg <= 240) {
        return 'South-West';
      } else if (deg > 240 && deg < 300) {
        return 'West';
      } else if (deg >= 300 && deg <= 330) {
        return 'North-West';
      } else if (deg > 330 || deg < 30) {
        return 'North';
      } else {
        return 'N/A';
      }
    }




  }


})();
