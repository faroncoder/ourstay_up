(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('PropertyTransformerService', PropertyTransformerService);

    /**
    * @namespace PropertyTransformerService
    * @desc Handles the serializing and deserializing of data from the OurStay API
    */
    function PropertyTransformerService() {

        /**
         * Property converted from JSON encoded data
         * @class PropertyAdaptor
         */
        function PropertyAdaptor() {

            /**
             * The property id
             * @name PropertyAdaptor#id
             * @type number
             */
            this.id = null;

            /**
             * Default branch id for this property
             * @name PropertyAdaptor#defaultBranchId
             * @type number
             */
            this.defaultBranchId = null;

            /**
             * Plan id
             * @name PropertyAdaptor#planId
             * @type number
             */
            this.planId = null;

            /**
             * Shortend slug
             * @name PropertyAdaptor#shortenedSlug
             * @type string
             */
            this.shortenedSlug = null;

            /**
             * Slug
             * @name PropertyAdaptor#slug
             * @type string
             */
            this.slug = null;

            /**
             * Pretty name (human readable)
             * @name PropertyAdaptor#name
             * @type string
             */
            this.name = null;

            /**
             * URL to property logo
             * @name PropertyAdaptor#logoUrl
             * @type string
             */
            this.logoUrl = null;

            /**
             * URL to image
             * @name PropertyAdaptor#imageUrl
             * @type string
             */
            this.imageUrl = null;

            /**
             * Latitude
             * @name PropertyAdaptor#lat
             * @type float
             */
            this.lat = null;

            /**
             * Longitude
             * @name PropertyAdaptor#lng
             * @type float
             */
            this.lng = null;

            /**
             * Address - Street 1
             * @name PropertyAdaptor#street1
             * @type string
             */
            this.street1 = null;

            /**
             * Address - Street 2
             * @name PropertyAdaptor#street2
             * @type string
             */
            this.street2 = null;

            /**
             * Address - Street 3
             * @name PropertyAdaptor#street3
             * @type string
             */
            this.street3 = null;

            /**
             * Address - City
             * @name PropertyAdaptor#city
             * @type string
             */
            this.city = null;

            /**
             * Address - State
             * @name PropertyAdaptor#state
             * @type string
             */
            this.state = null;

            /**
             * Address - Postal code
             * @name PropertyAdaptor#postalCode
             * @type string
             */
            this.postalCode = null;

            /**
             * Address - Country
             * @name PropertyAdaptor#country
             * @type string
             */
            this.country = null;

            /**
             * Address - Phone
             * @name PropertyAdaptor#phone
             * @type string
             */
            this.phone = null;

            /**
             * Property Code
             * @name PropertyAdaptor#propertyCode
             * @type string
             */
            this.propertyCode = null;

            /**
             * Property Primary Name
             * @name PropertyAdaptor#primaryName
             * @type string
             */
            this.primaryName = null;

            /**
             * Property Secondary Name
             * @name PropertyAdaptor#secondaryName
             * @type string
             */
            this.secondaryName = null;
        }

        /**
         * @desc Initialize an empty PropertyAdaptor with data from OurStay API
         * @param {Object} jsonData A properly formatted JSON object
         * @param {number} jsonData.communitreeguid - ID for Property
         * @param {number} jsonData.communitreedefaultbranch - ID for default branch
         * @param {number} jsonData.communitreeplan - ID for plan
         * @param {string} jsonData.productshortname - Shortened identifier
         * @param {string} jsonData.productlongname - Long form identifier
         * @param {string} jsonData.productname - Human readable name
         * @param {string} jsonData.logourl - URL to logo image
         * @param {float} jsonData.latitude - Latitude
         * @param {float} jsonData.longitude - Longitude
         * @param {string} jsonData.physicaladdressstreet1 - Street 1
         * @param {string} jsonData.physicaladdressstreet2 - Street 2
         * @param {string} jsonData.physicaladdressstreet3 - Street 3
         * @param {string} jsonData.physicaladdresscity - City name
         * @param {string} jsonData.physicaladdressstate - State of property
         * @param {string} jsonData.physicaladdresspostalcode - Postal code of property
         * @param {string} jsonData.physicaladdresscountry - Country, abbrv
         * @param {string} jsonData.physicaladdressphone - Phone with country code
         * @param {string} jsonData.physicaladdressconciergephone - Phone with country code
         * @param {string} jsonData.imageurl - URL to image for property
         * @memberOf PropertyAdaptor
         */
        PropertyAdaptor.prototype.init = function(jsonData) {
            if ("communitreeguid" in jsonData) {
                this.id = parseInt(jsonData["communitreeguid"]);
            }

            if ("communitreedefaultbranch" in jsonData) {
                this.defaultBranchId = parseInt(jsonData["communitreedefaultbranch"]);
            }

            if ("communitreeplan" in jsonData) {
                this.planId = parseInt(jsonData["communitreeplan"]);
            }

            if ("productshortname" in jsonData) {
                this.shortenedSlug = jsonData["productshortname"];
            }

            if ("productlongname" in jsonData) {
                this.slug = jsonData["productlongname"];
            }

            if ("productname" in jsonData) {
                this.name = jsonData["productname"];
            }

            if ("logourl" in jsonData) {
                this.logoUrl = jsonData["logourl"];
            }

            if ("latitude" in jsonData) {
                this.lat = jsonData["latitude"];
            }

            if ("longitude" in jsonData) {
                this.lng = jsonData["longitude"];
            }

            if ("physicaladdressstreet1" in jsonData) {
                this.street1 = jsonData["physicaladdressstreet1"];
            }

            if ("physicaladdressstreet2" in jsonData) {
                this.street2 = jsonData["physicaladdressstreet2"];
            }

            if ("physicaladdressstreet3" in jsonData) {
                this.street3 = jsonData["physicaladdressstreet3"];
            }

            if ("physicaladdresscity" in jsonData) {
                this.city = jsonData["physicaladdresscity"];
            }

            if ("physicaladdressstate" in jsonData) {
                this.state = jsonData["physicaladdressstate"];
            }

            if ("physicaladdresspostalcode" in jsonData) {
                this.postalCode = jsonData["physicaladdresspostalcode"];
            }

            if ("physicaladdresscountry" in jsonData) {
                this.country = jsonData["physicaladdresscountry"];
            }

            if ("physicaladdressphone" in jsonData) {
                this.phone = jsonData["physicaladdressphone"];
            }

            if ("imageurl" in jsonData) {
                this.imageUrl = jsonData["imageurl"];
            }

            if ("propertycode" in jsonData) {
                this.propertyCode = jsonData["propertycode"];
            }

            if ("propertyfname" in jsonData['communitreeproperties']) {
                this.primaryName = jsonData['communitreeproperties']['propertyfname'];
            }

            if ("propertylname" in jsonData['communitreeproperties']) {
                this.secondaryName = jsonData['communitreeproperties']['propertylname'];
            }
        };

        return {
            /**
             * @desc Converts array of JSON objects from OurStay API into Properties
             * @param {Object[]|Object} data - Array of OurStay encoded JSON properties or a single object
             * @returns {PropertyAdaptor[]|PropertyAdaptor}
             * @memberOf PropertyTransformerService
             */
            fromJSON : function(data) {

                // Check if it's an array
                if (_.isArray(data)) {
                    if (data.length === 0) { return []; }
                    var properties = [];
                    for (var i in data) {
                        var datum = data[i];

                        // Check if object is nested in array
                        // This is an idiosyncrasy of the API return
                        if (_.isArray(datum)) {
                            datum = datum[0];
                        }

                        var propertyAdaptor = new PropertyAdaptor();
                        propertyAdaptor.init(datum);
                        properties.push(propertyAdaptor);
                    }

                    return properties;

                } else {
                    var propertyAdaptor = new PropertyAdaptor();
                    propertyAdaptor.init(data);
                    return propertyAdaptor;
                }
            },

            /**
             * @desc Creates an empty PropertyAdaptor
             * @returns {PropertyAdaptor}
             * @memberOf PropertyTransformerService
             */
            createPropertyAdaptor : function() {
                return new PropertyAdaptor();
            },

            /**
             * @desc Converts array of Properties into OurStay API consumable JSON data
             * @param {PropertyAdaptor[]} propertyArray - JSON formatted array of objects
             * @memberOf PropertyTransformerService
             */
            toJSON : function(propertyArray) {

            }
        }

    }


})();
