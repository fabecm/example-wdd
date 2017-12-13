import template from './wddCell.template.html';

export function WddCell () {
    return {
        scope: {
            cell: '='
            // collapse: '&',
            // cellCheckedBool: '@',
            // cellIdNum: '@',
            // modelloModel: '='
        },
        template: template,
        link: (scope) => {
            scope.test = 1;
            // try {
            //     if (scope.cellObj) {
            //         scope.cell = JSON.parse(scope.cellObj).obj;
            //     }
            //     if (scope.cellCheckedBool) {
            //         scope.cellChecked = JSON.parse(scope.cellCheckedBool).boolean;
            //     }
            //     if (scope.cellIdNum) {
            //         scope.cellId = JSON.parse(scope.cellIdNum).num;
            //     }
            // } catch (error) {
            //     console.log(error);
            // }

            // scope.collapseRow = () => {
            //     scope.collapse({cellSelected: scope.cell});
            // };

            // scope.test = () => {
            //     console.log(scope.modelloModel);
            // };
        }
    };
}
