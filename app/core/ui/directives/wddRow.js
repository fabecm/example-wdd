import template from './wddRow.template.html';

export function WddRow () {
    'ngInject';
    return {
        scope: {
            rowData: '=',
            column: '=',
            actionFunction: '&',
            rowKey: '=',
            rowChecked: '=',
            rowCollapse: '=',
            hasPrimaryNavigationBtn: '=',
            hasSecondaryNavigationBtn: '=',
            hasTernaryNavigationBtn: '=',
            hasInfoBtn: '=',
            hasCreation: '=',
            hasRelationModal: '=',
            statusToDisabledCreation: '=',
            isFromChildTable: '=',
            isSas: '=',
            checkRow: '&',
            navigationInPopover: '='
        },
        template: template,
        link: (scope) => {
            scope.navigationInPopover = (scope.navigationInPopover !== 'true') ? false : true;
            if (scope.rowChecked || scope.rowCollapse) {
                scope.action = true;
            }

            if (!scope.navigationInPopover && (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation)) {
                scope.hasIcon = true;
            }

            // $log.debug(scope.rowData);

            scope.arrayAction = [
                'collapse',
                'checked',
                'info',
                'primaryNavigation',
                'secondaryNavigation',
                'creation',
                'ternaryNavigation',
                'showRelation'
            ];
            // scope.modelloModel = {};

            scope.doAction = (act) => {
                let forRow = {
                    key: scope.rowKey,
                    action: act
                };

                scope.actionFunction({rowSelected: forRow});
            };

            scope.hideCreation = () => {
                if (scope.rowData.status.label === scope.statusToDisabledCreation) {
                    return false;
                }
                return true;
            };

            scope.checkData = () => {
                scope.checkRow({
                    data: scope.rowData
                });
            };
        }
    };
}
