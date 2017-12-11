import template from './wddCell.template.html';

export function WddCell () {
    return {
        scope: {
            cell: '='
        },
        template: template,
        link: (scope) => {
            console.log(scope.cell);
        }
    };
}
