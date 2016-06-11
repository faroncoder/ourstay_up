(function() {
    'use strict';

      angular
          .module('ourstay')
          .factory('PubSubService', PubSubService);

      PubSubService.$inject = ['$location', 'ConfigService'];

    /**
     * @namespace PubSubService
     * @desc Simple PubSub helper service. Kiss $scope.$watch goodbye!
     * @usage PubSubService.publish({action: 'setTheme'});
     *        PubSubService.subscribe(callbackToTranslateMessage);
     */
    function PubSubService() {

        var listeners = [];

        function subscribe(callback) {
            listeners.push(callback);
        }

        function unsubscribe(callback) {
            var index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }

        function publish(message) {
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](message);
            }
        }

        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            publish: publish
        };
    }

})();
