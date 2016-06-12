(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('RecommendationController', RecommendationController);

    RecommendationController.$inject = [
        '$scope',
        'mode',
        '_',
        'ConfigService',
        'APIService',
        '$location',
        '$routeParams',
        'GeoLocationService',
        'PropertyService',
        '$timeout',
        '$interval',
        'NavService'
    ];

    /**
     * @class
     * @desc Primary controller for landing page
     * @param {$scope} $scope
     * @param {mode} mode
     * @param _ lodash
     * @param {ConfigService} ConfigService Holder of global values
     * @param {APIService} APIService
     * @param {$location} $location
     * @param {$routeParams} $routeParams
     * @param {GeoLocationService} GeoLocationService
     * @memberOf Controllers
     */
    function RecommendationController($scope, mode, _, ConfigService, APIService, $location, $routeParams,
                                      GeoLocationService, PropertyService, $timeout, $interval, NavService) {
        var vm = this;
        var trackingId = null;
        var currentPosition = null;
        var hasBeenRecentlyCalled = false;
        var hasBeenRecentlyCalledPromise = null;
        var bindCategoryPromise = null;

        vm.firstLoad = true;
        vm.hasMoreAvailable = true;
        vm.isLocalistaVisible = false;
        vm.recommendations = [];
        vm.propertyId = null;
        vm.categoryId = null;
        vm.isLoading = true;
        vm.searchPage = false;
        vm.localista = null;
        vm.searchResults = false;
        vm.currentCategory = null;
        vm.propertyServiceWatchId = null;

        vm.durations = {
            walking: [],
            driving: []
        };

        vm.currentPage = 1;
        vm.getNext = getNext;

        $scope.$on("$destroy", function(event) {
            if (trackingId) {
                GeoLocationService.removeListener(trackingId);
                trackingId = null;
            }

            if (vm.propertyServiceWatchId !== null) {
                PropertyService.removeListener(vm.propertyServiceWatchId);
            }

            if (bindCategoryPromise) {
                $interval.cancel(bindCategoryPromise);
            }

        });

        vm.goToLocalista = function(localistaId) {
            NavService.goTo(NavService.sections.FEATURED_CONCIERGE, {
                propertyId: vm.propertyId,
                localistaId: localistaId
            });
        };

        function _delayedReset() {
            $timeout.cancel(hasBeenRecentlyCalledPromise);
            hasBeenRecentlyCalledPromise = $timeout(function() {
                hasBeenRecentlyCalled = false;
            }, 2000);
        }

        vm.navigateToExplore = function() {
            NavService.goTo(NavService.sections.EXPLORE, {
                propertyId: vm.propertyId
            });
        };

        // Make sure property stuff is present
        // First, try to get it manually, then just sniff through events
        var activeProperty = PropertyService.activeProperty();
        if (activeProperty !== null) {
            if (activeProperty.id !== null && typeof activeProperty.id !== 'undefined') {
                initialize();
            }
        } else {
            vm.propertyServiceWatchId = PropertyService.addListener(function(resp) {
                PropertyService.removeListener(vm.propertyServiceWatchId);
                initialize();
            });
        }


        /**
         * Iterates currentPage and loads recommendations
         */
        function getNext() {

            // Hack for nearby not returning nextpage property
            if (!vm.hasMoreAvailable && mode !== 'nearby') {
                return;
            }

            if (hasBeenRecentlyCalled || vm.isLoading) {
            } else {

                hasBeenRecentlyCalled = true;

                switch(mode) {
                    case "nearby":
                        if (currentPosition !== null) {
                            getNearbyByPage(vm.propertyId, currentPosition.lat, currentPosition.lng, (vm.currentPage + 1));
                        }
                        break;
                    case "featured-explorer":
                        getRecommendationsByPage(vm.propertyId, null, (vm.currentPage + 1), vm.localistaId);
                        break;
                    case "here-for-a-day":
                        // Ignore, no pagination
                        break;
                    case "search":
                        // Ignore, no pagination
                        break;
                    default:
                        getRecommendationsByPage(vm.propertyId, vm.categoryId, (vm.currentPage + 1));
                }

                _delayedReset();
            }
        }

        /**
         * Shortcut method for getting recs by page
         * @param {number} propertyId
         * @param {number} categoryId
         * @param {number} page
         */
        function getNearbyByPage(propertyId, lat, lng, page) {
            vm.isLoading = true;
            APIService.nearby(propertyId, lat, lng, page)
                .then(function(resp) {

                    if (resp.results.length < 1) {

                    } else {
                        vm.currentPage = page;
                        vm.hasMoreAvailable = resp.hasMore;
                        pushAndShowDurations(resp.results);
                    }

                    vm.isLoading = false;
                });
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
                        } else if (mode === "driving")  {
                            rec.drivingMinutesValue = (modeDuration.duration / 60);
                            rec.drivingMinutes = modeDuration.durationLabel;
                        }
                    }

                })

        }

        function pushAndShowDurations(recs) {
            // This start and end index is necessary since there's no way to match an id to
            // a duration... hackery at it's finest -Seb
            var startIndex = null;
            var endIndex = null;

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

        /**
         * Shortcut method for getting recs by page
         * @param {number} propertyId
         * @param {number} categoryId
         * @param {number} page
         */
        function getRecommendationsByPage(propertyId, categoryId, page, localistaId) {

            localistaId = (typeof localistaId === 'undefined' || localistaId === null) ? null : localistaId;

            vm.isLoading = true;

            var recPromiseHandler = function(resp) {

                if (resp.results.length < 1) {

                } else {
                    vm.currentPage = page;
                    vm.hasMoreAvailable = resp.hasMore;
                    pushAndShowDurations(resp.results);
                }

                vm.isLoading = false;
            };

            if (localistaId !== null) {
                APIService.fetchLocalistaRecommendations(propertyId, localistaId, page)
                    .then(recPromiseHandler);
            } else {
                APIService.fetchRecommendationsByCategoryId(propertyId, categoryId, page)
                    .then(recPromiseHandler);
            }
        }

        function forceGetPosition() {

            if (currentPosition === null) {

                if (GeoLocationService.getCurrentPosition() !== null) {
                    currentPosition = GeoLocationService.getCurrentPosition();

                    GeoLocationService.removeListener(trackingId);
                    getNearbyByPage(vm.propertyId, currentPosition.lat, currentPosition.lng, vm.currentPage);
                } else {
                    $timeout(function() {
                        forceGetPosition();
                    }, 1500);
                }
            }
        }

        /**
         * Starts up all necessary components and is triggered on instantiation
         */
        function initialize() {


            vm.propertyId = $routeParams.propertyId;
            vm.localistaId = $routeParams.localistaId;
            vm.categoryId = $location.search().category;
            vm.title = $location.search().title;

            // Let's figure out what state we are in

            if (mode === 'featured-explorer') {
                getRecommendationsByPage(vm.propertyId, null, vm.currentPage, vm.localistaId);
                vm.localistaPage = true;
                vm.title = null;

                var locPromiseHandler = function(resp){
                    vm.title = resp.localista.firstName + " Featured Recommendations";
                };

                APIService.getLocalistaForPropertyId(vm.propertyId, vm.localistaId)
                    .then(locPromiseHandler);


            } else if (mode === 'search') {

                var q = $location.search().query;
                vm.title = "Search Results: " + q;
                vm.searchPage = true;
                APIService.search(vm.propertyId, q)
                    .then(function(resp) {

                        pushAndShowDurations(resp);
                        if (vm.recommendations.length > 0)
                            vm.searchResults = true;

                        vm.isLoading = false;

                    })
            } else if (mode === 'here-for-a-day') {

                vm.isLoading = true;
                vm.searchPage = false;

                // First get localista
                if (typeof vm.localistaId === 'undefined') {
                    vm.localistaId = ConfigService.PROPERTY_TO_LOCALISTA_MAP[vm.propertyId];
                }
                APIService.getLocalistaSummaryForPropertyId(vm.propertyId)
                    .then(function(resp) {
                        vm.localista = resp.localista;
                        APIService.fetchFeaturedByPropertyId(vm.propertyId)
                            .then(function(resp) {
                                vm.isLocalistaVisible = true;
                                vm.isLoading = false;
                                pushAndShowDurations(resp);
                            });
                    });


            } else if (mode === 'nearby') {

                vm.searchPage = false;

                if (trackingId === null) {
                    // Tracking not active, turn it on, listen for address, then stop when you have one
                    trackingId = GeoLocationService.addListener(function(newPosition) {
                        GeoLocationService.removeListener(trackingId);
                        currentPosition = newPosition;

                        getNearbyByPage(vm.propertyId, currentPosition.lat, currentPosition.lng, vm.currentPage);

                    });
                }


                GeoLocationService.enableLocationServices();

                // Let's wait for the position
                forceGetPosition();

            } else {
                getRecommendationsByPage(vm.propertyId, vm.categoryId, vm.currentPage);
            }

            function printCategoryInfo(cat) {
                if (cat) {
                    vm.pageTitle = cat.name;
                    vm.pageDescription = cat.description;
                    $interval.cancel(bindCategoryPromise);
                }
            }

            // Just try right away
            printCategoryInfo(PropertyService.getCategoryById(vm.categoryId));

            bindCategoryPromise = $interval(function() {
                var cat = PropertyService.getCategoryById(vm.categoryId);
                printCategoryInfo(cat);
            }, 1000);

            // Get property details to display name
            APIService.getPropertyById(vm.propertyId)
                .then(function (resp) {
                    vm.property = resp;
                    vm.propertyUrl = {};
                });
            // TODO replace with property.city
            vm.getPropertyLink = function() {
                if (!_.isEmpty(vm.property)) {
                    var slug = vm.property.shortenedSlug;
                    return "http://www.fourseasons.com/" + slug;
                } else {
                    return "http://www.fourseasons.com/";
                }
            };

        }
    }

})();
