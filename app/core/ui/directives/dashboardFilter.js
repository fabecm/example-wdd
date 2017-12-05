import template from './dashboardFilter.template.html';

export function DashboardFilter () {
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            console.log(scope);
        }
    };
}
