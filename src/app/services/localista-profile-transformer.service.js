(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('LocalistaProfileTransformerService', LocalistaProfileTransformerService);

    LocalistaProfileTransformerService.$inject = ['_', 'RecommendationTransformerService', 'LocalistaTransformerService'];

    /**
     * @namespace LocalistaProfileTransformerService
     * @desc Handles the serializing and deserializing of data from the OurStay API
     */
    function LocalistaProfileTransformerService(_,
                                                RecommendationTransformerService,
                                                LocalistaTransformerService) {


        function LocalistaProfileAdaptor() {

            this.localista = null;
            this.slots = [];
        }


        LocalistaProfileAdaptor.prototype.toJSON = function() {
            return {

            }
        };

        LocalistaProfileAdaptor.prototype.init = function(jsonData) {

            // First, build out localista
            this.localista = LocalistaTransformerService.fromJSON(jsonData);

            if (jsonData.hasOwnProperty('conciergeslots') && jsonData['conciergeslots'] !== null) {
                // Pop it out
                var rawSlots = angular.copy(jsonData['conciergeslots']);
                for (var i = 0; i < rawSlots.length; i++) {
                    if (rawSlots[i].hasOwnProperty('listing')) {
                        rawSlots[i]['recommendation'] = RecommendationTransformerService.fromJSON(rawSlots[i]['listing']);
                        delete rawSlots[i]['listing'];
                    }

                    this.slots.push(rawSlots[i]);
                }

                delete this.localista['slots'];
            }

        };

        return {
            /**
             * @desc Converts array of JSON objects from OurStay API into Recommendations
             * @param {Object[]|Object} data - A JSON formatted array of objects
             * @returns {LocalistaProfileAdaptor[]|LocalistaProfileAdaptor} - An array of Recommendations or single rec
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

                        var r = new LocalistaProfileAdaptor();
                        r.init(datum);
                        localistas.push(r);

                    }
                    return localistas;

                } else {

                    var localista = new LocalistaProfileAdaptor();
                    localista.init(datum);
                    return localista;
                }


            },

            /**
             * @desc Converts array of Recommendations into OurStay API consumable JSON data
             * @param {LocalistaProfileAdaptor[]} recommendationArray - An array of Recommendations
             * @returns {Object[]} - JSON formatted data
             * @memberOf RecommendationTransformerService
             */
            toJSON: function(recommendationArray) {

            },

            createLocalistaProfileAdaptor: function() {
                return new LocalistaProfileAdaptor();
            }

        }

    }


})();
