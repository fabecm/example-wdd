import template from './tableIconMenu.template.html';

export function TableIconMenu () {
    'ngInject';
    return {
        scope: {
            navigationInPopover: '=',
            hasPrimaryNavigationBtn: '=',
            hasSecondaryNavigationBtn: '=',
            hasTernaryNavigationBtn: '=',
            hasInfoBtn: '=',
            actionFunction: '&',
            hasCreation: '=',
            hasRelationModal: '=',
            isSas: '=',
            rowData: '=',
            rowKey: '=',
            cell: '=?',
            columnHeader: '=?',
            allowedColumnsDataLineage: '=?'
        },
        template: template,
        link: (scope) => {
            scope.navigationInPopover = (scope.navigationInPopover !== 'true') ? false : true;
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

            if (scope.hasPrimaryNavigationBtn || scope.hasSecondaryNavigationBtn || scope.hasInfoBtn || scope.hasCreation) {
                scope.hasIcon = true;
            }

            scope.isAllowedColumnDataLineage = true;
            if (scope.navigationInPopover && scope.allowedColumnsDataLineage.length > 0 && scope.allowedColumnsDataLineage.indexOf(scope.columnHeader) === -1) {
                scope.isAllowedColumnDataLineage = false;
            }


            scope.doAction = (act) => {
                let forRow = {
                    key: scope.rowKey,
                    action: act
                };
                if (scope.navigationInPopover) {
                    forRow.cell = scope.cell;
                    scope.actionFunction({rowSelected: { rowSelected: { rowSelected: forRow } } });
                } else {
                    scope.actionFunction({ rowSelected: { rowSelected: forRow } });
                }
            };

            scope.hideCreation = () => {
                if (scope.rowData.status.label === scope.statusToDisabledCreation) {
                    return false;
                }
                return true;
            };
        }
    };
}
