import template from './dashboardFilter.template.html';

export function DashboardFilter () {
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.labelWorkspace = 'Workspace';
            scope.placeholderWorkspace = 'Seleziona workspace';
            scope.typeWorkspace = 'workspace';
            scope.workspaceList = [{
                label: 'w1',
                value: 1
            }, {
                label: 'w2',
                value: 2
            }, {
                label: 'w3',
                value: 3
            }, {
                label: 'w4',
                value: 4
            }];
            scope.workspaceSelected = {};

            scope.labelDescription = 'Descrizione';
            scope.placeholderDescription = 'Seleziona descrizione';
            scope.typeDescrizione = 'descrizione';
            scope.descriptionList = [{
                label: 'd1',
                value: 1
            }, {
                label: 'd2',
                value: 2
            }, {
                label: 'd3',
                value: 3
            }, {
                label: 'd4',
                value: 4
            }];
            scope.descriptionSelected = {};

            scope.startDate = 'GG/MM/AAAA';
            scope.labelStartDate = 'Data inizio';

            scope.endDate = 'GG/MM/AAAA';
            scope.labelEndDate = 'Data fine';

            scope.change = () => {
                console.log(scope.workspaceSelected);
            };
        }
    };
}
