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
            rowKey: '='
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

            scope.doAction = (act) => {
                let forRow = {
                    key: scope.rowKey,
                    action: act
                };
                if (scope.navigationInPopover) {
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
