(function() {

    'use strict';

    angular
        .module('ourstay')
        .directive('perfectCard', perfectCard);

    perfectCard.$inject = ['NavService', 'PropertyService'];

    /**
     * Perfect Card directive, seen in any recommendation results list
     * @returns {{templateUrl: string}}
     */
    function perfectCard(NavService, PropertyService) {

        var controller = ['$scope', function($scope) {

            $scope.slickConfig = {
                arrows: !Modernizr.touch,
                draggable: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                touchMove: true
            };

        }];

        return {
            scope: {
                propertyId: '=',
                slot: '=',
                cardIndex: '='

            },
            templateUrl: '/templates/recommendation/perfect-card.html',
            controller: controller
        }
    }

})();
