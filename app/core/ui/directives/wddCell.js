import template from './wddCell.template.html';

export function WddCell ($filter, $document, $timeout) {
    'ngInject';
    return {
        scope: {
            cell: '=',
            header: '=',
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
            allowedColumnsDataLineage: '=?',
            tableKey: '='
        },
        template: template,
        link: (scope, element) => {
            scope.visiblePopover = false;
            let checkColumns = {
                searchPage: [
                    'business_rule',
                    'tech_rule',
                    'business_data',
                    'business_glossary'
                ],
                searchBusiness: [
                    'business_rule'
                ]
            };
            if (!scope.cell || (!scope.cell.length && scope.cell.length !== 0)) {
                scope.parsedCell = [scope.cell];
            } else {
                scope.parsedCell = scope.cell;
            }
            if (checkColumns[scope.tableKey] && checkColumns[scope.tableKey].indexOf(scope.header) !== -1) {
                if (scope.parsedCell && scope.parsedCell.length && scope.parsedCell[0].label) {
                    scope.parsedCell[0].icon = 'glyphicon glyphicon-ok';
                }
            }
            if (scope.header === 'workspace') {
                scope.navigationInPopover = false;
            }

            if (scope.parsedCell && scope.parsedCell.map) {
                scope.parsedCell.map(cell => {
                    if (cell && cell.date) {
                        cell.label = $filter('date')(cell.date, 'shortDate');
                        scope.isDate = true;
                    }
                    return cell;
                });
            }

            scope.togglePopover = (index) => {
                let coords = element[0].getBoundingClientRect();
                let windowHeight = window.innerHeight;
                scope.coordLeft = coords.left + (coords.right-coords.left)/2 - 60;
                scope.coordLeft += 'px';
                scope.coordTop = coords.bottom + 10;
                scope.coordTop += 'px';
                scope.coordFlip = windowHeight - (coords.top - 10);
                scope.coordFlip += 'px';
                $timeout(function () {
                    scope.clickListener = $document.on('click', function () {
                        scope.$apply(function () {
                            scope.visiblePopover = false;
                            scope.clickListener.off('click');
                        });
                    });
                    document.addEventListener('scroll', function () {
                        scope.$apply(function () {
                            scope.visiblePopover = false;
                        });
                    }, true);
                    scope.visiblePopover = !scope.visiblePopover;
                    scope.whatPopoverVisibile = index;
                }, 100);
            };

            scope.checkPopover = (index) => {
                if (parseInt(index, 10) === parseInt(scope.whatPopoverVisibile, 10)) {
                    return true;
                }
                return false;
            };
        }
    };
}
