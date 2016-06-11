(function() {


    'use strict';

    angular
        .module('ourstay')
        .directive('fadeIn', fadeIn);

    fadeIn.$inject = [
        '$timeout'
    ];

    function fadeIn($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $element, attrs){
                $element.addClass("ng-hide-remove");
                $element.on('load', function() {
                    $element.addClass("ng-hide-add");
                });
            }
        }
    }

})();