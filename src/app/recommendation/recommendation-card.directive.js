(function() {

    'use strict';

    angular
        .module('ourstay')
        .directive('recommendationCard', recommendationCard);

    recommendationCard.$inject = ['NavService', 'PropertyService', '$timeout'];

    /**
     * Recommendation Card directive, seen in any recommendation results list
     * @returns {{templateUrl: string}}
     */
    function recommendationCard(NavService, PropertyService, $timeout) {

        var controller = ['$scope', function($scope) {

            $scope.hasFirstImageLoaded = false;
            $scope.slickConfig = {
                arrows: !Modernizr.touch,
                draggable: false,
                infinite: true,
                lazyLoad: 'ondemand',
                //fade:true,
                speed: 300,
                //adaptiveHeight: true,
                slidesToShow: 1,
                touchMove: true
            };

            $scope.onImageLoad = function(index) {
                if (index === 0 && !$scope.hasFirstImageLoaded) {
                    $timeout(function() {
                        $scope.hasFirstImageLoaded = true;
                    }, 500 * index);
                }
            };

            $scope.loadRec = function(question) {

                NavService.goTo(NavService.sections.RECOMMENDATION_DETAIL, {
                    propertyId: $scope.propertyId,
                    recommendationId: $scope.recommendation.id
                })

            };

            function initialize() {
                PointerEventsPolyfill.initialize({});
            }

            initialize();

        }];

        return {
            scope: {
                propertyId: '=propertyId',
                recommendation: '=recommendation'
            },
            templateUrl: '/templates/recommendation/recommendation-card.html',
            controller: controller
        }
    }

})();
