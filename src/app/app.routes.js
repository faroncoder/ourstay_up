(function() {

    'use strict';

    angular
        .module('ourstay')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                title: 'Home',
                templateUrl: '/templates/welcome/welcome.html',
                controller: 'WelcomeController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'nearby';}
                }
            })

            .when('/property/:propertyId/near-me/', {
                title : 'Near Me',
                templateUrl: '/templates/recommendation/list.html',
                controller: 'RecommendationController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'nearby';}
                }
            })

            .when('/property/:propertyId/search/', {
                title: 'Search',
                templateUrl: '/templates/recommendation/list.html',
                controller: 'RecommendationController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'search';}
                }
            })

            .when('/property/:propertyId/recommendations/', {
                title: 'Recommendations',
                templateUrl: '/templates/recommendation/list.html',
                controller: 'RecommendationController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'list';}
                }
            })

            .when('/property/:propertyId/recommendations/:recommendationId/', {
                title: 'Detail',
                templateUrl: '/templates/recommendation/detail.html',
                controller: 'RecommendationDetailController',
                controllerAs: 'vm'
            })

            .when('/property/:propertyId/featured-concierge/:localistaId/', {
                title: 'Featured Concierge',
                templateUrl: '/templates/property/featured-explorer.html',
                controller: 'FeaturedExplorerController',
                controllerAs: 'vm'
            })

            .when('/property/:propertyId/featured-concierge/:localistaId/recommendations/', {
                title : 'Recommendations',
                templateUrl: '/templates/recommendation/list.html',
                controller: 'RecommendationController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'featured-explorer';}
                }
            })

            .when('/property/:propertyId/explore/', {
                title: 'Moods',
                templateUrl: '/templates/explore/list.html',
                controller: 'ExploreController',
                controllerAs: 'vm'
            })
            .when('/property/:propertyId/featured-recommendations/', {
                title: 'Featured Recommendations',
                templateUrl: '/templates/recommendation/list.html',
                controller: 'RecommendationController',
                controllerAs: 'vm',
                resolve: {
                    mode: function() {return 'here-for-a-day';}
                }
            })

            .when('/privacy-policy/', {
                title: 'Privacy Policy',
                templateUrl: '/templates/static/privacy-policy.html'
            })

            .when('/terms-and-conditions/', {
                title: 'Terms and Conditions',
                templateUrl: '/templates/static/terms.html'
            })

            .when('/cookie-statement/', {
                title: 'Cookie Statement',
                templateUrl: '/templates/static/cookie-statement.html'
            })

            .when('/security-and-safety/', {
                title: 'Safety and Security',
                templateUrl: '/templates/static/security.html'
            })

            .when('/404/', {
                title: 'Page Not Found',
                templateUrl: '/templates/errors/404.html'
            })

            .otherwise({
                redirectTo: '/404/'
            });
    }

})();
