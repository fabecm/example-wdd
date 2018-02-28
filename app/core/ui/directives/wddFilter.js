import $ from 'jquery';
import template from './wddFilter.template.html';

export function WddFilter ($log, $q, ClassificationService, WddCacheService, $state, UserService, RuleProfileService, WDDAlert) {
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

            if (UserService.getGroup() === 'G_EDD_SO' || UserService.getGroup() === 'G_EDD_DQ') {
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
            } else {
                scope.filterStatus = [{
                    id: 2,
                    label: 'Produzione'
                }];
            }

            if (WddCacheService.getCachedFilter(scope.filterKey)) {
                let listFilter = WddCacheService.getCachedFilter(scope.filterKey).arrayFilter ? WddCacheService.getCachedFilter(scope.filterKey).arrayFilter : [];
                if (listFilter.length > 0) {
                    scope.filterSetted = listFilter.map((filter) => {
                        return {
                            entity: !filter.entity_id ? -1 : filter.entity_id,
                            attribute: !filter.attribute_id ? -1 : filter.attribute_id,
                            text: filter.text
                        };
                    });
                } else {
                    scope.filterSetted = listFilter;
                }
                scope.isFilterActive = WddCacheService.getCachedFilter(scope.filterKey).isFilterActive ? WddCacheService.getCachedFilter(scope.filterKey).isFilterActive : WddCacheService.getCachedFilter(scope.filterKey).isFilterActive;
                // scope.values.processOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).process_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).process_owner_id : undefined;

                if (WddCacheService.getCachedFilter(scope.filterKey).process_owner_id) {
                    scope.values.processOwnerChosen = {};
                    scope.values.processOwnerChosen.value = WddCacheService.getCachedFilter(scope.filterKey).process_owner_id;
                } else {
                    scope.values.processOwnerChosen = {};
                    scope.values.processOwnerChosen.value = -1;
                }

                if (WddCacheService.getCachedFilter(scope.filterKey).system_owner_id) {
                    scope.values.systemOwnerChosen = {};
                    scope.values.systemOwnerChosen.value = WddCacheService.getCachedFilter(scope.filterKey).system_owner_id;
                } else {
                    scope.values.systemOwnerChosen = {};
                    scope.values.systemOwnerChosen.value = -1;
                }

                // scope.values.systemOwnerChosen = WddCacheService.getCachedFilter(scope.filterKey).system_owner_id ? WddCacheService.getCachedFilter(scope.filterKey).system_owner_id : undefined;
                scope.values.statusChosen = {};
                scope.values.statusChosen.label = WddCacheService.getCachedFilter(scope.filterKey).status_code ? WddCacheService.getCachedFilter(scope.filterKey).status_code : 'Tutti';
            } else {
                scope.filterSetted = [];
                scope.values.statusChosen = {};
                scope.values.statusChosen.label = angular.copy(scope.filterStatus[0].label);

                scope.values.processOwnerChosen = {};
                scope.values.processOwnerChosen.value = -1;

                scope.values.systemOwnerChosen = {};
                scope.values.systemOwnerChosen.value = -1;
            }

            scope.promises = {};

            // scope.filterArrayBase = [];

            let initFilter = (reset) => {
                if (!reset && scope.filterSetted.length > 0) {
                    scope.filtersArray = angular.copy(scope.filterSetted);
                } else if (reset && scope.filterSetted.length === 1) {
                    scope.filtersArray = [{}];
                } else {
                    scope.filtersArray = [{}];
                    scope.filterSetted = [{
                        entity: -1,
                        attribute: -1
                    }];
                }
                scope.filterArrayBase = [{}];
            };
            initFilter(false);

            scope.addNewFilter = () => {
                scope.isFilterActive = false;
                scope.filtersArray.push([]);
                scope.filterSetted.push({
                    entity: -1,
                    attribute: -1
                });
            };

            scope.removeFilter = (filter) => {
                let indexElem = scope.filtersArray.indexOf(filter);
                if (scope.filtersArray.length === 1) {
                    initFilter(true);
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
                WDDAlert.removeAlert();
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
                        entity_id: filter.entity === -1 ? undefined : filter.entity,
                        attribute_id: filter.attribute === -1 ? undefined : filter.attribute,
                        text: filter.text
                    };
                });

                param.arrayFilter = array.array_filter_text;

                WddCacheService.cacheFilter(scope.filterKey, {
                    process_owner_id: scope.values.processOwnerChosen.value,
                    system_owner_id: scope.values.systemOwnerChosen.value,
                    status_code: scope.values.statusChosen.label,
                    arrayFilter: scope.filterSetted.map((filter) => {
                        return {
                            entity_id: filter.entity === -1 ? undefined : filter.entity,
                            attribute_id: filter.attribute === -1 ? undefined : filter.attribute,
                            text: filter.text
                        };
                    }),
                    isFilterActive: scope.isFilterActive
                });

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
                scope.values.processOwnerChosen.value = -1;
                scope.values.systemOwnerChosen.value = -1;
                scope.values.statusChosen = angular.copy(scope.filterStatus[0]);
                scope.filterSetted = [{
                    entity: -1,
                    attribute: -1
                }];
                scope.filtersArray = scope.filterArrayBase;
                WddCacheService.unCacheFilter(scope.filterKey);

                if ($state.$current.name !== 'tab.search') {
                    scope.setFilter();
                } else {
                    $state.go($state.$current.name, {}, {reload: true});
                }
                scope.isFilterActive = false;
                scope.lockSystemOwner();
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

            scope.lockSO = false;
            scope.lockSystemOwner = () => {
                let dashboards = RuleProfileService.ruleProfile.dashboards;
                let mySystemOwnerId = UserService.getSystemOwnerId();

                if (dashboards.length === 1 && dashboards[0] === 'DSBOARD_SO') {
                    if (scope.values.statusChosen.label === 'Bozza' || scope.values.statusChosen.label === 'Tutti') {
                        scope.lockSO = true;
                        scope.values.systemOwnerChosen = {};
                        scope.values.systemOwnerChosen.value = mySystemOwnerId;
                    } else {
                        scope.lockSO = false;
                    }
                }
            };
            scope.lockSystemOwner();

            scope.$on('$destroy', function () {
                $(document).off('click');
            });
        }
    };
}
