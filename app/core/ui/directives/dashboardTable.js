import template from './dashboardTable.template.html';

export function DashboardTable (WorkspaceService, $log, $state, $filter) {
    'ngInject';
    return {
        scope: {
            tableTitle: '@',
            bgcolor: '@',
            tableBody: '=',
            headerType: '=',
            childPage: '@'
        },
        template: template,
        link: (scope) => {
            scope.headerArray = scope.headerType;

            scope.$watch('tableBody', () => {
                scope.tableBodyParsed = scope.tableBody.map(obj => {
                    for (let field in obj) {
                        if (obj[field] && obj[field].date) {
                            obj[field].label = $filter('date')(obj[field].date, 'shortDate');
                        }
                    }
                    return obj;
                });
            });

            scope.goToChildPage = () => {
                $state.go(scope.childPage);
            };
        }
    };
}
