(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = [
        'ConfigService',
        'APIService',
        'NavService',
        'GeoLocationService',
        'ThemeService',
        '$location',
        '$http'
    ];

    /**
    * @class
    * @desc Primary controller for landing page
    * @param {ConfigService} ConfigService Holder of global values
    * @param {APIService} APIService
    * @param {NavService} NavService
    * @memberOf Controllers
    */
    function WelcomeController(ConfigService, APIService, NavService, GeoLocationService, ThemeService, $location, $http) {
        var vm = this;
        vm.fsProperties = [];
        vm.properties = [
          {
              name : 'Miami',
              id : ConfigService.MIAMI_ID,
              imageUrl : "/static/images/logo-hyatt-centric-miami-home_2x.png",
              bgUrl : window.devicePixelRatio > 1 ? "/static/images/hyatt-miami_2x.jpg" : "/static/images/hyatt-miami_2x.jpg"
          },
          {
              name : 'Chicago',
              id : ConfigService.CHICAGO_ID,
              imageUrl : "/static/images/logo-hyatt-centric-chicago-home_2x.png",
              bgUrl : window.devicePixelRatio > 1 ? "/static/images/hyatt-chicago_2x.jpg" : "/static/images/hyatt-chicago_2x.jpg"
          },
        ];

        vm.onClick = onClick;

        vm.onChange = function(selected) {
            $location.path('/property/' + selected.propertyid + '/explore');
        };

        initialize();

        function onClick(propertyId) {
          NavService.goTo(NavService.sections.EXPLORE, {
              propertyId: propertyId
          });
          ThemeService.setTheme(propertyId);
        }

        /**
        * Starts up all necessary components and is triggered on instantiation
        */
        function initialize() {
            // Set the default theme on welcome page
            ThemeService.setTheme();

            // Get list of all properties
            APIService.fetchPropertiesByBrand(1)
                .then(function(resp) {
                    vm.fsProperties = resp;
                });

            //GeoLocationService.calculateDurationToPoint("33.987094,-118.449324", [
            //    "34.024626, -118.445634",
            //    "34.027009, -118.404692"
            //], "driving")
            //    .then(function(resp) {
            //        console.log(resp);
            //    });
            //console.log("WelcomeController initialize()");
            //APIService.search(3, "italian")
            //.then(function successCallback(resp) {
            //    console.dir(resp);
            //    vm.recommendations = resp;
            //})
        }
    }

})();
