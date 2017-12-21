import template from './wddFilter.template.html';

export function WddFilter ($log, $q, ClassificationService, DatasourceService) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.filtersArray = [];
            scope.filterSetted = [];
            scope.filterStatus = [{
                label: 'Tutti'
            }, {
                label: 'Bozza'
            }, {
                label: 'Produzione'
            }];
            scope.filterArrayBase = [];

            let getStandardFilter = () => {
                return $q.all([ClassificationService.getEntity(), ClassificationService.getAttribute()])
                    .then(res => {
                        return {
                            entity: res[0].data,
                            attribute: res[1].data
                        };
                    });
            };

            let getBootstrap = () => {
                DatasourceService.getBootstrap().then(res => {
                    scope.filterBootstrap = {
                        processOwner: res.data.process_owner,
                        systemOwner: res.data.system_owner
                    };
                });
            };

            let initFilter = () => {
                getStandardFilter().then(res => {
                    scope.filtersArray = [res];
                    scope.filterArrayBase = [res];
                });
                getBootstrap();
            };
            initFilter();

            scope.addNewFilter = () => {
                scope.isFilterActive = false;
                getStandardFilter().then(res => {
                    scope.filtersArray.push(res);
                });
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
                    param.process_owner_id = scope.processOwnerChosen.id;
                }
                if (scope.systemOwnerChosen) {
                    param.system_owner_id = scope.systemOwnerChosen.id;
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

                $log.debug(param);
                scope.appliedFilter(param);
            };

            scope.showFilter = () => {
                scope.isFilterActive = false;
            };

            scope.expandableFilter = () => {
                scope.isFilterActive = !scope.isFilterActive;
            };

            scope.resetFilter = () => {
                scope.processOwnerChosen = {};
                scope.systemOwnerChosen = {};
                scope.statusChosen = {};
                scope.filterSetted = [];
                scope.filtersArray = scope.filterArrayBase;

                scope.modelle = undefined;
                scope.modellissimi = undefined;
                scope.modello = undefined;
                scope.modella = undefined;
            };

            scope.updateEntity = (filter, filterSetted) => {
                ClassificationService.getEntity(filterSetted.attribute).then(res => {
                    filter.entity = res.data;
                });
            };

            scope.updateAttribute = (filter, filterSetted) => {
                ClassificationService.getAttribute(filterSetted.entity).then(res => {
                    filter.attribute = res.data;
                });
            };
        }
    };
}
