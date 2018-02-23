import $ from 'jquery';

import template from './entityFilter.template.html';

export function EntityFilter ($state, WddCacheService, WDDAlert) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&',
            typePage: '@'
        },
        template: template,
        link: (scope) => {
            scope.promise = {};

            if ($(window).width() <= 1280) {
                scope.showCollapser = true;
            }

            scope.filterKey = `filter_${$state.$current.name.replace(/\./g, '_')}`;

            scope.labelEntity = 'Tipo Entità';
            scope.placeholderEntity = 'Tutte';
            scope.typeEntity = 'entity';

            scope.labelEntityName = 'Nome Entità';
            scope.placeholderEntityName = 'Tutti';
            scope.typeEntityName = 'entityName';

            scope.labelEntityDescription = 'Descrizione';
            scope.placeholderEntityDescription = 'Tutte';
            scope.typeEntityDescription = 'entityDescription';

            scope.labelStatus = 'Stato';
            scope.placeholderStatus = 'Tutti';
            scope.typeStatus = 'status';

            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                scope.entitySelected = WddCacheService.getCachedFilter(scope.filterKey).entitySelected ? WddCacheService.getCachedFilter(scope.filterKey).entitySelected : {};
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                scope.entityNameSelected = WddCacheService.getCachedFilter(scope.filterKey).entityNameSelected ? WddCacheService.getCachedFilter(scope.filterKey).entityNameSelected : {};
                scope.descriptionSelected = WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected ? WddCacheService.getCachedFilter(scope.filterKey).descriptionSelected : {};
                scope.statusSelected = WddCacheService.getCachedFilter(scope.filterKey).statusSelected ? WddCacheService.getCachedFilter(scope.filterKey).statusSelected : {};
            } else {
                scope.entitySelected = {
                    value: -1
                };
                scope.entityNameSelected = {
                    value: -1
                };
                scope.descriptionSelected = {
                    value: -1
                };
                scope.statusSelected = {
                    value: -1
                };
            }

            scope.ableSearchButton = () => {
                if (!scope.entitySelected && !scope.entityNameSelected && !scope.descriptionSelected && !scope.statusSelected) {
                    return true;
                }
                return false;
            };

            scope.resetFilter = () => {
                scope.entitySelected.value = -1;
                scope.entityNameSelected.value = -1;
                scope.descriptionSelected.value = -1;
                scope.statusSelected.value = -1;

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

                if (scope.entitySelected && scope.entitySelected.value !== -1) {
                    param.entitySelected = scope.entitySelected.value;
                }
                if (scope.entityNameSelected && scope.entityNameSelected.value !== -1) {
                    param.entityNameSelected = scope.entityNameSelected.value;
                }
                if (scope.descriptionSelected && scope.descriptionSelected.value !== -1) {
                    param.descriptionSelected = scope.descriptionSelected.value;
                }
                if (scope.statusSelected && scope.statusSelected.value !== -1) {
                    param.status = scope.statusSelected.value;
                }

                WddCacheService.cacheFilter(scope.filterKey, {
                    entitySelected: scope.entitySelected,
                    entityNameSelected: scope.entityNameSelected,
                    descriptionSelected: scope.descriptionSelected,
                    statusSelected: scope.statusSelected,
                    isFilterActive: scope.isFilterActive
                });

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
