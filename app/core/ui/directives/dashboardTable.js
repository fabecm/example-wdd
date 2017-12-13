import template from './dashboardTable.template.html';

export function DashboardTable (WorkspaceService) {
    'ngInject';
    return {
        scope: {
            title: '@',
            bgcolor: '@'
        },
        template: template,
        link: (scope) => {
            WorkspaceService.getData().then(res => {
                scope.dataList = res;
            });
        }
    };
}
