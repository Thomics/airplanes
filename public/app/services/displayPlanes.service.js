//
//(function() {
//  'use strict';
//
//  angular
//    .module('airport')
//    .service('DisplayPlaneService', DisplayPlaneService);
//
//  DisplayPlaneService.$inject = ['$http', 'AirportService'];
//
//  function DisplayPlaneService($http, AirportService) {
//
//    var vm = this;
//
//    vm.planeData = [];
//    vm.locationLat = AirportService.lat;
//    vm.locationLong = AirportService.long;
//    vm.displayPlanes = displayPlanes;
//
//
//    function displayPlanes(data) {
//
//      console.log(data);
//
//      var displayedPlanes = [];
//
//      var zip = AirportService.zip;
//      var radius = (Number(AirportService.radius)  * 0.013766) || 100;
//
//      console.log(radius);
//
//      for(var i = 0; i < data.states.length; i++) {
//
//        var planeLat = data.states[i][5];
//        var planeLong = data.states[i][6];
//
//
//        //If the plane is within the longitude and latitude based on the radius selected by the user,
//        //we will display the planes information.
//
//        console.log(planeLat);
//        console.log(planeLong);
//        console.log(vm.locationLat);
//        console.log(vm.locationLong);
//
//
//        if ( (vm.locationLong > (planeLong - radius) && planeLong < (planeLong + radius) )
//          && (planeLat < (vm.locationLat - radius) && planeLat > (vm.locationLat - radius) ) ) {
//
//          var mph = Math.floor(Number(data.states[i][9]) / 0.44704);
//          var altitude = Math.floor(Number(data.states[i][7]) * 3.28084);
//          var verticalRate = Math.floor(Number(data.states[i][11]) * 3.28084);
//          var direction = getDirection(Number(data.states[i][10]));
//
//          var planes = {
//
//            lat: planeLat,
//            long: planeLong,
//            country: data.states[i][2],
//            callsign: data.states[i][1] || 'NONE',
//            velocity: mph,
//            altitude: altitude,
//            verticalRate: verticalRate,
//            direction: direction
//
//          };
//
//          displayedPlanes.push(planes);
//
//
//        }
//
//      }
//
//      console.log(displayedPlanes);
//      vm.planeData = displayedPlanes;
//
//    }
//
//
//
//    function getDirection(deg) {
//      if (deg >= 30 && deg <= 60) {
//        return 'North-East';
//      } else if (deg > 60 && deg < 120) {
//        return 'East';
//      } else if (deg >= 120 && deg <= 150) {
//        return 'South-East'
//      } else if (deg > 150 && deg < 210) {
//        return 'South';
//      } else if (deg >= 210 && deg <= 240) {
//        return 'South-West';
//      } else if (deg > 240 && deg < 300) {
//        return 'West';
//      } else if (deg >= 300 && deg <= 330) {
//        return 'North-West';
//      } else if (deg > 330 || deg < 30) {
//        return 'North';
//      } else {
//        return 'N/A';
//      }
//    }
//
//
//  }
//
//})();
