(function () {

    'use strict';

    angular
        .module('ourstay')
        .directive('exploreCard', exploreCard);

    exploreCard.$inject = [
        '$location',
        'NavService',
        'APIService',
        '$timeout',
        '$window'
    ];

    function exploreCard($location, NavService, APIService, $timeout, $window) {

        var FPO_IMAGE = '/static/images/imageHolder.png';

        var controller = ['$scope', function($scope) {
            $scope.hasFirstImageLoaded = false;
            $scope.isTouch = Modernizr.touch;
            $scope.recsLoaded = true;
            $scope.subTitle = "Meet Our Featured Concierge"; // Default for localista tiles
            $scope.currentIndex = 0;
            $scope.currentTitle = null;
            $scope.hasLoadBeenTriggered = false;
            $scope.isLoading = false;
            $scope.recommendations = [];
            $scope.slickConfig = {
               method: {},
                speed: 300,
                lazyLoad: 'ondemand',
                //autoplay: true,
                fade: true,
                infinite: true,
                mobileFirst: true,
                // slidesToScroll: 3,
                 swipeToSlide: true,
                // touchThreshold: 5,
                //draggable: false,
                arrows: false,
                // slidesToShow: 1,
                 touchMove: true,
                event: {

                    init: function (event, slick) {

                    },

                    swipe: function() {

                        $scope.triggerFirstLoad();
                    },

                    beforeChange: function(event, slick) {


                        event.stopImmediatePropagation();

                    },

                    afterChange: function(event, slick, currentSlide, nextSlide) {

                        $scope.currentIndex = currentSlide;

                        $scope.redrawTitleFromRecIndex($scope.currentIndex);
                    }
                }
            };

            $scope.onRecsLoaded = function() {
                $scope.recsLoaded = true;

                $scope.slickConfig.enabled = true;

                $timeout(function() {
                    $scope.isLoading = false;
                }, 50);

            };

            $scope.onImageLoad = function(index) {
                if (index === 0 && !$scope.hasFirstImageLoaded) {
                    $timeout(function() {
                        $scope.hasFirstImageLoaded = true;
                    }, 50 * index);
                }
            };

            $scope.refreshCarouselImages = function(resp) {
                // Pop off category image
                var temp = $scope.carouselImages.shift();

                // Create holder cells for recs
                for (var k = 0; k < resp.length - 1; k++) {
                    $scope.carouselImages.push(FPO_IMAGE);
                }

                // Set holder image urls to real urls
                for (var i = 0; i < resp.length; i++) {
                    var rec = resp[i];
                    $scope.carouselImages[i] = rec.primaryImageUrl;
                }

                // Re-add category image to end
                $scope.carouselImages.push(temp);
            };

            $scope.triggerFirstLoad = function() {

                if (!$scope.hasLoadBeenTriggered) {

                    $scope.slickConfig.enabled = false;
                    $scope.slickConfig["arrows"] = !Modernizr.touch;

                    // Fake the slide change
                    $scope.currentIndex = 1;

                    $scope.hasLoadBeenTriggered = true;
                    $scope.isLoading = true;
                    $scope.recsLoaded = false;

                    if ($scope.localista) {

                        // set recs
                        APIService.fetchLocalistaRecommendations($scope.propertyId, $scope.localista.id)
                            .then(function(resp) {

                                if (resp.results.length > 0) {
                                    $scope.recommendations = resp.results;
                                    $scope.onRecsLoaded();
                                    $scope.refreshCarouselImages(resp.results);
                                }
                            })

                    } else {
                        APIService.fetchRecommendationsByCategoryId($scope.propertyId, $scope.category.id)
                            .then(function(resp) {

                                // Check if there are items
                                if (resp.results.length > 0) {
                                    $scope.recommendations = resp.results;
                                    $scope.onRecsLoaded();
                                    $scope.refreshCarouselImages(resp.results);
                                }

                                $scope.onRecsLoaded();
                            });
                    }
                }

            };

            // This changes the card title depending on if it's on main image or rec image
            $scope.redrawTitleFromRecIndex = function(index) {

                if (index < $scope.recommendations.length) {
                    $scope.currentTitle = $scope.recommendations[index].name;
                    $scope.subTitle = null;
                } else {
                    if ($scope.localista) {
                        $scope.subTitle = "Meet Our Featured Concierge";
                        $scope.currentTitle = $scope.localista.firstName + " " + $scope.localista.lastName;
                    } else {
                        $scope.currentTitle = angular.copy($scope.category.name);
                    }
                }
            };

            // Bind to the rec array and update title if it changes, then unwatch
            $scope.unbindRecWatch = $scope.$watch('recommendations', function(newVal, oldVal) {
                if (newVal.length > 0) {
                    $scope.redrawTitleFromRecIndex(parseInt($scope.currentIndex - 1));
                    $scope.unbindRecWatch();
                }
            });


            $scope.getTitleByIndex = function(index) {
                if (index < $scope.recommendations.length) {
                   return $scope.recommendations[index].name;
                } else {
                   return angular.copy($scope.category.name);
                }
            };

            $scope.click = function(index) {

                // If no images are loaded and it's first slide go to category
                // OR if images are loaded and it's _last_ slide, go to category
                if ((index == 0 && $scope.recommendations.length == 0) ||
                    ($scope.recommendations.length > 0 && index == $scope.recommendations.length)) {

                    // Check if Localista
                    if ($scope.localista) {
                        NavService.goTo(NavService.sections.FEATURED_EXPLORER, {
                            propertyId: $scope.propertyId,
                            localistaId: $scope.localista.id
                        });
                    } else {
                        NavService.goTo(NavService.sections.RECOMMENDATION_LIST, {
                            propertyId: $scope.propertyId
                        }, {
                            category: $scope.category.id,
                            title: $scope.category.name
                        });
                    }
                }

                // Otherwise, if it's any slide and images are loaded, go to recommendation
                if (index >= 0 && $scope.recommendations.length > 0) {
                    var rec = $scope.recommendations[index];

                    NavService.goTo(NavService.sections.RECOMMENDATION_DETAIL, {
                        recommendationId: rec.id,
                        propertyId: $scope.propertyId
                    });
                }
            };

            function initialize() {

                PointerEventsPolyfill.initialize({});

                // Set title
                if (typeof $scope.localista !== 'undefined') {
                    $scope.currentTitle = $scope.localista.firstName;

                    // Default stuff the imageUrl into the images array
                    $scope.carouselImages = [
                        $scope.localista.primaryImageUrl,
                        FPO_IMAGE
                    ];

                } else {
                    $scope.currentTitle = angular.copy($scope.category.name);
                    // Default stuff the imageUrl into the images array
                    $scope.carouselImages = [
                        // Hack until retina is fixed --Seb
                        $scope.category.retinaImageUrl,
                        FPO_IMAGE
                    ];
                }

                $window.dispatchEvent(new CustomEvent('resize'));
            };


            initialize();
        }];

        return {
            scope: {
                propertyId: '=propertyId',
                localista: '=localista',
                category: '=category',
                gridId: '@gridId'
            },
            controller: controller,
            replace: true,
            templateUrl: '/templates/explore/explore-card.html'

        };
    }

})();
