(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('RecommendationDetailController', RecommendationDetailController);

    RecommendationDetailController.$inject = [
        '$scope',
        '_',
        'ConfigService',
        'APIService',
        '$location',
        '$anchorScroll',
        '$routeParams',
        'PropertyService',
        'GeoLocationService',
        'PubSubService',
        '$filter'
    ];


    /**
     * @class
     * @desc Controller for handling detail view of recommendation
     * @param {ConfigService} ConfigService Holder of global values
     * @memberOf Controllers
     */
    function RecommendationDetailController($scope, _, ConfigService, APIService, $location, $anchorScroll, $routeParams,
                                            PropertyService, GeoLocationService, PubSubService, $filter) {
        var vm = this;
        var listenerId = null;
        vm.propertyId = null;
        vm.recommendationId = null;
        vm.recommendation = null;
        vm.fullyLoadedCategories = [];
        vm.isLoading = false;
        vm.days = {
            MON: 2,
            TUE: 3,
            WED: 4,
            THU: 5,
            FRI: 6,
            SAT: 7,
            SUN: 1
        };

        vm.dayStringMap = {};
        vm.dayStringMap[vm.days.MON] = "Mon";
        vm.dayStringMap[vm.days.TUE] = "Tues";
        vm.dayStringMap[vm.days.WED] = "Wed";
        vm.dayStringMap[vm.days.THU] = "Thurs";
        vm.dayStringMap[vm.days.FRI] = "Fri";
        vm.dayStringMap[vm.days.SAT] = "Sat";
        vm.dayStringMap[vm.days.SUN] = "Sun";

        vm.slickConfig = {
            method: {},
            dots: true,
            speed: 300,
            lazyLoad: 'ondemand',
            draggable: false,
            arrows: true,
            slidesToShow: 1,
            touchMove: true,
            infinite: true
        };

        $scope.modalShown = false;

        $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
        };

        $scope.$on("$destroy", function(event) {
            if (listenerId) {
                PropertyService.removeListener(listenerId);
            }
        });

        initialize();

        // This is DRY... :( This is also functionally identical to a block in RecommendationController
        // Fix this --Seb
        function calculateDuration(mode) {

            var destinationLatLngs = [
                vm.recommendation.lat + "," + vm.recommendation.lng
            ];

            GeoLocationService.calculateDurationToPoint(destinationLatLngs, mode)
                .then(function(resp) {

                    vm.recommendation.startPointLabel = resp[0].startPointLabel;

                    vm.recommendation.maxWalkingMinutes = ConfigService.MAX_WALKING_MINUTES;

                    if (mode === 'driving') {
                        vm.recommendation.drivingMinutesValue = (resp[0].duration / 60);
                        vm.recommendation.drivingMinutes = resp[0].durationLabel;
                    } else {
                        vm.recommendation.walkingMinutesValue = (resp[0].duration / 60);
                        vm.recommendation.walkingMinutes = resp[0].durationLabel;
                    }
                })
        }

        /**
         * Looks for and listens to property categories updated
         */
        function loadCategories() {
            if (vm.recommendation && vm.recommendation.relatedCategories.length > 0) {
                if (PropertyService.categories && PropertyService.categories.length !== 0) {
                    vm.fullyLoadedCategories = angular.copy(PropertyService.categories);

                    // Now that we have categories, kill the listener
                    PropertyService.removeListener(listenerId);
                } else {

                }
            }
        }

        vm.getCallIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/call.png';
        };

        vm.getCallHoverIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/call_hover.png';
        };


        vm.getShareIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/share.png';
        };

        vm.getShareHoverIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/share_hover.png';
        };


        vm.getWebsiteIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/website.png';
        };

        vm.getWebsiteHoverIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/website_hover.png';
        };


        vm.getDirectionsIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/directions.png';
        };

        vm.getDirectionsHoverIcon = function() {
          return '/static/images/locations/' + vm.propertyId + '/directions_hover.png';
        };


        vm.getDirectionsLink = function() {
            if (vm.recommendation) {
                var address = vm.recommendation.street1 + " " + vm.recommendation.city + ", " + vm.recommendation.state + " " + vm.recommendation.postalCode;
                return "https://www.google.com/maps/place/" + encodeURIComponent(address.trim());
            } else {
                return "https://maps.google.com";
            }
        };

        vm.getDesc = function() {
            return vm.recommendation.description[0] || "A great spot"
        };

        vm.getUrl = function() {
            return $location.absUrl();
        };

        vm.getHoursString = function(dayAsInt, phase) {

            var start, end;
            var targetDay = null;

            for (var i = 0; i < vm.recommendation.operatingHours.length; i++) {
                if (vm.recommendation.operatingHours[i].dayOfWeek === dayAsInt){
                    targetDay = vm.recommendation.operatingHours[i];
                }
            }

            if (targetDay === null) {
                return "";
            }

            // Check if closed
            if ((phase === 'day' || typeof phase === 'undefined') && targetDay.closed) {
                return "closed";
            } else if (targetDay.closed) {
                return "";
            }

            if (phase === 'day' || typeof phase === 'undefined') {
                start = $filter('date')(targetDay.openTimeDay, 'h:mma');
                end = $filter('date')(targetDay.closeTimeDay, 'h:mma');
            } else {
                start = $filter('date')(targetDay.openTimeNight, 'h:mma');
                end = $filter('date')(targetDay.closeTimeNight, 'h:mma');
            }

            if (start !== null && end !== null) {
                return start + " - " + end;
            } else {
                return "";
            }
        };

        // Checks if a park or something that doesn't have hours
        vm.hasOperatingHours = function() {

            if (vm.recommendation === null || typeof vm.recommendation === 'undefined') {
                return false;
            }

            var hasOperatingHours = true;
            var count = 1;
            for (var i = 0; i < vm.recommendation.operatingHours.length; i++) {
                var currentDay = vm.recommendation.operatingHours[i];
                if (currentDay.openTimeDay === null &&
                    currentDay.closeTimeDay === null &&
                    currentDay.openTimeNight === null &&
                    currentDay.closeTimeNight === null &&
                    currentDay.closed === false) {
                    count += 1;
                }
            }

            if (count >= 7) {
                hasOperatingHours = false;
            }

            return hasOperatingHours;
        };

        vm.isOpenOn = function(dayAsInt) {
            if (vm.recommendation === null || typeof vm.recommendation === 'undefined') {
                return false;
            } else {
                for (var i = 0; i < vm.recommendation.operatingHours.length; i++) {
                    if (vm.recommendation.operatingHours[i].dayOfWeek === dayAsInt){
                        return true;
                    }
                }
            }
            return false;
        };

        vm.gotoLocalista = function() {
            $location.hash('localista');
            $anchorScroll();
        };

        vm.onPropertyCategoriesRetrieved = function(categories) {

            vm.fullyLoadedCategories = categories;

            // Now that we have categories, kill the listener
            PropertyService.removeListener(listenerId);
        };


        /**
         * Starts up all necessary components and is triggered on instantiation
         */
        function initialize() {
            vm.propertyId = $routeParams.propertyId;
            vm.recommendationId = $routeParams.recommendationId;
            vm.currentDay = new Date().getDay() + 1;

            if (vm.propertyId == 288) {
                vm.exploreUrl =  "http://guide.hyattcentric.com/TheLoopChicago";
            } else {
                vm.exploreUrl =  "http://guide.hyattcentric.com/SouthBeachMiami";
            }

            vm.allHours = false;

            vm.toggleAllHours = function() {
                vm.allHours = !vm.allHours;
            };

            listenerId = PropertyService.addListener(function(categories) {
                vm.onPropertyCategoriesRetrieved(categories);
            });

            vm.isLoading = true;

            APIService.getRecommendationById(vm.propertyId, vm.recommendationId)
                .then(function(resp) {

                    //console.log('recco response: ', resp);

                    if( resp.meetTheTypeId == 141){
                        vm.localistaUrl = "/property/" + vm.propertyId + "/featured-explorer/" + ConfigService.PROPERTY_TO_LOCALISTA_MAP[vm.propertyId] + "/";
                    }

                    if (typeof resp !== 'undefined') {
                        vm.isLoading = false;
                        vm.recommendation = resp;

                        // Set Meta tags
                        var msg = {
                            action: "metaTagsChange",
                            data: {
                                title: vm.recommendation.name,
                                description: vm.recommendation.shortDescription,
                                url: $location.absUrl(),
                                imageUrl: vm.recommendation.primaryImageUrl
                            }
                        };

                        PubSubService.publish(msg);


                        if (3 == vm.recommendation.localistaRecommendations.length)
                            vm.recommendation.localistaRecommendations = vm.recommendation.localistaRecommendations.slice(0,2);
                        vm.recommendation.location = resp.lat + "," + resp.lng;
                        vm.images = [resp.images.map(function(images) {
                            return images.thumb;
                        })];

                        calculateDuration("driving");
                        calculateDuration("walking");

                        loadCategories();
                    }
                });
        }
    }

})();
