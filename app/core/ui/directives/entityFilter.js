import $ from 'jquery';

import template from './entityFilter.template.html';

export function EntityFilter ($state, WddCacheService) {
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
            }

            scope.ableSearchButton = () => {
                if (!scope.entitySelected && !scope.entityNameSelected && !scope.descriptionSelected && !scope.statusSelected) {
                    return true;
                }
                return false;
            };

            scope.resetFilter = () => {
                scope.entitySelected = undefined;
                scope.entityNameSelected = undefined;
                scope.descriptionSelected = undefined;
                scope.statusSelected = undefined;

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
                if (scope.showCollapser) {
                    scope.isFilterActive = true;
                }

                let param = {};

                if (scope.entitySelected) {
                    param.entitySelected = scope.entitySelected.value;
                }
                if (scope.entityNameSelected) {
                    param.entityNameSelected = scope.entityNameSelected.value;
                }
                if (scope.descriptionSelected) {
                    param.descriptionSelected = scope.descriptionSelected.value;
                }
                if (scope.statusSelected) {
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
        }
    };
}
