(function() {

    'use strict';

    /**
     * @desc Facilitate complex grid layouts
     * @example <libra>
     */
    angular
        .module('ourstay')
        .directive('libra', libra);

    function libra() {

        return {
            restrict: 'E',
            scope: {
                cats: '=',
                property: '='
            },
            templateUrl: '/templates/components/libra.html',
            link: function(scope, element, attrs) {
                //console.log('test', scope.cats)
            }
        };

    }

})();
