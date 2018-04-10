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
            if (scope.rowChecked || scope.rowCollapse) {
                scope.action = true;
            }

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation) {
                scope.hasIcon = true;
            }

            scope.checkData = () => {
                scope.checkRow({
                    data: scope.rowData
                });
            };
        }
    };
}
