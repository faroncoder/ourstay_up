(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('NavController', NavController);

    NavController.$inject = [
        '$window',
        '$scope',
        'ConfigService',
        '$route',
        '$routeParams',
        '$location',
        'GeoLocationService',
        'NavService',
        'PropertyService',
        'ThemeService',
        'PubSubService',
        '$document',
        'APIService'
    ];

    /**
    * @class
    * @desc Primary navigation
    * @param {$scope} $scope
    * @param {ConfigService} ConfigService Holder of global values
    * @param {$routeParams} $routeParams Used to get URL params
    * @param {NavService} NavService
    * @param {PropertyService} PropertyService
    * @param {GeoLocationService} GeoLocationService Handles acquiring lat/lng of user
    * @memberOf Controllers
    */
    function NavController($window, $scope, ConfigService, $route, $routeParams, $location, GeoLocationService, NavService, PropertyService,
                           ThemeService, PubSubService, $document, APIService) {

        var vm = this;
        vm.currentPosition = null;
        vm.sectionTitle = 'OurStay';
        vm.propertyId = undefined;
        vm.search = search;
        vm.toggleMenu = toggleMenu;
        vm.checked = false;
        vm.showMobileLogo = true;
        vm.showMobileTitle = false;
        vm.localistaId = null;

        initialize();

        /**
        * Subscribed to ThemeController changes
        */
        // PubSubService.subscribe(themeChangeListener);
        // function themeChangeListener(pubMessage) {
        //     if (pubMessage.action === 'setTheme') {
        //         vm.logo = ThemeService.theme.logo;
        //     }
        // }F

        function search(event, query) {
            event.preventDefault();
            NavService.goTo(NavService.sections.SEARCH, {
                propertyId: vm.propertyId
            }, {
                query: query
            });
        }
        function toggleMenu(query) {
            vm.checked = !vm.checked;
        }
        function closeMenu(){
            vm.checked = false;
        }
        function showHideTitle(title){

            var sections = ['Home', 'Detail', 'Featured Explorer'];

            if (sections.indexOf(title) != -1){
                vm.showMobileLogo = true;
                vm.showMobileTitle = false;
            } else{
                vm.showMobileLogo = false;
                vm.showMobileTitle = true;
            }
        }

        /**
        * Starts up all necessary components and is triggered on instantiation
        */
        function initialize() {

            $scope.$on('$routeChangeStart', function(next, current) {
                closeMenu();
            });

            $scope.$on('$routeChangeSuccess', function(next, current) {

                // Hardcoded localista values
                // if($routeParams.propertyId  == 286){
                //     vm.localistaId = 908;
                // } else if($routeParams.propertyId == 288){
                //     vm.localistaId = 907;
                // }


                // if page is deeplinked or reloaded, set the theme based on URL
                // if (!ThemeService.theme.isSet ) {
                //     ThemeService.setTheme($routeParams.propertyId);
                // }

                $window.scrollTo(0,0);

                vm.propertyId = $routeParams.propertyId;
                vm.searchQuery = null;
                closeMenu();

                // Get localista for Nav menu link
                if (vm.propertyId) {
                    APIService.getLocalistaSummaryForPropertyId(vm.propertyId)
                        .then(function(resp) {
                            vm.localista = resp.localista;
                            vm.localistaId = vm.localista.id;
                        });
                }


                if (location.pathname == '/') {
                    vm.property = {};
                    vm.property.name = "Four Seasons";
                } else {
                    // Get property details to display name
                    APIService.getPropertyById(vm.propertyId)
                        .then(function (resp) {
                            vm.property = resp;
                        });
                }

                showHideTitle($route.current.title);

                if (vm.propertyId) {
                    vm.sectionTitle = $route.current.title;
                    PropertyService.loadData(vm.propertyId);
                }

                // Send Omniture page tracking event
                // try {
                //     $window.utag.view({
                //         'event_name' : 'page view',
                //         'sc_page_title' : 'CentricCityGuide:' + $route.current.title,
                //         'page_url' : window.location.href,
                //         'site_id' : "hycentricguide"
                //     });
                // } catch(e) {}

            });

            // Listen for updated location
            GeoLocationService.addListener(function(position) {
                vm.onCurrentPositionUpdated(position);
            });

            // Enable location services
            GeoLocationService.enableLocationServices();
        }

        vm.navigateToHome = function() {
          if(vm.propertyId !== null && typeof vm.propertyId !== 'undefined') {
            NavService.goTo(NavService.sections.EXPLORE, {
              propertyId: vm.propertyId
            })
          } else {
            NavService.goTo(NavService.sections.WELCOME)
          }
        };

        /**
        Let's template know if property ID was set so we're not showing global nav options
        that require propertyId being set
        @function isPropertyIdSet
        @returns {boolean}
        @memberOf Controllers.NavController
        */
        vm.isPropertyIdSet = function() {
            return (typeof $routeParams.propertyId !== 'undefined');
        };

        vm.getLogo = function() {
          return "home";
        };

        vm.onCurrentPositionUpdated = function(position) {
            $scope.$apply(function() {
                vm.currentPosition = position;
            });
        };
    }

})();
