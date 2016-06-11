(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('APIService', APIService);

    APIService.$inject = [
        '$http',
        'ConfigService',
        '$q',
        'RecommendationTransformerService',
        'FeaturedTransformerService',
        'PropertyTransformerService',
        'CategoryTransformerService',
        'LocalistaProfileTransformerService'
    ];

    /**
    * @namespace APIService
    * @desc Handles transforming OurStay API into readable methods and properties. If a method starts with "get", it will return a single object.
    * If starts with "fetch", it will return an array of objects.
    */
    function APIService($http,
                        ConfigService,
                        $q,
                        RecommendationTransformerService,
                        FeaturedTransformerService,
                        PropertyTransformerService,
                        CategoryTransformerService,
                        LocalistaProfileTransformerService) {


        function _parsePaginatedRecommendations(data) {
            var parsedReturn = angular.fromJson(data);

            // Check if page > `totalpages` on return
            // This is in place because API does not return empty set if page is invalid

            var hasMore = false;
            if (parsedReturn.hasOwnProperty('r')) {
                if (parsedReturn['r'].hasOwnProperty('nextpage')) {
                    if (parsedReturn['r']['nextpage'] !== null) {
                        hasMore = true;
                    }
                }
            }

            // Hack in place because of OurStay's nesting of data within data
            var jsonData = parsedReturn["r"]["data"];
            if (parsedReturn["r"]["data"].hasOwnProperty("data")) {
                jsonData = parsedReturn["r"]["data"]["data"];
            }
            var recs = RecommendationTransformerService.fromJSON(jsonData);

            return {
                hasMore: hasMore,
                results: recs
            }
        }

        return {

            /**
             * @desc Searches for recommendations
             * @param {number} propertyId ID for given property
             * @param {string} query Search query
             * @returns {RecommendationAdaptor[]} Recommendations
             * @memberOf APIService
             */
            search : function(propertyId, query) {

                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/mobilesearch/communitree?callback=JSON_CALLBACK&communitreeid=" + propertyId + "&q=" + query + "&devicetypeid=2",
                    transformResponse: function(data) {
                        var jsonData = angular.fromJson(data)["r"]["data"];
                        return RecommendationTransformerService.fromJSON(jsonData);
                    }
                })
                .success(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },

            /**
             * @desc Fetch recommendations near property or self
             * @param {number} propertyId ID for given property
             * @param {float} lat Latitude of user's location
             * @param {float} lng Longitude of user's location
             * @param {number} page Defaults to 1
             * @returns {RecommendationAdaptor[]}
             * @memberOf APIService
             */
            nearby : function(propertyId, lat, lng, page) {

                page = typeof page === 'undefined' ? 1 : page;

                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/nearbysearch/communitree?callback=JSON_CALLBACK&communitreeid=" + propertyId + "&lat=" + lat + "&long=" + lng + "&page=" + page,
                    transformResponse: function(data) {
                        return _parsePaginatedRecommendations(data);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            /**
             * @desc Get meta data for property
             * @param {number} propertyId ID for given property
             * @returns {PropertyAdaptor} PropertyAdaptor
             * @memberOf APIService
             */
            getPropertyById : function(propertyId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/communitree/getpropertyinformobile?callback=JSON_CALLBACK&devicetypeid=1&communitreeid=" + propertyId,
                    transformResponse: function(data) {
                        var parsedData = angular.fromJson(data);
                        if (parsedData.hasOwnProperty('r')) {
                            var jsonData = parsedData["r"];
                            return PropertyTransformerService.fromJSON(jsonData);
                        } else {
                            deferred.reject("No object found");
                        }
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            /**
             * @desc Fetch recommendations for property and category
             * @param {number} propertyId ID for given property
             * @param {number} categoryId ID for given category
             * @returns {RecommendationAdaptor[]} Recommendation
             * @memberOf APIService
             */
            fetchRecommendationsByCategoryId : function(propertyId, categoryId, page) {

                page = typeof page === 'undefined' ? 1 : page;

                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/mood/recsandconciergespaginated?callback=JSON_CALLBACK&communitreeid=" + propertyId + "&moodid=" + categoryId + "&devicetypeid=2&page=" + page,
                    transformResponse: function(data) {
                        return _parsePaginatedRecommendations(data);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },


            /**
             * @desc Fetch featured items for property ID
             * @param {number} propertyId ID for given property
             * @returns {FeaturedAdaptor[]} Featured items
             * @memberOf APIService
             */
            fetchFeaturedByPropertyId : function(propertyId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/communitree/OSfeatured?callback=JSON_CALLBACK&multireturn=1&communitreeid=" + propertyId,
                    transformResponse: function(data) {
                        var jsonData = angular.fromJson(data)["r"];
                        return RecommendationTransformerService.fromJSON(jsonData);
                    }
                })
                .success(function(data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            },

            /**
             * @desc Fetch categories for property ID
             * @param {number} propertyId ID for given property
             * @returns {CategoryAdaptor[]} Categories
             * @memberOf APIService
             */
            fetchCategoriesByPropertyId : function(propertyId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/mood/moodsforwebcommunitree?callback=JSON_CALLBACK&communitreeid=" + propertyId,
                    transformResponse: function(data) {
                        var jsonData = data["r"]["data"];
                        return CategoryTransformerService.fromJSON(jsonData);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            fetchLocalistaRecommendations : function(propertyId, localistaId, page) {

                page = typeof page === 'undefined' ? 1 : page;

                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/concierge/conciergerecspaginated?callback=JSON_CALLBACK&conciergeid=" + localistaId + "&page=" + page + "&multireturn=1&communitreeid=" + propertyId,
                    transformResponse: function(data) {
                        return _parsePaginatedRecommendations(data);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            fetchPropertiesByBrand : function(brandId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/communitree/getPropertiesByBrand?forsearch=1&brandid=" + brandId,
                    params: {
                        format: 'jsonp',
                        callback: 'JSON_CALLBACK'
                    }
                })
                    .success(function(res) {
                        deferred.resolve(res.r.data);
                    });

                return deferred.promise;
            },

            /**
             * Get localista by property id
             * @param {number} propertyId ID for given property
             * @param {number} localistaId
             * @returns {$promise} Deferred promise
             * @memberOf APIService
             */
            getLocalistaForPropertyId : function(propertyId, localistaId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/concierge/get?callback=JSON_CALLBACK&conciergeprofileid=" + localistaId,
                    transformResponse: function(data) {
                        var jsonData = angular.fromJson(data)["r"];
                        return LocalistaProfileTransformerService.fromJSON(jsonData);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            /**
             * Get localista summary by property id
             * Returns basically a localista without recs
             * @param {number} propertyId ID for given property
             * @returns {$promise} Deferred promise
             * @memberOf APIService
             */
            getLocalistaSummaryForPropertyId : function(propertyId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/concierge/getforcommunitree?callback=JSON_CALLBACK&communitreeid=" + propertyId,
                    transformResponse: function(data) {
                        var jsonData = angular.fromJson(data)["r"][0];
                        return LocalistaProfileTransformerService.fromJSON(jsonData);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            },

            /**
             * Get recommendation for by id
             * @param {number} propertyId ID for given property
             * @param {number} recId ID for given recommendation
             * @returns {RecommendationAdaptor} Target recommendation
             * @memberOf APIService
             */
            getRecommendationById : function(propertyId, recId) {
                var deferred = $q.defer();
                $http({
                    method: "JSONP",
                    url: ConfigService.API_BASE_URL + "/xhr/histree/getdetailedrecommendationinfo?callback=JSON_CALLBACK&multireturn=1&communitreeid=" + propertyId + "&histreeid=" + recId,
                    transformResponse: function(data) {
                        var jsonData = angular.fromJson(data)["r"][0];
                        return RecommendationTransformerService.fromJSON(jsonData);
                    }
                })
                    .success(function(data) {
                        deferred.resolve(data);
                    });

                return deferred.promise;
            }

        }
    }

})();
