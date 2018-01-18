import template from './wddFilter.template.html';

export function WddFilter($log, $q, ClassificationService, $rootScope) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.filtersArray = [];
            scope.filterSetted = $rootScope.appliedFilter.arrayFilter ? $rootScope.appliedFilter.arrayFilter : [];

            scope.promises = {};

            scope.filterStatus = [{
                label: 'Tutti'
            }, {
                label: 'Bozza'
            }, {
                label: 'Produzione'
            }];
            scope.filterArrayBase = [];

            scope.isFilterActive = $rootScope.appliedFilter.isFilterActive ? $rootScope.appliedFilter.isFilterActive : $rootScope.appliedFilter.isFilterActive;

            scope.processOwnerChosen = $rootScope.appliedFilter.process_owner_id ? $rootScope.appliedFilter.process_owner_id : undefined;
            scope.systemOwnerChosen = $rootScope.appliedFilter.system_owner_id ? $rootScope.appliedFilter.system_owner_id : undefined;
            scope.statusChosen = $rootScope.appliedFilter.status_code ? $rootScope.appliedFilter.status_code : undefined;

            // let getBootstrap = () => {
            //     DatasourceService.getBootstrap().then(res => {
            //         scope.filterBootstrap = {
            //             processOwner: res.data.process_owner,
            //             systemOwner: res.data.system_owner
            //         };
            //     });
            // };

            let initFilter = () => {
                scope.filtersArray = [{}];
                scope.filterArrayBase = [{}];
                // getBootstrap();
            };
            initFilter();

            scope.addNewFilter = () => {
                scope.isFilterActive = false;
                scope.filtersArray.push([]);
            };

            scope.$on('$destroy', () => {
                $rootScope.appliedFilter = {
                    process_owner_id: scope.processOwnerChosen,
                    system_owner_id: scope.systemOwnerChosen,
                    status_code: scope.statusChosen,
                    arrayFilter: scope.filterSetted,
                    isFilterActive: scope.isFilterActive
                };
            });

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

                let array = {};
                array.array_filter_text = scope.filterSetted.map((filter) => {
                    return {
                        entity_id: filter.entity,
                        attribute_id: filter.attribute,
                        text: filter.text
                    };
                });

                let param = {
                    process_owner_id: scope.processOwnerChosen,
                    system_owner_id: scope.systemOwnerChosen,
                    status_code: scope.statusChosen,
                    arrayFilter: array.array_filter_text
                };

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
                $rootScope.appliedFilter = {};
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