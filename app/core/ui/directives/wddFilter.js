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
            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                scope.filterSetted = WddCacheService.getCachedFilter(scope.filterKey).arrayFilter ? WddCacheService.getCachedFilter(scope.filterKey).arrayFilter : [];
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                scope.processOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).process_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).process_owner_id : undefined;
                scope.systemOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).system_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).system_owner_id : undefined;
                scope.statusChosen = WddCacheService.getCachedFilter(scope.filterKey).status_code ? WddCacheService.getCachedFilter(scope.filterKey).status_code : undefined;
            } else {
                scope.filterSetted = [];
            }

            scope.promises = {};

            scope.filterStatus = [{
                label: 'Tutti'
            }, {
                label: 'Bozza'
            }, {
                label: 'Produzione'
            }];
            scope.statusChosen = scope.filterStatus[0];
            scope.filterArrayBase = [];

            let initFilter = () => {
                scope.filtersArray = [{}];
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

                if (scope.processOwnerChosen) {
                    param.process_owner_id = scope.processOwnerChosen;
                }
                if (scope.systemOwnerChosen) {
                    param.system_owner_id = scope.systemOwnerChosen;
                }
                if (scope.statusChosen) {
                    param.status_code = scope.statusChosen.label;
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
                    process_owner_id: scope.processOwnerChosen,
                    system_owner_id: scope.systemOwnerChosen,
                    status_code: scope.statusChosen.label,
                    arrayFilter: scope.filterSetted,
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
                scope.processOwnerChosen = undefined;
                scope.systemOwnerChosen = undefined;
                scope.statusChosen = scope.filterStatus[0];
                scope.filterSetted = [];
                scope.filtersArray = scope.filterArrayBase;
                WddCacheService.unCacheFilter(scope.filterKey);

                scope.setFilter();
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
