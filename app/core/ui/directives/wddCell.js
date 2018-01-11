import template from './wddCell.template.html';

export function WddCell ($filter) {
    'ngInject';
    return {
        scope: {
            cell: '=',
            header: '='
        },
        template: template,
        link: (scope) => {
            if (scope.header === 'business_rules') {
                scope.parsedCell = [{
                    icon: 'glyphicon glyphicon-ok'
                }];
                return;
            }
            if (scope.header === 'tech_rules') {
                scope.parsedCell = [{
                    icon: 'glyphicon glyphicon-ok'
                }];
                return;
            }
            if (!scope.cell || (!scope.cell.length && scope.cell.length !== 0)) {
                scope.parsedCell = [scope.cell];
            } else {
                scope.parsedCell = scope.cell;
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
        }
    };
}
