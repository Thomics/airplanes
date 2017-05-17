(function() {
  'use strict';

  angular
    .module('airport')
    .controller('AirportController', AirportController);

  AirportController.$inject = ['AirportService', '$scope'];

  function AirportController(AirportService, $scope) {

    var vm = this;

    vm.planeData = [];
    vm.displayPlanes = displayPlanes;
    vm.getPlanes = getPlanes;
    vm.getLocationInfo = getLocationInfo;
    vm.radius = 1; //That is one mile in lat/long.
    vm.userLat = 47.755653; //Default value
    vm.userLong = -122.341515; //Default value
    vm.zip = 98133;


    activate();


    ////////////////////////////////////////////
    ////////////////////////////////////////////

    function activate() {

        vm.getPlanes();

    }



     function getPlanes() {

      AirportService.getPlanes()
        .success(function(data) {

          vm.displayPlanes(data);

        }).error(function(err){
          console.log(err);
        });

    }




    function displayPlanes(data) {

      var displayedPlanes = [];

      //var radius = Number(AirportService.radius  * 0.013766) || 1;

      console.log(data);
      console.log(vm.radius);


      for(var i = 0; i < data.states.length; i++) {

        var planeLat = Number(data.states[i][6]);
        var planeLong = Number(data.states[i][5]);


        //If the plane is within the longitude and latitude based on the radius selected by the user,
        //we will display the planes information.
        if ( ((vm.userLong > (planeLong - vm.radius)) &&  (vm.userLong < (planeLong + vm.radius)))
               && ((vm.userLat > (planeLat - vm.radius)) && (vm.userLat < (planeLat + vm.radius))) ) {

          var mph = Math.floor(Number(data.states[i][9]) / 0.44704);
          var altitude = Math.floor(Number(data.states[i][7]) * 3.28084);
          var verticalRate = Math.floor(Number(data.states[i][11]) * 3.28084);
          var direction = getDirection(Number(data.states[i][10]));

          var planes = {
            lat: planeLat,
            long: planeLong,
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

      displayedPlanes.push({lat:100, long:100, country: 'usa', callsign: 'hi', velocity: 'velocity', altitude:100, verticalRate:100, direction: 'n'});

      console.log(displayedPlanes);
      vm.planeData = displayedPlanes;

    }


    function getLocationInfo(zip, radius) {

      console.log(zip);

      vm.zip = zip;
      vm.radius = Number(radius *  0.013766) || 0.013766;

      AirportService.getLocationInfo(zip)
        .success(function(data) {


          //@todo add better error catching.
          if ( isNaN(data.lat) ) {
            console.log('Zip Broke!');
          }

          console.log(data);


          vm.userLat = Number(data.lat);
          vm.userLong = Number(data.lng);

          vm.getPlanes();
          $scope.$apply();

        }).error(function(err) {
          console.log(err);
        });

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
