(function() {

    'use strict';

    /**
     * @desc Wraps content in infinite scroll aware container
     * @example <div infinite-scroll-container="functionToCall()">Some stuff here</div>
     */
    angular
        .module('ourstay')
        .directive('infiniteScrollContainer', infiniteScrollContainer);

    infiniteScrollContainer.$inject = ['$window', '$document'];

    function infiniteScrollContainer($window, $document) {

        return {
            restrict: 'A',

            link: function($scope, $elem, $attrs) {
                var raw = $elem[0];
                angular.element($window).on('scroll', function(e) {
                    var docElement = angular.element($document)[0].documentElement;
                    var winElement = angular.element($window)[0];

                    if ((docElement.scrollHeight - winElement.innerHeight) == winElement.pageYOffset) {
                        $scope.$apply($attrs.infiniteScrollContainer);
                    }
                })
            }
        };
    }

})();
