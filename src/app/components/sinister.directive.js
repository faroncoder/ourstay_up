(function() {

    'use strict';

    /**
     * @desc Facilitate complex grid layouts
     * @example <sinister>
     */
    angular
        .module('ourstay')
        .directive('sinister', sinister);

    function sinister() {

        return {
            restrict: 'E',
            scope: {
                cats: '=',
                property: '=',
                localista: '=',
                rownumber: '='
            },
            templateUrl: '/templates/components/sinister.html',
            link: function(scope, element, attrs) {
                //console.log('test', scope.cats)
            }
        };

    }

})();
