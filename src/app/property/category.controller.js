(function() {

    'use strict';

    angular
        .module('ourstay')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['ConfigService'];

    /**
    * @class
    * @desc Handles showing list of categories for given propertyID
    * @param {ConfigService} ConfigService Holder of global values
    * @memberOf Controllers
    */
    function CategoryController(ConfigService) {
        var vm = this;
    }

    initialize();

    /**
    * Starts up all necessary components and is triggered on instantiation
    */
    function initialize() {

    }

})();
