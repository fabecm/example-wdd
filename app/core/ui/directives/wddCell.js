import template from './wddCell.template.html';
import $ from 'jquery';

export function WddCell($filter, $document, $timeout) {
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
            allowedColumnsDataLineage: '=?'
        },
        template: template,
        link: (scope, element) => {
            scope.visiblePopover = false;
            if (!scope.cell || (!scope.cell.length && scope.cell.length !== 0)) {
                scope.parsedCell = [scope.cell];
            } else {
                scope.parsedCell = scope.cell;
            }
            if (scope.header === 'business_rule'
                || scope.header === 'tech_rule'
                || scope.header === 'business_data'
                || scope.header === 'business_glossary') {
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

            scope.togglePopover = () => {
                scope.visiblePopover = !scope.visiblePopover;
                if (scope.visiblePopover) {
                    $timeout(function() {
                        scope.globalListener = $document.on('click', function (e) {
                            let tableCell = $(element).find('.table-cell')[0];
                            let target = ($(e.target).parents('div.table-cell').length === 0) ? e.target : $(e.target).parents('div.table-cell')[0];
                            if (tableCell !== target) {
                                scope.$apply(function () {
                                    scope.visiblePopover = false;
                                    scope.globalListener.off('click');
                                });
                            }
                        })
                    }, 100);
                }
            };
        }
    };
}
