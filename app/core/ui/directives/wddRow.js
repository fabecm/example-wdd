import template from './wddRow.template.html';

export function WddRow () {
    return {
        scope: {
            rowDataObj: '=',
            columnObj: '='
        },
        template: template,
        link: (scope) => {
            console.log(scope.rowDataObj, scope.columnObj);
        }
    };
}
