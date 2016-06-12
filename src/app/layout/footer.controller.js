(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('FooterController', FooterController);

    FooterController.$inject = [
        '$scope',
        '$routeParams'
    ];

    /**
    * @class
    * @desc Primary navigation
    * @param {$scope} $scope
    * @param {$routeParams} $routeParams Used to get URL params
    * @param {NavService} NavService
    * @param {PropertyService} PropertyService
    * @param {GeoLocationService} GeoLocationService Handles acquiring lat/lng of user
    * @memberOf Controllers
    */
    function FooterController($scope, $routeParams) {

        var vm = this;
        vm.propertyId = undefined;
        vm.logo = undefined;
        initialize();

       /*
        * Starts up all necessary components and is triggered on instantiation
        */
        function initialize() {
            $scope.$on('$routeChangeSuccess', function(next, current) {
                vm.propertyId = $routeParams.propertyId;
            });
        }
        vm.isPropertyIdSet = function() {
            return (typeof $routeParams.propertyId !== 'undefined');
        };


    }



})();
