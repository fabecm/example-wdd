import template from './wddRow.template.html';

export function WddRow () {
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
            hasInfoBtn: '=',
            hasCreation: '='
        },
        template: template,
        link: (scope) => {
            if (scope.rowChecked || scope.rowCollapse) {
                scope.action = true;
            }

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation) {
                scope.hasIcon = true;
            }

            console.log(scope.rowData);

            scope.arrayAction = ['collapse', 'checked', 'info', 'primaryNavigation', 'secondaryNavigation'];
            // scope.modelloModel = {};

            scope.doAction = (act) => {
                let forRow = {
                    key: scope.rowKey,
                    action: act
                };

                scope.actionFunction({rowSelected: forRow});
            };
        }
    };
}
