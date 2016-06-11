(function() {

    'use strict';

    /**
    * @desc Generic, re-usable grid for recommendations
    * @example <recommendation-grid></recommendation-grid>
    */
    angular
        .module('ourstay')
        .directive('recommendationGrid', recommendationGrid);

    function recommendationGrid() {
        var directive = {
            link: link,
            templateUrl: 'todo',
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          /* todo */
        }
    }

})();
