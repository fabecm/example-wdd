import template from './wddCell.template.html';

export function WddCell () {
    return {
        scope: {
            cell: '=',
            header: '='
        },
        template: template,
        link: (scope) => {
            console.log(scope.header);
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
