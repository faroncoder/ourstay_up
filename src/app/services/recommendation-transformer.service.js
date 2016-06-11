(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('RecommendationTransformerService', RecommendationTransformerService);

    RecommendationTransformerService.$inject = ['_', 'LocalistaTransformerService'];

    /**
     * @namespace RecommendationTransformerService
     * @desc Handles the serializing and deserializing of data from the OurStay API
     */
    function RecommendationTransformerService(_, LocalistaTransformerService) {

        /**
         * Recommendation converted from JSON encoded data
         * @class RecommendationAdaptor
         */
        function RecommendationAdaptor() {
            /**
             * The recommendation id
             * @name RecommendationAdaptor#id
             * @type number
             */
            this.id = null;

            /**
             * The recommendation type id
             * @name RecommendationAdaptor#typeId
             * @type number
             */
            this.typeId = null;

            /**
             * The full name, like "Sky's Saloon"
             * @name RecommendationAdaptor#name
             * @type string
             */
            this.name = null;


            /**
             * @name RecommendationAdaptor#shortDescription
             * @type string
             */
            this.shortDescription = null;

            /**
             * @name RecommendationAdaptor#secondWhy
             * @type string
             */
            this.secondWhy = null;

            /**
             * @name RecommendationAdaptor#description
             * @type string
             */
            this.description = null;

            /**
             * Public facing URL
             * @name RecommendationAdaptor#url
             * @type string
             */
            this.url = null;

            /**
             * Primary image for recommendation
             * @name RecommendationAdaptor#primaryImageUrl
             * @type string
             */
            this.primaryImageUrl = null;

            /**
             * Walking minutes from hotel
             * @name RecommendationAdaptor#walkingMinutesFromHotel
             * @type number
             * DEPRECATED
             */
            this.walkingMinutesFromHotel = null;

            /**
             * Driving minutes from hotel
             * @name RecommendationAdaptor#drivingMinutesFromHotel
             * @type number
             * DEPRECATED
             */
            this.drivingMinutesFromHotel = null;


            this.startPointLabel = null; // Here or hotel
            this.drivingMinutes = null;
            this.walkingMinutes = null;

            /**
             * Latitude for location of recommendation
             * @name RecommendationAdaptor#lat
             * @type float
             */
            this.lat = null;

            /**
             * Longitude for location of recommendation
             * @name RecommendationAdaptor#lng
             * @type float
             */
            this.lng = null;

            /**
             * Image asset URLs
             * @name RecommendationAdaptor#images
             * @type string[]
             */
            this.images = [];

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
             * Chef Image
             * @name RecommendationAdaptor#meetTheUrl
             * @type string
             */
            this.meetTheUrl = null;

            /**
             * Chef first name
             * @name RecommendationAdaptor#meetTheFirstName
             * @type string
             */
            this.meetTheFirstName = null;

            /**
             * Chef name
             * @name RecommendationAdaptor#meetTheName
             * @type string
             */
            this.meetTheName = null;

            /**
             * Chef tagline
             * @name RecommendationAdaptor#meetTheTagline
             * @type string
             */
            this.meetTheTagline = null;


            /**
             * Chef description
             * @name RecommendationAdaptor#meetTheDescription
             * @type string
             */
            this.meetTheDescription = null;

            /**
             * Meet the type id
             * @name RecommendationAdaptor#meetthetypeid
             * @type int
             */
            this.meetTheTypeId = null;

            /**
             * Image asset URLs
             * @name RecommendationAdaptor#nearby
             * @type array[]
             */
            this.nearby = [];

            /**
             * Array of operating hours for business
             * @name RecommendationAdaptor#operatingHours
             * @type array[]
             */
            this.operatingHours = [];

            /**
             * Array of related categories
             * @name RecommendationAdaptor#relatedCategories
             * @type array[]
             */
            this.relatedCategories = [];


            /**
             * Array of available external services
             * @name RecommendationAdaptor#externalServices
             * @type array[]
             */
            this.externalServices = [];

            this.localista = null;

            this.localistaRecommendations = [];

            this.recommenders = [];
        }

        /**
         * @desc Serialize native format into OurStay API consumable JSON format
         * @return {Object} - JSON encoded object
         * @todo Finish this if you need to
         * @memberOf RecommendationAdaptor
         */
        RecommendationAdaptor.prototype.toJSON = function() {
            return {

            }
        };

        /**
         * @desc Initialize an empty Recommendation with data from OurStay API
         * @param {Object} jsonData - A properly formatted JSON object
         * @memberOf RecommendationAdaptor
         */
        RecommendationAdaptor.prototype.init = function(jsonData) {

            if (jsonData.hasOwnProperty("objectid")) {
                this.id = parseInt(jsonData["objectid"]);
            }

            if (jsonData.hasOwnProperty("histreeid")) {
                this.id = parseInt(jsonData["histreeid"]);
            }

            // Handle primary image url variation between list and detail view -- START
            if (jsonData.hasOwnProperty("imageurl")) {
                this.primaryImageUrl = jsonData["imageurl"];
            }

            if (jsonData.hasOwnProperty("historyurl")) {
                this.primaryImageUrl = jsonData["historyurl"];
            }
            // Handle primary image url variation between list and detail view -- END

            if (jsonData.hasOwnProperty("walkingminutesfromhotel")) {
                if (!_.isNull(jsonData["walkingminutesfromhotel"]) && !_.isBoolean(jsonData["walkingminutesfromhotel"]) && jsonData["walkingminutesfromhotel"] != "") {
                    this.walkingMinutesFromHotel = parseInt(jsonData["walkingminutesfromhotel"]);
                }
            }

            if (jsonData.hasOwnProperty("drivingminutesfromhotel")) {
                if (!_.isNull(jsonData["drivingminutesfromhotel"]) && !_.isBoolean(jsonData["drivingminutesfromhotel"]) && jsonData["drivingminutesfromhotel"] != "") {
                    this.drivingMinutesFromHotel = parseInt(jsonData["drivingminutesfromhotel"]);
                }
            }

            if (jsonData.hasOwnProperty("objecttypeid")) {
                this.typeId = parseInt(jsonData["objecttypeid"]);
            }

            // Handle website variation between list and detail view -- START
            if (jsonData.hasOwnProperty("url")) {
                this.url = jsonData["url"];
            }

            if (jsonData.hasOwnProperty("website")) {
                this.url = jsonData["website"];
            }
            // Handle website variation between list and detail view -- END

            // Handle name variation between list and detail view -- START
            if (jsonData.hasOwnProperty("objectname")) {
                this.name = jsonData["objectname"];
            }

            if (jsonData.hasOwnProperty("name")) {
                this.name = jsonData["name"];
            }
            // Handle name variation between list and detail view -- END

            if (jsonData.hasOwnProperty("description")) {
                var descriptionArray = jsonData["description"].split(/\n/);
                for (var i = 0; i < descriptionArray.length; i++) {
                    if (descriptionArray[i] == "")
                        descriptionArray.splice(i, 1);
                }
                this.description = descriptionArray;
            }

            if (jsonData.hasOwnProperty("latitude")) {
                this.lat = jsonData["latitude"];
            }

            if (jsonData.hasOwnProperty("longitude")) {
                this.lng = jsonData["longitude"];
            }

            if (jsonData.hasOwnProperty("physicaladdressstreet1")) {
                this.street1 = jsonData["physicaladdressstreet1"];
            }

            if (jsonData.hasOwnProperty("physicaladdressstreet2")) {
                this.street2 = jsonData["physicaladdressstreet2"];
            }

            if (jsonData.hasOwnProperty("physicaladdressstreet3")) {
                this.street3 = jsonData["physicaladdressstreet3"];
            }

            if (jsonData.hasOwnProperty("physicaladdresscity")) {
                this.city = jsonData["physicaladdresscity"];
            }

            if (jsonData.hasOwnProperty("physicaladdressstate")) {
                this.state = jsonData["physicaladdressstate"];
            }

            if (jsonData.hasOwnProperty("physicaladdresspostalcode")) {
                this.postalCode = jsonData["physicaladdresspostalcode"];
            }

            if (jsonData.hasOwnProperty("physicaladdresscountry")) {
                this.country = jsonData["physicaladdresscountry"];
            }

            if (jsonData.hasOwnProperty("physicaladdressphone")) {
                this.phone = jsonData["physicaladdressphone"];
            }

            if (jsonData.hasOwnProperty("recommendationassets")) {
                for (var key in jsonData["recommendationassets"]) {
                    var largeUrl = null;
                    var url = null;

                    url = jsonData["recommendationassets"][key];

                    // This is fragile; it assumes the images from recommendationassets are at same index
                    // in fsrecommendationassets
                    if (jsonData.hasOwnProperty("fsrecommendationassets")) {
                        if (jsonData["fsrecommendationassets"].hasOwnProperty(key)) {
                            largeUrl = jsonData["fsrecommendationassets"][key];
                        }
                    }

                    this.images.push({
                        thumb: url,
                        large: largeUrl
                    });
                }

                // If primaryImageUrl is not set, set it so we don't cause problems
                // TODO: Make this an object, not URL -seb
                if (this.images.length >= 2) {
                    this.primaryImageUrl = this.images[1].thumb;
                }

            }

            if (jsonData.hasOwnProperty("whyrecommended")) {
                if (_.isArray(jsonData["whyrecommended"]) && jsonData["whyrecommended"].length > 0) {
                    this.shortDescription = jsonData["whyrecommended"][0];
                }
            }

            if (jsonData.hasOwnProperty("whyrecommended")) {
                if (_.isArray(jsonData["whyrecommended"]) && jsonData["whyrecommended"].length > 1) {
                    this.secondWhy = jsonData["whyrecommended"][1];
                }
            }

            if (jsonData.hasOwnProperty("meettheurl")) {
                if (jsonData["meettheurl"] != "") {
                    this.meetTheUrl = jsonData["meettheurl"];
                }
            }

            if ( jsonData.hasOwnProperty("meetthefname") ) {
                this.meetTheFirstName = jsonData["meetthefname"];
            }

            if (jsonData.hasOwnProperty("meetthefname") && jsonData.hasOwnProperty("meetthelname")) {
                this.meetTheName = jsonData["meetthefname"] + ' ' + jsonData["meetthelname"];
            }

            if (jsonData.hasOwnProperty("meetthereason1")) {
                this.meetTheTagline = jsonData["meetthereason1"].replace(/(")+/g, '"');
            }

            if (jsonData.hasOwnProperty("meetthedescription")) {
                this.meetTheDescription = jsonData["meetthedescription"];
            }

            if (jsonData.hasOwnProperty("meetthetypeid")) {
                this.meetTheTypeId = jsonData["meetthetypeid"];
            }

            if (jsonData.hasOwnProperty("openclosetimes")) {

                for (var j = 0; j < jsonData["openclosetimes"].length; j++) {
                    var rawHoursObject = jsonData["openclosetimes"][j];
                    var hoursObject = {
                        dayOfWeek: null,
                        openTimeDay: null,
                        closeTimeDay: null,
                        openTimeNight: null,
                        closeTimeNight: null,
                        closed: false
                    };

                    hoursObject.dayOfWeek = parseInt(rawHoursObject["dayofweek"]);

                    if (rawHoursObject["opentimeday"] != "" && rawHoursObject["opentimeday"] != null) {
                        var timeTokens = rawHoursObject["opentimeday"].split(':');
                        hoursObject.openTimeDay = new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
                    }
                    if (rawHoursObject["closetimeday"] != "" && rawHoursObject["closetimeday"] != null) {
                        var timeTokens = rawHoursObject["closetimeday"].split(':');
                        hoursObject.closeTimeDay = new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
                    }

                    if (rawHoursObject["opentimenight"] != "" && rawHoursObject["opentimenight"] != null) {
                        var timeTokens = rawHoursObject["opentimenight"].split(':');
                        hoursObject.openTimeNight = new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
                    }

                    if (rawHoursObject["closetimenight"] != "" && rawHoursObject["closetimenight"] != null) {
                        var timeTokens = rawHoursObject["opentimenight"].split(':');
                        hoursObject.closeTimeNight = new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
                    }

                    hoursObject.closed = rawHoursObject["closed"];

                    this.operatingHours.push(hoursObject);
                }
            }

            if (jsonData.hasOwnProperty("nearby")) {
                for (var k = 0; k < jsonData["nearby"]["data"].length; k++) {
                    var r = new RecommendationAdaptor();
                    r.init(jsonData["nearby"]["data"][k][0]); // Nested arrays, again
                    this.nearby.push(r);

                }
            }

            if (jsonData.hasOwnProperty("moods")) {
                for (var k2 = 0; k2 < jsonData["moods"].length; k2++) {
                    var pieces = jsonData["moods"][k2].replace("(", "").replace(")", "").split(',');
                    var obj = {
                        id: parseInt(pieces[0]),
                        name: pieces[1]
                    };

                    this.relatedCategories.push(obj);
                }
            }

            if (jsonData.hasOwnProperty("externalserviceid")) {
                var label = parseInt(jsonData["externalservicetypeid"]) === 1 ? "openTable" : "grubHub";
                var service = {
                    id: jsonData["externalserviceid"],
                    label: label,
                    url: null
                };

                if (label === 'openTable') {
                    service.url = "http://www.opentable.com/" + service.id
                }

                if (label === 'grubHub') {
                    service.url = "http://www.grubhub.com/restaurant/" + service.id;
                }

                this.externalServices.push(service);
            }

            if (jsonData.hasOwnProperty("conciergerecommendations")) {
                if (jsonData["conciergerecommendations"] !== null && jsonData["conciergerecommendations"].length > 0) {
                    for (var l = 0; l < jsonData["conciergerecommendations"].length; l++) {
                        var datum = jsonData["conciergerecommendations"][l];
                        var rec = new RecommendationAdaptor();
                        rec.init(datum);
                        this.localistaRecommendations.push(rec);
                    }
                }
            }

            if (jsonData.hasOwnProperty("recommenders")) {
                for (var m = 0; m < jsonData["recommenders"].length; m++) {
                    var rawRecommender = jsonData["recommenders"][m];

                    var recommender = {
                        id: rawRecommender["recommenderprofileid"],
                        imageUrl: rawRecommender["imageurl"],
                        firstName: rawRecommender["accountfname"],
                        lastName: rawRecommender["accountlname"],
                        fullName: null,
                        profileTypeId: rawRecommender["recommenderprofiletypeid"],
                        profileName: rawRecommender["recommenderprofiletypename"],
                        profileSalutation: rawRecommender["recommenderprofilesalutation"],
                        description: rawRecommender["description"],
                        reasons: []
                    };

                    recommender['profileSalutation'] = recommender['profileSalutation'].replace('Our ', '');

                    if (recommender["firstName"] !== null && recommender["lastName"] !== null) {
                        recommender["fullName"] = recommender["firstName"] + " " + recommender["lastName"];
                    }

                    if (rawRecommender.hasOwnProperty("reasonone") && rawRecommender["reasonone"] !== null) {
                        recommender["reasons"].push(rawRecommender["reasonone"])
                    }

                    if (rawRecommender.hasOwnProperty("reasontwo") && rawRecommender["reasontwo"] !== null) {
                        recommender["reasons"].push(rawRecommender["reasontwo"])
                    }

                    this.recommenders.push(recommender);
                }
            }

            if (jsonData.hasOwnProperty("conciergeprofile") && jsonData["conciergeprofile"] !== null) {
                var localista = LocalistaTransformerService.createLocalistaAdaptor();
                localista.init(jsonData["conciergeprofile"]);
                this.localista = localista;
            }
        };

        return {
            /**
             * @desc Converts array of JSON objects from OurStay API into Recommendations
             * @param {Object[]|Object} data - A JSON formatted array of objects
             * @returns {RecommendationAdaptor[]|RecommendationAdaptor} - An array of Recommendations or single rec
             * @memberOf RecommendationTransformerService
             */
            fromJSON: function(data) {

                if (typeof data === 'undefined') {
                    return;
                }

                var datum = data;

                if (_.isArray(data)) {

                    if (data.length === 0) {
                        return [];
                    }
                    var recommendations = [];
                    for (var i = 0; i < data.length; i++) {

                        datum = data[i];

                        // Check if object is nested in array
                        // This is an idiosyncrasy of the API return
                        if (_.isArray(datum)) {
                            datum = datum[0];
                        }

                        // Make sure it's a recommendation
                        if (datum["objecttypeid"] == 2) {
                            var r = new RecommendationAdaptor();
                            r.init(datum);
                            recommendations.push(r);
                        }

                    }
                    return recommendations;

                } else {

                    // Make sure it's a recommendation
                    // A bit convoluted, but this is because the api calls that return lists and details
                    // gives us different property names
                    if (("objecttypeid" in datum && datum["objecttypeid"] == 2) || "histreeid" in datum) {
                        var recommendation = new RecommendationAdaptor();
                        recommendation.init(datum);
                        return recommendation;
                    }
                }


            },

            /**
             * @desc Converts array of Recommendations into OurStay API consumable JSON data
             * @param {RecommendationAdaptor[]} recommendationArray - An array of Recommendations
             * @returns {Object[]} - JSON formatted data
             * @memberOf RecommendationTransformerService
             */
            toJSON: function(recommendationArray) {

            },

            createRecommendationAdaptor: function() {
                return new RecommendationAdaptor();
            }

        }

    }


})();
