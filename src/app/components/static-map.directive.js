(function() {

    'use strict';

    /**
     * @desc Feed it an address or lat,lng, get back a nice static map image
     * @example <static-map-img location="40.3333, -122.21212" width="500" height="300"></static-map-img>
     */
    angular
        .module('ourstay')
        .directive('staticMapImg', staticMapImg);

    staticMapImg.$inject = ['$compile'];

    function staticMapImg($compile) {

        return {
            replace: true,
            restrict: 'EA',
            link: function($scope, $elem, $attrs) {

                $attrs.$observe('location', function(value) {
                    if (value) {
                        var isRetina = (
                            window.devicePixelRatio > 1 ||
                            (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
                        );
                        var scale = isRetina === true ? 2 : 1;
                        var newElem = angular.element(
                            '<img ng-src="//maps.googleapis.com/maps/api/staticmap?markers='+value+'&zoom=14&scale='+scale+'&size='+$attrs.width+'x'+$attrs.height +'" />'
                        );
                        var $e = $compile(newElem)($scope);
                        $elem.replaceWith($e);
                    }
                });
            }
        };
    }

})();
