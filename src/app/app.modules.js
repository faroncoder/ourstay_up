(function() {

    'use strict';

    angular.module('ourstay', [

            /*
             * Angular modules
             */
            'ngAnimate',
            'ngSanitize',
            'ngRoute',
            'slickCarousel',
            'pageslide-directive'

        ])
        .filter('phonefilter', function() {
            return function(string) {
                if (!angular.isString(string)) {
                    return string;
                }
                return string.replace(/[\s]/g, '');
            };
        })
        .config(['$httpProvider', '$compileProvider', function($httpProvider, $compileProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|sms):/);
        }]);

})();
