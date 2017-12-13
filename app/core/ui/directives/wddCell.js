import template from './wddCell.template.html';

export function WddCell () {
    return {
        scope: {
            cell: '='
        },
        template: template,
        link: (scope) => {
            if (!scope.cell || (!scope.cell.length && scope.cell.length !== 0)) {
                scope.parsedCell = [scope.cell];
            } else {
                scope.parsedCell = scope.cell;
            }
        }
    };
}
