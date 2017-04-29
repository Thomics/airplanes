'use strict';

/**
 * Searches for the zip code
 * @display
 **/


angular.module('airport')
  .directive('airportLocation', function(){
    return {
      templateUrl: 'app/location/location.html',
      controller: 'AirportController',
      controllerAs: 'airport'
    };
  });
