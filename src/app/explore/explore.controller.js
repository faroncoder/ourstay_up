(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('ExploreController', ExploreController);



    ExploreController.$inject = [
        'ConfigService',
        'APIService',
        '$routeParams',
        'NavService'
    ];

    /**
     * @class
     * @desc Controller for explore section
     * @param {ConfigService} ConfigService Holder of global values
     * @param {APIService} APIService
     * @param {$routeParams} $routeParams
     * @memberOf Controllers
     */
    function ExploreController(ConfigService, APIService, $routeParams, NavService) {
        // TODO To add localista tile back in, change first pattern to 'sinister in all gridPatterns 5 and up'
        var gridPatterns = [];
        gridPatterns[2] = ['libra'];
        gridPatterns[3] = ['libra', 'libra'];
        gridPatterns[4] = ['libra', 'libra'];
        gridPatterns[5] = ['libra', 'libra'];
        gridPatterns[6] = ['libra', 'dexter'];
        gridPatterns[7] = ['libra', 'libra', 'libra'];
        gridPatterns[8] = ['libra', 'libra', 'dexter'];
        gridPatterns[9] = ['libra', 'dexter', 'libra'];
        gridPatterns[10] = ['libra', 'libra', 'libra', 'dexter'];
        gridPatterns[11] = ['libra', 'libra', 'dexter', 'sinister'];
        gridPatterns[12] = ['libra', 'libra', 'libra', 'dexter', 'libra'];
        gridPatterns[13] = ['libra', 'libra', 'dexter', 'libra', 'sinister'];
        gridPatterns[14] = ['libra', 'libra', 'libra', 'dexter', 'libra', 'libra'];
        gridPatterns[15] = ['libra', 'libra', 'libra', 'dexter', 'libra', 'sinister'];
        gridPatterns[16] = ['libra', 'libra', 'dexter', 'sinister', 'libra', 'dexter'];
        gridPatterns[17] = ['libra', 'libra', 'libra', 'dexter', 'libra', 'sinister', 'libra'];
        gridPatterns[18] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'dexter'];
        gridPatterns[19] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'dexter', 'libra'];
        gridPatterns[20] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'libra', 'dexter'];
        gridPatterns[21] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'dexter', 'sinister'];
        gridPatterns[22] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'libra', 'dexter', 'libra'];
        gridPatterns[23] = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'dexter', 'libra', 'sinister'];
        var largeGridPattern = ['libra', 'libra', 'libra', 'dexter', 'sinister', 'libra', 'libra', 'dexter', 'libra', 'libra'];

        for (var i = 24; i <= 50; i++) {
            gridPatterns[i] = largeGridPattern;
        }

        var vm = this;
        vm.categories = [];
        vm.rowPattern = [];
        vm.isLoadingCategories = true;
        vm.propertyId = null;
        vm.localista = null;

        vm.sinister = [];
        vm.libra = [];
        vm.dexter = [];

        initialize();

        vm.goToLocalista = function(localistaId) {
            NavService.goTo(NavService.sections.FEATURED_CONCIERGE, {
                propertyId: vm.propertyId,
                localistaId: localistaId
            });
        };

        // Remove before launch
        function sadFaceFunction() {

            var positiveKey = null;

            for (var key in vm.categories) {
                if (vm.categories[key].name.toLowerCase() == "meet our featured explorer") {
                    positiveKey = key;
                }
            }

            if (positiveKey !== null) {
                vm.categories.splice(positiveKey, 1);
            }
        }

        function buildGrid() {

            var numCategories = vm.categories.length;
            if (vm.localista)
                numCategories++;
            vm.rowPattern = gridPatterns[numCategories];
            var numrows = vm.rowPattern.length;
            var index = 0;
            for (var i = 0; i < numrows; i++) {
                switch (vm.rowPattern[i]) {
                    case 'sinister':
                        //here we account for localista added in the first position
                        if ( (vm.localista) && (0==i) ){
                            vm.sinister[0] = [null,vm.categories[0],vm.categories[1]];
                            index = 2;
                        } else{
                            vm.sinister[i] = vm.categories.slice(index, index + 3);
                            vm.libra[i] = false;
                            vm.dexter[i] = false;
                            index = index + 3;
                        }
                        break;
                    case 'libra':
                        vm.sinister[i] = false;
                        vm.libra[i] = vm.categories.slice(index, index + 2);
                        vm.dexter[i] = false;
                        index = index + 2;
                        break;
                    case 'dexter':
                        vm.sinister[i] = false;
                        vm.libra[i] = false;
                        vm.dexter[i] = vm.categories.slice(index, index + 3);
                        index = index + 3;
                        break;
                }
            }
        }

        /**
         * Starts up all necessary components and is triggered on instantiation
         */
        function initialize() {

            vm.propertyId = $routeParams.propertyId;
            vm.property = {};

            if (typeof vm.propertyId === 'undefined' || vm.propertyId === 'undefined') {
                return;
            }

            // First get localista
            APIService.getLocalistaSummaryForPropertyId(vm.propertyId)
                .then(function(resp) {
                    vm.localista = resp.localista;

                    APIService.fetchCategoriesByPropertyId(vm.propertyId)
                        .then(function(resp) {
                            vm.isLoadingCategories = false;
                            vm.categories = angular.copy(resp);
                            sadFaceFunction();
                            buildGrid();
                        });
                });

            // Get property details to display name
            console.log("prop id from explore:", vm.propertyId);
            APIService.getPropertyById(vm.propertyId)
                .then(function (resp) {
                    vm.property = resp;
                    console.log("property obj", vm.property);
                });

            // Create link to fourseasons.com property page
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
