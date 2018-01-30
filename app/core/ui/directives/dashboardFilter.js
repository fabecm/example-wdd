import template from './dashboardFilter.template.html';

export function DashboardFilter ($log, $state, WddCacheService) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&',
            typePage: '@'
        },
        template: template,
        link: (scope) => {
            scope.promises = {};
            scope.filterKey = `filter_${$state.$current.name.replace(/\./g, '_')}`;

            scope.labelWorkspace = 'Workspace';
            scope.placeholderWorkspace = 'Seleziona workspace';
            scope.typeWorkspace = 'workspace';

            scope.labelDescription = 'Descrizione';
            scope.placeholderDescription = 'Seleziona descrizione';
            scope.typeDescrizione = 'description';

            scope.labelStatus = 'Stato';
            scope.placeholderStatus = 'Seleziona stato';
            scope.typeStatus = 'status';

            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                scope.workspaceSelected = WddCacheService.getCachedFilter(scope.filterKey).workspaceSelected ? WddCacheService.getCachedFilter(scope.filterKey).workspaceSelected : {};
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                scope.descriptionSelected = WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected ? WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected : {};
                scope.statusSelected = WddCacheService.getCachedFilter(scope.filterKey).statusSelected ? WddCacheService.getCachedFilter(scope.filterKey).statusSelected : {};
                scope.startDate = WddCacheService.getCachedFilter(scope.filterKey).startDate ? WddCacheService.getCachedFilter(scope.filterKey).startDate : 'GG/MM/AAAA';
                scope.endDate = WddCacheService.getCachedFilter(scope.filterKey).endDate ? WddCacheService.getCachedFilter(scope.filterKey).endDate : 'GG/MM/AAAA';
            }

            // getStatusList(scope, FilterWorkspace);

            scope.startDate = 'GG/MM/AAAA';
            scope.labelStartDate = 'Data inizio dal';

            scope.endDate = 'GG/MM/AAAA';
            scope.labelEndDate = 'Data fine al';

            scope.resetFilter = () => {
                scope.workspaceSelected = {};
                scope.descriptionSelected = {};
                scope.statusSelected = {};
                scope.startDate = {};
                scope.startDate = 'GG/MM/AAAA';
                scope.endDate = {};
                scope.endDate = 'GG/MM/AAAA';

                WddCacheService.unCacheFilter(scope.filterKey);
            };

            scope.setFilter = () => {
                let param = {};

                if (scope.workspaceSelected) {
                    param.workspaceSelected = scope.workspaceSelected.value;
                }
                if (scope.descriptionSelected) {
                    param.descriptionSelected = scope.descriptionSelected.value;
                }
                if (scope.statusSelected) {
                    param.status = scope.statusSelected.value;
                }
                if (scope.startDate !== 'GG/MM/AAAA') {
                    param.startDate = scope.startDate;
                }
                if (scope.endDate !== 'GG/MM/AAAA') {
                    param.endDate = scope.endDate;
                }

                WddCacheService.cacheFilter(scope.filterKey, {
                    workspaceSelected: scope.workspaceSelected,
                    descriptionSelected: scope.descriptionSelected,
                    statusSelected: scope.statusSelected,
                    startDate: scope.startDate,
                    endDate: scope.endDate
                });

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
