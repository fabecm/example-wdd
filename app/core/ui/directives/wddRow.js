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
            statusToDisabledCreation: '=',
            isFromChildTable: '=',
            isSas: '=',
            checkRow: '&'
        },
        template: template,
        link: (scope) => {
            if (scope.rowChecked || scope.rowCollapse) {
                scope.action = true;
            }

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation) {
                scope.hasIcon = true;
            }

            // $log.debug(scope.rowData);

            scope.arrayAction = ['collapse', 'checked', 'info', 'primaryNavigation', 'secondaryNavigation', 'creation', 'ternaryNavigation'];
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
