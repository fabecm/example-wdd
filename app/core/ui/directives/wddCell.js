import template from './wddCell.template.html';

export function WddCell ($log) {
    'ngInject';
    return {
        scope: {
            cell: '=',
            header: '='
        },
        template: template,
        link: (scope) => {
            $log.debug(scope.header);
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
        }
    };
}
