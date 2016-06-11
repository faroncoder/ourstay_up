(function() {


    'use strict';

    angular
        .module('ourstay')
        .directive('smartImage', smartImage);

    function smartImage() {
        return {
            restrict: 'A',
            scope: {
                callback: '&'
            },
            link: function($scope, $element, attrs){
                $element.on('load', function() {
                    $scope.callback();
                });
            }
        }
    }

})();