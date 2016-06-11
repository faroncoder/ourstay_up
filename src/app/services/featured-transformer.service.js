(function () {

    'use strict';
    angular
        .module('ourstay')
        .factory('FeaturedTransformerService', FeaturedTransformerService);

    FeaturedTransformerService.$inject = ['_'];

    /**
     * @namespace FeaturedTransformerService
     * @param {_} _ Lodash library
     * @desc Handles the serializing and deserializing of data from the OurStay API
     */
    function FeaturedTransformerService(_) {

        /**
         * Featured item converted from JSON encoded data
         * @class FeaturedAdaptor
         */
        function FeaturedAdaptor() {

            /**
             * The property id
             * @name FeaturedAdaptor#id
             * @type number
             */
            this.id = null;

            /**
             * The type of featured, either: "recommendation" or "category"
             * @name FeaturedAdaptor#featuredType
             * @type string
             */
            this.featuredType = null;

            /**
             * Full name of featured item
             * @name FeaturedAdaptor#name
             * @type string
             */
            this.name = null;

            /**
             * Ranked position (seems unnecessary)
             * @name FeaturedAdaptor#position
             * @type number
             */
            this.position = null;

            /**
             * Main image for featured item
             * @name FeaturedAdaptor#imageUrl
             * @type string
             */
            this.imageUrl = null;

            // Category specific

            /**
             * List of recommendations (as FeaturedAdaptors) associated with this category
             * @name FeaturedAdaptor#recommendations
             * @type FeaturedAdaptor[]
             */
            this.recommendations = [];

            // Recommendation specific

            /**
             * Full URL to property
             * @name FeaturedAdaptor#url
             * @type string
             */
            this.url = null;

            /**
             * Latitude
             * @name FeaturedAdaptor#lat
             * @type string
             */
            this.lat = null;

            /**
             * Longitude
             * @name FeaturedAdaptor#lng
             * @type string
             */
            this.lng = null;

            /**
             * Walking distance in minutes
             * @name FeaturedAdaptor#walkingMinutesFromHotel
             * @type number
             */
            this.walkingMinutesFromHotel = null;

            /**
             * Driving distance in minutes
             * @name FeaturedAdaptor#drivingMinutesFromHotel
             * @type number
             */
            this.drivingMinutesFromHotel = null;

            /**
             * Standard image URLs for property
             * @name FeaturedAdaptor#images
             * @type string[]
             */
            this.images = [];

            /**
             * Featured image URLs for property
             * @name FeaturedAdaptor#featuredImages
             * @type string[]
             */
            this.featuredImages = [];
        }


        /**
         * @desc Initialize an empty FeaturedAdaptor with data from OurStay API
         * @param {Object} jsonData A properly formatted JSON object
         * @param {number} jsonData.objectid - ID for object
         * @param {string} jsonData.objectname - Full name of featured item
         * @param {number} jsonData.featuredposition - Ranked position
         * @param {number} jsonData.objecttypeid - 21 == category, 2 == recommendation
         * @param {float} jsonData.latitude - Latitude
         * @param {float} jsonData.longitude - Longitude
         * @param {Object[]} jsonData.moodview- Array of JSON encoded recommendation objects
         * @param {number} jsonData.walkingminutesfromhotel - Walking distance from hotel
         * @param {number} jsonData.drivingminutesfromhotel - Driving distance from hotel
         * @param {string[]} jsonData.recommendationassets- Array of URLs to images
         * @param {string[]} jsonData.fsrecommendationassets- Array of URLs to featured images
         * @param {string} jsonData.imageurl - URL to image for property
         * @memberOf FeaturedAdaptor
         */
        FeaturedAdaptor.prototype.init = function (jsonData) {

            // Stuff for all object types
            if ("objectid" in jsonData) {
                this.id = jsonData["objectid"];
            }

            if ("objectname" in jsonData) {
                this.name = jsonData["objectname"];
            }

            if ("featuredposition" in jsonData) {
                this.position = jsonData["featuredposition"];
            }

            if ("imageurl" in jsonData) {
                this.imageUrl = jsonData["imageurl"];
            }

            // Build a category
            if (jsonData["objecttypeid"] === 21) {
                this.featuredType = "category";

                for (var key in jsonData["moodview"]) {
                    var rec = jsonData["moodview"][key];
                    var fa = new FeaturedAdaptor();
                    fa.init(rec);
                    this.recommendations.push(fa);
                }
            }

            // Build a recommendation
            if (jsonData["objecttypeid"] === 2) {

                this.featuredType = "recommendation";

                if ("latitude" in jsonData) {
                    this.lat = jsonData["latitude"];
                }

                if ("longitude" in jsonData) {
                    this.lng = jsonData["longitude"];
                }

                if ("objecturl" in jsonData) {
                    this.url = jsonData["objecturl"];
                }

                if ("objecturl" in jsonData) {
                    this.url = jsonData["objecturl"];
                }

                if ("walkingminutesfromhotel" in jsonData) {
                    this.walkingMinutesFromHotel = jsonData["walkingminutesfromhotel"];
                }

                if ("drivingminutesfromhotel" in jsonData) {
                    this.drivingMinutesFromHotel = jsonData["drivingminutesfromhotel"];
                }

                if ("recommendationassets" in jsonData) {
                    for (var assetKey in jsonData["recommendationassets"]) {
                        var assetUrl = jsonData["recommendationassets"][assetKey];
                        this.images.push(assetUrl);
                    }
                }

                if ("fsrecommendationassets" in jsonData) {
                    for (var fsAssetKey in jsonData["fsrecommendationassets"]) {
                        var fsAssetUrl = jsonData["fsrecommendationassets"][fsAssetKey];
                        this.featuredImages.push(fsAssetUrl);
                    }
                }
            }
        };


        return {

            /**
             * Create a new, empty FeaturedAdaptor to play with
             * @returns {FeaturedAdaptor}
             */
            createFeaturedAdaptor: function () {
                return new FeaturedAdaptor();
            },

            /**
             * @desc Converts array of JSON objects from OurStay API into FeaturedAdaptors
             * @param {Object[]|Object} data - Array of OurStay encoded JSON featured items or a single object
             * @returns {FeaturedAdaptor[]|FeaturedAdaptor}
             * @memberOf FeaturedTransformerService
             */
            fromJSON: function (data) {

                if (_.isArray(data)) {

                    if (data.length === 0) {
                        return [];
                    }
                    var results = [];
                    for (var i = 0; i < data.length; i++) {

                        var datum = data[i];

                        // Check if object is nested in array
                        // This is an idiosyncrasy of the API return
                        if (_.isArray(datum)) {
                            datum = datum[0];
                        }

                        var item = new FeaturedAdaptor();
                        item.init(datum);
                        results.push(item);

                    }

                    return results;

                } else {

                    var singleItem = new FeaturedAdaptor();
                    singleItem.init(datum);
                    return singleItem;
                }


            }
        }
    }

})();
