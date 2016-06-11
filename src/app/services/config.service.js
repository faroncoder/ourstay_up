(function() {

    'use strict';
    angular
        .module('ourstay')
        .factory('ConfigService', ConfigService);

    /**
    * @namespace ConfigService
    * @desc Holds global variables
    * @property {string} API_BASE_URL - The base URL for the OurStay API
    */
    function ConfigService() {

        var CHICAGO_ID = 288;
        var MIAMI_ID = 286;
        var FS_ID = 1083;

        var data = {
            API_BASE_URL : "http://fsd.ourstay.com",
            SITE_NAME: "Four Seasons",
            SITE_DESCRIPTION: "",
            GOOGLE_MAPS_API_KEY: "AIzaSyB7kLt-ZwwJ-0bLjeJLbuxqkoidWTdWTZI",
            CHICAGO_ID: CHICAGO_ID,
            MIAMI_ID: MIAMI_ID,
            MAX_WALKING_MINUTES: 30,


            PROPERTY_TO_LOCALISTA_MAP: {}
        };

        data["PROPERTY_TO_LOCALISTA_MAP"][MIAMI_ID] = 908;
        data["PROPERTY_TO_LOCALISTA_MAP"][CHICAGO_ID] = 907;

        return data;
    }

})();
