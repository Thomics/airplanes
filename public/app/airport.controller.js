(function() {
  'use strict';

  angular
    .module('airport')
    .controller('AirportController', AirportController);

  AirportController.$inject = ['AirportService', '$scope'];

  function AirportController(AirportService, $scope) {

    var vm = this;

    vm.displayPlanes = displayPlanes;
    vm.getLocationInfo = getLocationInfo;
    vm.getPlanes = getPlanes;
    vm.getPlaneData = getPlaneData;
    vm.loading = false;
    vm.miles;
    vm.planeData;
    vm.radius = 0.013766; //That is one mile in lat/long.
    vm.userLat = 47.755653; //Default value
    vm.userLong = -122.341515; //Default value
    vm.zipInfo;


    activate();


    ////////////////////////////////////////////
    ////////////////////////////////////////////

    function activate() {

        vm.getPlanes();

        //vm.getPlaneData();
    }



     function getPlanes() {

      AirportService.getPlanes()
        .success(function(data) {

          vm.loading = true;
          vm.displayPlanes(data);


        }).error(function(err){
          console.log(err);
        });

    }


    //Scrape PlaneFinder for more information about the flight.
    function getPlaneData(callsign) {

      AirportService.getPlaneData(callsign)
        .success(function(data) {

          console.log(data);



          //Takes the array of strings returned from scraping planefinder and extracts the relevant information.
          var planeArr = data.planeArr;
          var destination = planeArr[0];
          var airData = planeArr[1].split(' ');

          var aircraft = airData.slice(airData.indexOf('Aircraft') + 1,airData.indexOf('Airline')).join(' ');

          var airline = airData.slice(airData.indexOf('Airline')+1,airData.indexOf('Journey')).join(' ');
          var time = airData.slice(airData.length - 3, airData.length - 1).join(' ');
          airData = planeArr[3].split(' ');
          var serviceType = airData.slice(1, airData.indexOf('Seats')).join(' ');
          var seats = airData.slice(airData.indexOf('Seats')+1, airData.indexOf('Seats') + 2).join(' ');


          //Find the object from the planedata associated with the callsign, add the fields to the object.
          vm.planeData.filter(function( obj ) {
            if (obj.callsign === callsign) {
              obj.destination = destination;
              obj.aircraft = aircraft;
              obj.airline = airline;
              obj.time = time;
              obj.serviceType = serviceType;
              obj.seats = seats;
            }
          });

        }).error(function(err){
          console.log(err);
        });

    }




    function displayPlanes(data) {

      var displayedPlanes = [];

      vm.radius = Number(vm.miles) * 0.013766 || 0.013766;
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
          getPlaneData(planes.callsign);



        }

      }


      console.log(vm.loading);

      console.log(displayedPlanes);
      vm.planeData = displayedPlanes;
      vm.loading = false;

    }


    function getLocationInfo(zip, miles) {

      vm.loading = true;
      console.log(zip);

      vm.zipInfo = zip || 98133;
      vm.radius = Number(miles *  0.013766) || 0.013766;

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
