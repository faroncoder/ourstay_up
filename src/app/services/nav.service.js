(function() {

    'use strict';

    angular
        .module('ourstay')
        .factory('NavService', NavService);

    NavService.$inject = ['$location', 'ConfigService'];


    /**
     * @namespace NavService
     * @desc Easy nav manager
     */
    function NavService($location, ConfigService) {

        var sections = {
            WELCOME: 'welcome',
            EXPLORE: 'explore',
            RECOMMENDATION_DETAIL: 'recommendation_detail',
            RECOMMENDATION_LIST: 'recommendation_list',
            SEARCH: 'search',
            NEARBY: 'nearby',
            HERE_FOR_A_DAY: 'here_for_a_day',
            FEATURED_CONCIERGE: 'featured_concierge'
        };

        var _sections = {
            'welcome': '/',
            'explore': '/property/##propertyId##/explore/',
            'recommendation_list': '/property/##propertyId##/recommendations/',
            'search': '/property/##propertyId##/search/',
            'recommendation_detail': '/property/##propertyId##/recommendations/##recommendationId##/',
            'nearby': '/property/##propertyId##/nearby/',
            'here_for_a_day': '/property/##propertyId##/here-for-a-day/',
            'featured_concierge': '/property/##propertyId##/featured-concierge/##localistaId##/'
        };

        /**
         * Converts section with provided variables
         * @param section Target section (see sections)
         * @param params Object where key represents substring to be replaced in section URL
         * @param search Optional query params, like "?category=3&something=asdfasdf"
         */
        var goTo = function(section, params, search) {
            if (section in _sections) {
                var p = _sections[section];
                for (var key in params) {
                    p = p.replace('##' + key + '##', params[key]);
                }

                if (typeof search === 'undefined') {
                    // Force clearing of search params if none provided
                    $location.path(p).search({});
                } else {
                    $location.path(p).search(search);
                }
            }
        };

        return {
            goTo : goTo,
            sections: sections
        }
    }

})();
