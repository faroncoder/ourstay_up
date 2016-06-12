(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('FeaturedRecommendationController', FeaturedRecommendationController);

    FeaturedRecommendationController.$inject = ['ConfigService', 'APIService', '$location', '$routeParams'];

    /**
    * @class
    * @desc Handles showing list of categories for given propertyID
    * @param {ConfigService} ConfigService Holder of global values
    * @memberOf Controllers
    */
    function FeaturedRecommendationController(ConfigService, APIService, $location, $routeParams) {
        var vm = this;
        vm.localista = null;

        initialize();

        /**
         * Starts up all necessary components and is triggered on instantiation
         */
        function initialize() {

            vm.propertyId = $routeParams.propertyId;
            vm.localistaId = $routeParams.localistaId;
            vm.categoryId = $location.search().category;
            vm.title = $location.search().title;
            vm.moreRecosLink ="/property/"+vm.propertyId+"/featured-concierge-recommendations/"+vm.localistaId+"/";


            APIService.getLocalistaForPropertyId(vm.propertyId, vm.localistaId)
                .then(function(resp) {
                    vm.localista = resp;
                })

        }
    }

})();
