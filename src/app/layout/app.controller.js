(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('AppController', AppController);

    AppController.$inject = [
        '$scope',
        'PubSubService',
        '$location',
        'ConfigService'
    ];

    /**
     * @class
     * @desc Primary app controller
     * @memberOf Controllers
     */
    function AppController($scope, PubSubService, $location, ConfigService) {

        var vm = this;
        vm.metaUrl = $location.absUrl();
        vm.metaTitle = ConfigService.SITE_NAME;
        vm.metaDesc  = ConfigService.SITE_DESCRIPTION;
        vm.metaImgUrl = null;
        vm.isBrowserModern = true;

        initialize();

        $scope.$on("$destroy", function(event) {
            PubSubService.unsubscribe(metaTagChangeListener);
        });

        function metaTagChangeListener(msg) {
            if (msg.action === 'metaTagsChange') {

                if (msg.data.hasOwnProperty('title')) {
                    vm.metaTitle = msg.data.title;
                }

                if (msg.data.hasOwnProperty('description')) {
                    vm.metaDesc = msg.data.description;
                }

                if (msg.data.hasOwnProperty('url')) {
                    vm.metaUrl = msg.data.url;
                }

                if (msg.data.hasOwnProperty('imageUrl')) {
                    vm.metaImgUrl = msg.data.imageUrl;
                }
            }
        }

        function initialize() {

            var ua = detect.parse(navigator.userAgent);

            console.log(ua.browser.family);

            if (ua.browser.family === "IE" && ua.browser.major < 10) {
                vm.isBrowserModern = true;
            }

            PubSubService.subscribe(metaTagChangeListener);
        }

    }

})();
