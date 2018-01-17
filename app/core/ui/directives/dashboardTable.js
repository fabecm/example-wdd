import template from './dashboardTable.template.html';

export function DashboardTable (WorkspaceService, $log, $state, $filter) {
    'ngInject';
    return {
        scope: {
            tableTitle: '@',
            bgcolor: '@',
            tableBody: '=',
            headerType: '=',
            childPage: '@',
            promise: '='
        },
        template: template,
        link: (scope) => {
            scope.headerArray = scope.headerType;

            if (scope.promise) {
                scope.promise
                    .then(() => {
                        scope.isErrored = false;
                    })
                    .catch(() => {
                        scope.isErrored = true;
                    });
            }

            scope.$watch('tableBody', () => {
                if (!scope.tableBody) {
                    return;
                }
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
