(function() {

    'use strict';

    angular
        .module('ourstay')
        .factory('ThemeService', ThemeService);

    ThemeService.$inject = ['ConfigService', 'PubSubService'];


    /**
     * @namespace ThemeService
     * @desc Easy nav manager
     */
    function ThemeService(ConfigService, PubSubService) {

        var theme = {
          isSet: false,
          logo: 'logo-hyatt-centric_2x',
          brand: 'four-seasons',
          property: 'four-seasons'
        };

        /**
         * Set's the currently selected theme based on property ID
         * @param propertyId String the property ID to be applied (see ConfigService for full dictionary)
         */
        var setTheme = function(propertyId) {
            var prop = parseInt(propertyId);

            switch(prop) {
                case ConfigService.MIAMI_ID:
                    theme.logo =  'hyatt-miami-logo';
                    theme.brand = 'hyatt';
                    theme.property = 'hyatt-miami';
                    theme.isSet = true;
                    break;
                case ConfigService.CHICAGO_ID:
                    theme.logo =  'hyatt-chicago-logo';
                    theme.brand = 'hyatt';
                    theme.property = 'hyatt-chicago';
                    theme.isSet = true;
                    break;
                case ConfigService.FS_ID:
                    theme.logo =  'four-seasons-logo';
                    theme.brand = 'four-seasons';
                    theme.property = 'four-seasons';
                    theme.isSet = true;
                    break;
                default:
                    // theme.logo = 'logo-hyatt-centric_2x';
                    theme.logo = 'four-seasons-logo';
                    theme.brand = 'four-seasons';
                    theme.property = 'four-seasons';
                    break;
            }
            PubSubService.publish({ action: 'setTheme' });
        };

        return {
            theme: theme,
            setTheme: setTheme
        }
    }

})();
