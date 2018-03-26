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
            if (!scope.cell || (!scope.cell.length && scope.cell.length !== 0)) {
                scope.parsedCell = [scope.cell];
            } else {
                scope.parsedCell = scope.cell;
            }

            if (scope.header === 'business_rule' 
                || scope.header === 'tech_rule' 
                || scope.header === 'business_data' 
                || scope.header === 'business_glossary' ) {
                if (scope.parsedCell && scope.parsedCell.length && scope.parsedCell[0].label) {
                    scope.parsedCell = [{
                        icon: 'glyphicon glyphicon-ok'
                    }];
                } 
                return;
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
