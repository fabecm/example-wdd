import template from './dashboardFilter.template.html';

export function DashboardFilter ($log, FilterWorkspace) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.labelWorkspace = 'Workspace';
            scope.placeholderWorkspace = 'Seleziona workspace';
            scope.typeWorkspace = 'workspace';
            scope.workspaceSelected = {};

            scope.promises = {};

            scope.labelDescription = 'Descrizione';
            scope.placeholderDescription = 'Seleziona descrizione';
            scope.typeDescrizione = 'description';
            scope.descriptionSelected = {};

            scope.status = {};
            scope.typeStatus = 'status';
            scope.statusList = {};

            getStatusList(scope, FilterWorkspace);

            scope.startDate = 'GG/MM/AAAA';
            scope.labelStartDate = 'Data inizio';

            scope.endDate = 'GG/MM/AAAA';
            scope.labelEndDate = 'Data fine';

            scope.change = () => {
                $log.debug(scope.workspaceSelected);
            };

            scope.resetFilter = () => {
                scope.workspaceSelected = {};
                scope.descriptionSelected = {};
                scope.status = undefined;
                scope.startDate = {};
                scope.startDate = 'GG/MM/AAAA';
                scope.endDate = {};
                scope.endDate = 'GG/MM/AAAA';
            };

            scope.setFilter = () => {
                let param = {};

                if (scope.workspaceSelected) {
                    param.workspaceSelected = scope.workspaceSelected.value;
                }
                if (scope.descriptionSelected) {
                    param.descriptionSelected = scope.descriptionSelected.value;
                }
                if (scope.status) {
                    param.status = scope.status;
                }
                if (scope.startDate !== 'GG/MM/AAAA') {
                    param.startDate = scope.startDate;
                }
                if (scope.endDate !== 'GG/MM/AAAA') {
                    param.endDate = scope.endDate;
                }

                $log.debug(param);
                scope.appliedFilter({
                    filterApplied: param
                });
            };
        }
    };
}

function getStatusList (scope, FilterWorkspace) {
    let type = 'status';
    const statusPromise = FilterWorkspace.updateList(type);
    scope.promises.statusPromise = statusPromise;
    statusPromise.then(res => {
        scope.statusList = res;
    });
}
