(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('LocalistaTransformerService', LocalistaTransformerService);

    LocalistaTransformerService.$inject = ['_'];

    /**
     * @namespace LocalistaTransformerService
     * @desc Handles the serializing and deserializing of data from the OurStay API
     */
    function LocalistaTransformerService(_) {

        /**
         * Recommendation converted from JSON encoded data
         * @class LocalistaAdaptor
         */
        function LocalistaAdaptor() {
            /**
             * The recommendation id
             * @name LocalistaAdaptor#id
             * @type number
             */
            this.id = null;
            this.propertyId = null;
            this.firstName = null;
            this.lastName = null;
            this.expertises = null;
            this.primaryImageUrl = null;

            this.mediaLinks = [];

            this.getFullName = function() {
                return this.firstName + " " + this.lastName;
            }
        }

        /**
         * @desc Serialize native format into OurStay API consumable JSON format
         * @return {Object} - JSON encoded object
         * @todo Finish this if you need to
         * @memberOf LocalistaAdaptor
         */
        LocalistaAdaptor.prototype.toJSON = function() {
            return {

            }
        };

        /**
         * @desc Initialize an empty Recommendation with data from OurStay API
         * @param {Object} jsonData - A properly formatted JSON object
         * @memberOf LocalistaAdaptor
         */
        LocalistaAdaptor.prototype.init = function(jsonData) {

            if (jsonData.hasOwnProperty("conciergeprofileid")) {
                this.id = parseInt(jsonData["conciergeprofileid"]);
            }

            if (jsonData.hasOwnProperty("communitree")) {
                this.propertyId = parseInt(jsonData["communitree"]);
            }

            // Handle primary image url variation between list and detail view -- START
            if (jsonData.hasOwnProperty("thumbnail")) {
                this.primaryImageUrl = jsonData["thumbnail"];
            }

            if (jsonData.hasOwnProperty("fname")) {
                this.firstName = jsonData["fname"];
            }

            if (jsonData.hasOwnProperty("lname")) {
                this.lastName = jsonData["lname"];
            }

            if (jsonData.hasOwnProperty("expertises")){
                this.expertises = jsonData["expertises"];
            }
            if (jsonData.hasOwnProperty("chefconcierge")){
                jsonData["chefconcierge"] ? this.conciergeTitle = 'Chef Concierge' : this.conciergeTitle = 'Concierge';
            }
            if (jsonData.hasOwnProperty("conciergeprofileid")){
                this.conciergeProfileId = jsonData["conciergeprofileid"];
            }
            if (jsonData.hasOwnProperty("socialmedias") && jsonData["socialmedias"] !== null) {
                for (var i = 0; i < jsonData["socialmedias"].length; i++) {
                    var obj = null;
                    if (parseInt(jsonData["socialmedias"][i]['smtype']) === 5 ) {  //Instagram
                        obj = {
                            type: 'instagram',
                            url: jsonData["socialmedias"][i]['smexternalid']
                        };
                    }

                    if (parseInt(jsonData["socialmedias"][i]['smtype']) === 2 ) {  //Twitter
                        obj = {
                            type: 'twitter',
                            url: jsonData["socialmedias"][i]['smexternalid']
                        };
                    }

                    if (parseInt(jsonData["socialmedias"][i]['smtype']) === 1 ) {  //Facebook
                        obj = {
                            type: 'facebook',
                            url: jsonData["socialmedias"][i]['smexternalid']
                        };
                    }

                    if (obj !== null) {
                        this.mediaLinks.push(obj);
                    }
                }
            }

        };

        return {
            /**
             * @desc Converts array of JSON objects from OurStay API into Recommendations
             * @param {Object[]|Object} data - A JSON formatted array of objects
             * @returns {LocalistaAdaptor[]|LocalistaAdaptor} - An array of Recommendations or single rec
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
                    var localistas = [];
                    for (var i = 0; i < data.length; i++) {

                        datum = data[i];

                        // Check if object is nested in array
                        // This is an idiosyncrasy of the API return
                        if (_.isArray(datum)) {
                            datum = datum[0];
                        }

                        var r = new LocalistaAdaptor();
                        r.init(datum);
                        localistas.push(r);

                    }
                    return localistas;

                } else {

                    var localista = new LocalistaAdaptor();
                    localista.init(datum);
                    return localista;
                }


            },

            /**
             * @desc Converts array of Recommendations into OurStay API consumable JSON data
             * @param {LocalistaAdaptor[]} recommendationArray - An array of Recommendations
             * @returns {Object[]} - JSON formatted data
             * @memberOf RecommendationTransformerService
             */
            toJSON: function(recommendationArray) {

            },

            createLocalistaAdaptor: function() {
                return new LocalistaAdaptor();
            }

        }

    }


})();
