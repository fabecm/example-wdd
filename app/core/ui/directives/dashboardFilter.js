import $ from 'jquery';

import template from './dashboardFilter.template.html';

export function DashboardFilter ($log, $state, WddCacheService, WDDAlert) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&',
            typePage: '@'
        },
        template: template,
        link: (scope) => {
            scope.promises = {};

            if ($(window).width() <= 1280) {
                scope.showCollapser = true;
            }

            scope.filterKey = `filter_${$state.$current.name.replace(/\./g, '_')}`;

            scope.labelWorkspace = 'Workspace';
            scope.placeholderWorkspace = 'Tutti';
            scope.typeWorkspace = 'workspace';

            scope.labelDescription = 'Descrizione';
            scope.placeholderDescription = 'Tutte';
            scope.typeDescrizione = 'description';

            scope.labelStatus = 'Stato';
            scope.placeholderStatus = 'Tutti';
            scope.typeStatus = 'status';

            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                scope.workspaceSelected = WddCacheService.getCachedFilter(scope.filterKey).workspaceSelected ? WddCacheService.getCachedFilter(scope.filterKey).workspaceSelected : {};
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                scope.descriptionSelected = WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected ? WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected : {};
                scope.statusSelected = WddCacheService.getCachedFilter(scope.filterKey).statusSelected ? WddCacheService.getCachedFilter(scope.filterKey).statusSelected : {};
                scope.startDate = WddCacheService.getCachedFilter(scope.filterKey).startDate ? WddCacheService.getCachedFilter(scope.filterKey).startDate : 'GG/MM/AAAA';
                scope.endDate = WddCacheService.getCachedFilter(scope.filterKey).endDate ? WddCacheService.getCachedFilter(scope.filterKey).endDate : 'GG/MM/AAAA';
            } else {
                scope.workspaceSelected = {
                    value: -1
                };
                scope.descriptionSelected = {
                    value: -1
                };
                scope.statusSelected = {
                    value: -1
                };
            }

            // getStatusList(scope, FilterWorkspace);

            // scope.startDate = 'GG/MM/AAAA';
            scope.labelStartDate = 'Data inizio dal';

            // scope.endDate = 'GG/MM/AAAA';
            scope.labelEndDate = 'Data fine al';

            scope.ableSearchButton = () => {
                if (!scope.workspaceSelected && !scope.descriptionSelected && !scope.statusSelected && !scope.startDate && !scope.endDate) {
                    return true;
                }
                return false;
            };

            scope.resetFilter = () => {
                scope.workspaceSelected.value = -1;
                scope.descriptionSelected.value = -1;
                scope.statusSelected.value = -1;
                scope.startDate = undefined;
                // scope.startDate = 'GG/MM/AAAA';
                scope.endDate = undefined;
                // scope.endDate = 'GG/MM/AAAA';

                WddCacheService.unCacheFilter(scope.filterKey);

                scope.setFilter();

                if (scope.showCollapser) {
                    scope.isFilterActive = false;
                }
            };

            scope.expandableFilter = () => {
                scope.isFilterActive = !scope.isFilterActive;
            };

            scope.setFilter = () => {
                WDDAlert.removeAlert();
                if (scope.showCollapser) {
                    scope.isFilterActive = true;
                }

                let param = {};

                if (scope.workspaceSelected && scope.workspaceSelected.value !== -1) {
                    param.workspaceSelected = scope.workspaceSelected.value;
                }
                if (scope.descriptionSelected && scope.descriptionSelected.value !== -1) {
                    param.descriptionSelected = scope.descriptionSelected.value;
                }
                if (scope.statusSelected && scope.statusSelected.value !== -1) {
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
                    endDate: scope.endDate,
                    isFilterActive: scope.isFilterActive
                });

                $log.debug(param);
                scope.appliedFilter({
                    filterApplied: param
                });
            };

            scope.$on('$destroy', function () {
                $(document).off('click');
            });
        }
    };
}
