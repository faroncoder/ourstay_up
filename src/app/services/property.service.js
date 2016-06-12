(function () {

    'use strict';
    angular
        .module('ourstay')
        .factory('PropertyService', PropertyService);

    PropertyService.$inject = ['_', 'APIService', 'GeoLocationService'];

    /**
     * @namespace PropertyService
     * @desc Handles retrieving additional property information
     */
    function PropertyService(_, APIService, GeoLocationService) {

        var _subscribers = [];
        var _currentPropertyId = null;
        var _categories = [];
        var _property = null;

        function _notify() {
            angular.forEach(_subscribers, function (cb) {
                cb(_categories);
            });
        }

        return {

            activeProperty: function () {
                return _property;
            },
            getCategories: function () {
                return _categories;
            },

            getCategoryById: function (id) {
                for (var key in _categories) {
                    if (_categories[key].id === parseInt(id)) {
                        return _categories[key];
                    }
                }

                return null;
            },

            addListener: function (cb) {
                var length = _subscribers.push(cb);
                return (length - 1);
            },


            /**
             * Removes listener
             * @param {number} id Targeted callback to remove
             * @memberOf PropertyService
             */
            removeListener: function (id) {
                if (id in _subscribers) {
                    delete _subscribers[id];
                }
            },

            loadData: function (propertyId) {
                if (_currentPropertyId !== propertyId) {

                    _currentPropertyId = propertyId;

                    APIService.getPropertyById(_currentPropertyId)
                        .then(function (resp) {
                            _property = resp;

                            // Let GeoLocationService know that property is set
                            GeoLocationService.setPropertyLocation(resp.lat, resp.lng);

                            APIService.fetchCategoriesByPropertyId(_currentPropertyId)
                                .then(function (resp) {
                                    _categories = resp;
                                    _notify();
                                });
                        });

                } else {
                    _notify();
                }
            }
        };
    }

})();
