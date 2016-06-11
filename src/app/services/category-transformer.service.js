(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('CategoryTransformerService', CategoryTransformerService);

    CategoryTransformerService.$inject = ['_', 'RecommendationTransformerService'];

    /**
     * @namespace CategoryTransformerService
     * @desc Handles the serializing and deserializing of data from the OurStay API
     */
    function CategoryTransformerService(_, RecommendationTransformerService) {

        /**
         * Property converted from JSON encoded data
         * @class CategoryAdaptor
         */
        function CategoryAdaptor() {

            /**
             * @name CategoryAdaptor#id
             * @type number
             */
            this.id = null;

            /**
             * The "slottype" from the OurStay API; refers to the type of image
             * that is returned in respect to grid size
             * @name CategoryAdaptor#imageType
             * @type number
             */
            this.imageType = null;

            /**
             * @name CategoryAdaptor#name
             * @type string
             */
            this.name = null;

            /**
             * @name CategoryAdaptor#description
             * @type string
             */
            this.description = null;

            /**
             * @name CategoryAdaptor#imageUrl
             * @type string
             */
            this.imageUrl = null;

            /**
             * @name CategoryAdaptor#imageUrl
             * @type string
             */
            this.retinaImageUrl = null;

            /**
             * @name CategoryAdaptor#recommendations
             * @type RecommendationAdaptor[]
             */
            this.recommendations = [];
        }

        /**
         * @desc Initialize an empty CategoryAdaptor with data from OurStay API
         * @param {Object} jsonData A properly formatted JSON object
         * @memberOf CategoryAdaptor
         */
        CategoryAdaptor.prototype.init = function(jsonData) {

            if ("moodid" in jsonData) {
                this.id = jsonData["moodid"];
            }

            if ("moodname" in jsonData) {
                this.name = jsonData["moodname"];
            }

            if ("mooddescription" in jsonData) {
                this.description = jsonData["mooddescription"];
            }

            if ("assetnonretina" in jsonData) {
                this.imageUrl = jsonData["assetnonretina"];
            }

            if ("assetretina" in jsonData) {
                this.retinaImageUrl = jsonData["assetretina"];
            }

        };

        return {
            /**
             * @desc Converts array of JSON objects from OurStay API into Properties
             * @param {Object[]|Object} data - Array of OurStay encoded JSON properties or a single object
             * @returns {CategoryAdaptor[]|CategoryAdaptor}
             * @memberOf CategoryTransformerService
             */
            fromJSON : function(data) {

                var categoryAdaptor;

                // Check if it's an array
                if (_.isArray(data)) {
                    if (data.length === 0) { return []; }
                    var categories = [];
                    for (var i in data) {
                        var c = new CategoryAdaptor();
                        c.init(data[i]);
                        categories.push(c);
                    }

                    return categories;

                } else {
                    categoryAdaptor = new CategoryAdaptor();
                    categoryAdaptor.init(data);
                    return categoryAdaptor;
                }
            },

            /**
             * @desc Creates an empty CategoryAdaptor
             * @returns {CategoryAdaptor}
             * @memberOf CategoryTransformerService
             */
            createCategoryAdaptor : function() {
                return new CategoryAdaptor();
            },

            /**
             * @desc Converts array of Properties into OurStay API consumable JSON data
             * @param {CategoryAdaptor[]} propertyArray - JSON formatted array of objects
             * @memberOf CategoryTransformerService
             */
            toJSON : function(propertyArray) {

            }
        }

    }


})();
