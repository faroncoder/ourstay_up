(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('FeaturedExplorerController', FeaturedExplorerController);

    FeaturedExplorerController.$inject = ['ConfigService', 'APIService', 'GeoLocationService', '$location', '$routeParams'];

    /**
     * @class
     * @desc Handles showing list of categories for given propertyID
     * @param {ConfigService} ConfigService Holder of global values
     * @memberOf Controllers
     */
    function FeaturedExplorerController(ConfigService, APIService, GeoLocationService, $location, $routeParams) {
        var vm = this;
        vm.localista = null;
        vm.recommendations = [];
        vm.moreRecosLink = null;
        vm.durations = {
            walking: [],
            driving: []
        };

        initialize();

        /**
         * Starts up all necessary components and is triggered on instantiation
         */
        function initialize() {

            vm.propertyId = $routeParams.propertyId;
            vm.localistaId = $routeParams.localistaId;
            vm.moreRecosLink = "/property/" + vm.propertyId + "/featured-concierge/" + vm.localistaId + "/recommendations/";
            vm.isLoading = true;

            // Makes call to get localista recommendations
            APIService.getLocalistaForPropertyId(vm.propertyId, vm.localistaId)
                .then(function(resp) {
                    console.log("localista resp:", resp);
                    vm.localista = resp.localista;
                    vm.slots = resp.slots;
                    vm.isLoading = false;

                });

        }

        function pushAndShowDurations(recs) {

            // This start and end index is necessary since there's no way to match an id to
            // a duration... hackery at it's finest -Seb
            var startIndex = null;
            var endIndex = null;

            if (!recs) {
                return;
            }

            if (vm.firstLoad) {
                vm.firstLoad = false;
            }

            for (var i = 0; i < recs.length; i++) {
                var newLength = vm.recommendations.push(recs[i]);
                var recIndex = newLength - 1;

                // Set start
                if (startIndex === null) {
                    startIndex = recIndex;
                }

                endIndex = recIndex;
            }

            // Get durations
            getDurationsForRecommendations(recs, startIndex, endIndex, "driving");
            getDurationsForRecommendations(recs, startIndex, endIndex, "walking");
        }

        function getDurationsForRecommendations(recs, startIndex, endIndex, mode) {
            var destinationLatLngs = _.map(recs, function(r) {
                if (r.lat === null || r.lng === null) {
                    return null;
                } else {
                    return r.lat + "," + r.lng
                }
            });

            GeoLocationService.calculateDurationToPoint(destinationLatLngs, mode)
                .then(function(resp) {

                    // Dump the results into our holder of indexes
                    for (var i = 0; i < resp.length; i++) {
                        vm.durations[mode][startIndex + i] = resp[i];
                    }

                    // Now update each rec card with new durations
                    for (var k = 0; k < vm.recommendations.length; k++) {

                        var rec = vm.recommendations[k];
                        var modeDuration = vm.durations[mode][k];

                        // I hate that this is DRY --Seb
                        rec.startPointLabel = modeDuration.startPointLabel;

                        // Inject into rec
                        rec.maxWalkingMinutes = ConfigService.MAX_WALKING_MINUTES;

                        if (mode === "walking") {
                            rec.walkingMinutesValue = (modeDuration.duration / 60);
                            rec.walkingMinutes = modeDuration.durationLabel;
                        } else if (mode === "driving") {
                            rec.drivingMinutesValue = (modeDuration.duration / 60);
                            rec.drivingMinutes = modeDuration.durationLabel;
                        }
                    }

                });

        }


    }

})();
