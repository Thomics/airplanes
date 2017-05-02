(function() {
  'use strict';

  angular
    .module('airport')
    .controller('AirportController', AirportController);

  AirportController.$inject = [];

  function AirportController() {

    var vm = this;

    vm.radiusOptions = [];



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