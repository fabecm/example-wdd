import template from './wddFilter.template.html';

export function WddFilter ($log, $q, ClassificationService, WddCacheService, $state) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&',
            hideFirstLine: '@',
            showStatusInput: '@'
        },
        template: template,
        link: (scope) => {
            scope.filterKey = `filter_${$state.$current.name.replace(/\./g, '_')}`;
            scope.filtersArray = [];
            scope.values = {};
            scope.filterStatus = [{
                id: 0,
                label: 'Tutti'
            }, {
                id: 1,
                label: 'Bozza'
            }, {
                id: 2,
                label: 'Produzione'
            }];

            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                let listFilter = WddCacheService.getCachedFilter(scope.filterKey).arrayFilter ? WddCacheService.getCachedFilter(scope.filterKey).arrayFilter : [];
                if (listFilter.length > 0) {
                    scope.filterSetted = listFilter.map((filter) => {
                        return {
                            entity: filter.entity_id,
                            attribute: filter.attribute_id,
                            text: filter.text
                        };
                    });
                } else {
                    scope.filterSetted = listFilter;
                }
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                scope.values.processOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).process_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).process_owner_id : undefined;
                scope.values.systemOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).system_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).system_owner_id : undefined;
                scope.values.statusChosen = {};
                scope.values.statusChosen.label = WddCacheService.getCachedFilter(scope.filterKey).status_code ? WddCacheService.getCachedFilter(scope.filterKey).status_code : 'Tutti';
            } else {
                scope.filterSetted = [];
                scope.values.statusChosen = {};
                scope.values.statusChosen.label = angular.copy(scope.filterStatus[0].label);
            }

            scope.promises = {};

            scope.filterArrayBase = [];

            let initFilter = () => {
                if (scope.filterSetted.length > 0) {
                    scope.filtersArray = scope.filterSetted;
                } else {
                    scope.filtersArray = [{}];
                }
                scope.filterArrayBase = [{}];
            };
            initFilter();

            scope.addNewFilter = () => {
                scope.isFilterActive = false;
                scope.filtersArray.push([]);
            };

            scope.removeFilter = (filter) => {
                let indexElem = scope.filtersArray.indexOf(filter);
                if (scope.filtersArray.length === 1) {
                    initFilter();
                    scope.filterSetted.splice(indexElem, 1);
                } else {
                    scope.filtersArray.splice(indexElem, 1);
                    scope.filterSetted.splice(indexElem, 1);
                }
            };

            scope.checkTextTyped = () => {
                let filtered = scope.filterSetted.filter(fil => {
                    return fil.text && (fil.text.length > 2);
                });
                return scope.filtersArray.length > 0 && filtered.length === scope.filtersArray.length;
            };

            scope.setFilter = () => {
                scope.isFilterActive = true;

                let param = {};

                if (scope.values.processOwnerChosen) {
                    param.process_owner_id = scope.values.processOwnerChosen.value;
                }
                if (scope.values.systemOwnerChosen) {
                    param.system_owner_id = scope.values.systemOwnerChosen.value;
                }
                if (scope.values.statusChosen) {
                    param.status_code = scope.values.statusChosen.label;
                }

                let array = {};
                array.array_filter_text = scope.filterSetted.map((filter) => {
                    return {
                        entity_id: filter.entity,
                        attribute_id: filter.attribute,
                        text: filter.text
                    };
                });

                param.arrayFilter = array.array_filter_text;

                WddCacheService.cacheFilter(scope.filterKey, {
                    process_owner_id: scope.values.processOwnerChosen,
                    system_owner_id: scope.values.systemOwnerChosen,
                    status_code: scope.values.statusChosen.label,
                    arrayFilter: scope.filterSetted.map((filter) => {
                        return {
                            entity_id: filter.entity,
                            attribute_id: filter.attribute,
                            text: filter.text
                        };
                    }),
                    isFilterActive: scope.isFilterActive
                });

                $log.debug(param);
                scope.appliedFilter({
                    filterApplied: param
                });
            };

            scope.showFilter = () => {
                scope.isFilterActive = false;
            };

            scope.expandableFilter = () => {
                scope.isFilterActive = !scope.isFilterActive;
            };

            scope.resetFilter = () => {
                scope.values.processOwnerChosen = undefined;
                scope.values.systemOwnerChosen = undefined;
                scope.values.statusChosen = angular.copy(scope.filterStatus[0]);
                scope.filterSetted = [];
                scope.filtersArray = scope.filterArrayBase;
                WddCacheService.unCacheFilter(scope.filterKey);

                if ($state.$current.name !== 'tab.search') {
                    scope.setFilter();
                }
                scope.isFilterActive = false;
            };

            scope.updateEntity = (filter, filterSetted) => {
                scope.getEntityPromise = ClassificationService.getEntity(filterSetted.attribute);
                scope.getEntityPromise.then(res => {
                    filter.entity = res.data;
                });
            };

            scope.updateAttribute = (filter, filterSetted) => {
                scope.getAttributePromise = ClassificationService.getAttribute(filterSetted.entity);
                scope.getAttributePromise.then(res => {
                    filter.attribute = res.data;
                });
            };
        }
    };
}
