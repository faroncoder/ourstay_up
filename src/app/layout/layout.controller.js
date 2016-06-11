(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = [
        '$scope',
        '$route',
        '$routeParams',
        'ThemeService',
        'PubSubService'
    ];

    /**
    * @class
    * @desc Global controller
    * @param {$scope} $scope
    * @param {$routeParams} $routeParams Used to get URL params
    * @memberOf Controllers
    */
    function LayoutController($scope, $route, $routeParams, ThemeService, PubSubService) {

        var vm = this;

        initialize();

        /**
        * Subscribed to ThemeController changes
        */
        PubSubService.subscribe(themeChangeListener);
        function themeChangeListener(pubMessage) {
            if (pubMessage.action === 'setTheme') {
                $scope.logo = ThemeService.theme.logo;
            }
        }


        /**
        * Starts up all necessary components and is triggered on instantiation
        */
        function initialize() {
            $scope.$on('$routeChangeSuccess', function(next, current) {
                // if page is deeplinked or reloaded, set the theme based on URL
                if (!ThemeService.theme.isSet ) {
                    ThemeService.setTheme($routeParams.propertyId);
                }
            });
        }
    }

})();
