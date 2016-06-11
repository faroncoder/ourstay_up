(function () {
    'use strict';
    angular
        .module('ourstay')
        .factory('GeoLocationService', GeoLocationService);

    GeoLocationService.$inject = ['_', '$q'];

    /**
     * @namespace GeoLocationService
     * @param {_} _ Lodash library
     * @param {$q} $q Angular defer library
     * @desc Handles the serializing and de-serializing of data from the OurStay API
     */
    function GeoLocationService(_, $q) {

        var isTracking = false;
        var watchId;
        var _currentPosition = null;
        var _subscribers = [];
        var _propertyLocation = null;
        var _metersFromProperty = null;

        var MAX_METERS_FROM_HOTEL = 50000;

        function _isUserClose() {
            if (_currentPosition === null && _metersFromProperty <= MAX_METERS_FROM_HOTEL) {
                return true;
            }

            return false;
        }

        function _calculateDurationToPoint(startPoint, locationPoints, mode, startPointLabel) {
            var deferred = $q.defer();

            if (startPoint === null) {
                deferred.reject("No start point provided");
            }

            if (mode !== "driving" && mode !== "walking") {
                deferred.reject("Not a viable mode");
            }


            var parsedMode = mode === "driving" ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING;
            var startPointLatLng = _pointToLatLng(startPoint);
            var locationPointLatLngs = _.map(locationPoints, _pointToLatLng);

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [startPointLatLng],
                    destinations: locationPointLatLngs,
                    travelMode: parsedMode
                }, callback);

            function callback(response, status) {
                // See Parsing the Results for
                // the basics of a callback function.
                //console.dir(response);
                deferred.resolve(DistanceAdaptor.init(response, mode, startPointLabel));
            }

            return deferred.promise;
        }

        function _calculateDistanceFromProperty() {
            // Make sure property location is set
            if (_propertyLocation !== null && !_.isUndefined(_propertyLocation.lat)
                && !_.isUndefined(_propertyLocation.lat)) {

                // Check that user location is set
                if (_currentPosition !== null && !_.isUndefined(_currentPosition.lat)
                    && !_.isUndefined(_currentPosition.lat)) {

                    //console.log("Getting user's distance from property...");

                    //console.dir(_propertyLocation);

                    // See how far away it is in meters
                    var start = _currentPosition.lat + "," + _currentPosition.lng;
                    var end = _propertyLocation.lat + "," + _propertyLocation.lng;
                    _calculateDurationToPoint(start, [end], "driving")
                        .then(function(resp) {
                            if (!_.isEmpty(resp)) {
                                //console.log("_calculateDurationToPoint: ");
                                //console.log(resp);
                                _metersFromProperty = resp[0].distance;
                                //console.log("User is " + _metersFromProperty + " meters from property");
                            }
                        });
                }
            }
        }

        function _pointToLatLng(point) {
            if (!_.isString(point)) { return; }
            var parts = point.split(",");
            return new google.maps.LatLng(parts[0], parts[1]);
        }

        function _notify() {
            angular.forEach(_subscribers, function(cb) {
               if (_currentPosition !== null && _isUserClose()) {
                   cb(_currentPosition);
               } else if (_currentPosition !== null && !_isUserClose() && _propertyLocation !== null) {
                   cb(_propertyLocation);
               } else if (_currentPosition == null && _propertyLocation !== null) {
                   cb(_propertyLocation);
               }
            });
        }

        function DistanceAdaptor() {

            this.mode = null;
            this.address = null;
            this.duration = null;
            this.durationLabel = null;
            this.distance = null;
            this.distanceLabel = null;
            this.startPointLabel = null;
        }

        DistanceAdaptor.init = function(jsonData, mode, startPointLabel) {
            var distances = [];
            if (jsonData.hasOwnProperty("rows") &&
                jsonData["rows"][0] !== undefined &&
                jsonData["rows"][0].hasOwnProperty("elements")) {
                var elements = jsonData["rows"][0]["elements"];
                for (var i = 0; i < elements.length; i++) {
                    var d = new DistanceAdaptor();

                    if (jsonData.hasOwnProperty("destinationAddresses")) {
                        d.address = jsonData["destinationAddresses"][i];
                    }

                    if (elements[i].status === "OK") {
                        d.mode = mode;
                        d.startPointLabel = startPointLabel;
                        d.duration = elements[i]["duration"]["value"];
                        d.distance = elements[i]["distance"]["value"];
                        d.durationLabel = elements[i]["duration"]["text"];
                        d.distanceLabel = elements[i]["distance"]["text"];
                    }

                    distances.push(d);
                }
            }

            return distances;
        };

        return {

            setPropertyLocation : function(lat, lng) {

                if (_propertyLocation !== null) {
                    if (_propertyLocation.lat === lat && _propertyLocation.lng === lng) {
                        //console.log("Property is the same; not setting");
                        //console.log(_propertyLocation);
                        return;
                    }
                }

                _propertyLocation = {};
                _propertyLocation["lat"] = lat;
                _propertyLocation["lng"] = lng;

                //console.log("Property location has been set to: " + _propertyLocation.lat + ", " + _propertyLocation.lng);

                _calculateDistanceFromProperty();
            },

            /**
             * Adds listener to location update notifications
             * @param {function} cb Callback function to be called
             * @returns {number} ID for later removal of listener
             * @memberOf GeoLocationService
             */
            addListener : function(cb) {
                var length = _subscribers.push(cb);
                return (length - 1);
            },


            /**
             * Removes listener from location update notifications
             * @param {number} id Targeted callback to remove
             * @memberOf GeoLocationService
             */
            removeListener : function(id) {
                if (id in _subscribers) {
                    delete _subscribers[id];
                }
            },

            /**
             * Check if location tracking is active or not
             * @return {boolean} true or false
             * @memberOf GeoLocationService
             */
            isLocationTrackingActive : function() {
                return isTracking === true;
            },

            /**
             * Initiate location tracking (will ask fro request from user).
             * If user accepts, _currentPosition will update accordingly
             * @memberOf GeoLocationService
             */
            enableLocationServices : function() {
                if ("geolocation" in navigator && isTracking !== true) {
                    watchId = navigator.geolocation.watchPosition(
                        // Success
                        function (position) {
                            isTracking = true;

                            // Save position
                            _currentPosition = {
                                lat: position.coords.latitude.toString(),
                                lng: position.coords.longitude.toString()
                            };

                            _calculateDistanceFromProperty();
                            _notify();
                        },

                        // Failure
                        function (error) {
                            isTracking = false;
                            _notify();
                        }
                    );
                }
            },

            // Deprecated; remove later
            getCurrentPosition : function() {

                if (_currentPosition !== null && _isUserClose()) {
                    //console.log(" >>>>>>> User is close");
                    return _currentPosition;
                } else if (_currentPosition !== null && !_isUserClose() && _propertyLocation !== null) {
                    //console.log(" >>>>>>> User is not close, using hotel");
                    return _propertyLocation;
                } else if (_currentPosition === null && _propertyLocation !== null) {
                    //console.log(" >>>>>>> User is MIA, using hotel");
                    return _propertyLocation;
                } else {
                    return null;
                }
            },

            forceNotify : function() {
              _notify();
            },

            /**
             *
             * @param {string[]} locationPoints Array of strings, in the form of "34.0300,-110.3434"
             * @param {string} mode Either "driving" or "walking"
             * @returns {*} deferred promise
             */
            calculateDurationToPoint : function(locationPoints, mode) {

                var promise;
                var startPoint = null;
                var userPoint = null;
                var hotelPoint = null;

                // This whole thing needs refactoring --Seb

                // Let's see if user location is available
                if (_currentPosition !== null) {
                    userPoint = _currentPosition.lat + "," + _currentPosition.lng;
                    // Let's see if they are close by
                    if (_metersFromProperty <= MAX_METERS_FROM_HOTEL) {
                        //console.log("User is close to property, using their location");
                        startPoint = userPoint;
                    } else if (_propertyLocation !== null) {
                        hotelPoint = _propertyLocation.lat + "," +_propertyLocation.lng;
                        //console.log("User is too far from property, using hotel location");
                        startPoint = hotelPoint;
                    } else {
                        //console.log("User is too far from property and property lat/lng is null; nothing we can do");
                    }
                }

                // Aight, let's see about property location
                else if (_propertyLocation !== null) {
                    hotelPoint = _propertyLocation.lat + "," +_propertyLocation.lng;
                    //console.log("User location not available, using hotel point");
                    startPoint = hotelPoint;
                }

                var startPointLabel = startPoint == hotelPoint ? "hotel" : "here";
                promise = _calculateDurationToPoint(startPoint, locationPoints, mode, startPointLabel);

                return promise;
            },

            /**
             * Disable location tracking
             * @memberOf GeoLocationService
             */
            disableLocationServices : function() {
                navigator.geolocation.clearWatch(watchId);
                isTracking = false;
            }
        }
    }

})();