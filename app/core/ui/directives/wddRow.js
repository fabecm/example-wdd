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
            navigationInPopover: '=',
            allowedColumnsDataLineage: '=?',
            tableKey: '='
        },
        template: template,
        link: (scope) => {
            if (scope.rowChecked || scope.rowCollapse) {
                scope.action = true;
            }

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation) {
                scope.hasIcon = true;
            }

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

            scope.doAction = (act) => {
                let forRow = {
                    key: scope.rowKey,
                    action: act
                };
                scope.actionFunction({rowSelected: forRow });
                
            };

            scope.checkData = () => {
                scope.checkRow({
                    data: scope.rowData
                });
            };
        }
    };
}
