(function () {

    'use strict';

    angular
        .module('ourstay')
        .constant('_', window._)
        .constant('Modernizr', Modernizr)
        .constant('PointerEventsPolyfill', window.PointerEventsPolyfill)
        .constant('google', google);

})();
