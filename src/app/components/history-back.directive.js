(function() {

    'use strict';

    /**
     * @desc Feed it an address or lat,lng, get back a nice static map image
     * @example <static-map-img location="40.3333, -122.21212" width="500" height="300"></static-map-img>
     */
    angular
        .module('ourstay')
        .directive('ourBackButton', ourBackButton);

    ourBackButton.$inject = ['$window'];

    function ourBackButton($window) {

        // function controller($scope) {
        //     $scope.click = function(e) {
        //         $window.history.back();
        //     };
        // }
        //
        // return {
        //     replace: true,
        //     restrict: 'EA',
        //     controller: controller,
        //     template: '<a href ng-click="click()">&lt; Back</a>'
        // };


        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }

})();
