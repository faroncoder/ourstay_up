(function() {

    'use strict';

    /**
     * @desc Facilitate complex grid layouts
     * @example <dexter>
     */
    angular
        .module('ourstay')
        .directive('dexter', dexter);

    function dexter() {

        return {
            restrict: 'E',
            scope: {
                cats: '=',
                property: '='
            },
            templateUrl: '/templates/components/dexter.html',
            link: function(scope, element, attrs) {
                //console.log('test', scope.cats)
            }
        };

    }

})();
