import template from './dashboardFilter.template.html';

export function DashboardFilter ($log) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.promises = {};

            scope.labelWorkspace = 'Workspace';
            scope.placeholderWorkspace = 'Seleziona workspace';
            scope.typeWorkspace = 'workspace';


            scope.labelDescription = 'Descrizione';
            scope.placeholderDescription = 'Seleziona descrizione';
            scope.typeDescrizione = 'description';

            scope.labelStatus = 'Stato';
            scope.placeholderStatus = 'Seleziona stato';
            scope.typeStatus = 'status';

            // getStatusList(scope, FilterWorkspace);

            scope.startDate = 'GG/MM/AAAA';
            scope.labelStartDate = 'Data inizio';

            scope.endDate = 'GG/MM/AAAA';
            scope.labelEndDate = 'Data fine';

            scope.resetFilter = () => {
                scope.workspaceSelected = {};
                scope.descriptionSelected = {};
                scope.statusSelected = {};
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
                    param.status = scope.statusSelected.value;
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

// function getStatusList (scope, FilterWorkspace) {
//     let type = 'status';
//     const statusPromise = FilterWorkspace.updateList(type);
//     scope.promises.statusPromise = statusPromise;
//     statusPromise.then(res => {
//         scope.statusList = res;
//     });
// }
