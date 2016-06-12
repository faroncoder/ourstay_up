(function() {

    'use strict';

    /**
     * @desc Share this page with awesome friends
     * @example <share-modal>Modal Content Goes Here.</share-modal>
     */
    angular
        .module('ourstay')
        .directive('shareModal', shareModal);

    function shareModal() {

        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true,
            transclude: true,
            link: function(scope, element, attrs) {
                scope.dialogStyle = {};
                if (attrs.width)
                    scope.dialogStyle.width = attrs.width;
                if (attrs.height)
                    scope.dialogStyle.height = attrs.height;
                scope.hideModal = function() {
                    scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
        };

    }

})();
