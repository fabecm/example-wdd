import template from './wddFilter.template.html';

export function WddFilter ($q, ClassificationService) {
    'ngInject';
    return {
        scope: {
            appliedFilter: '&'
        },
        template: template,
        link: (scope) => {
            scope.filtersArray = [];
            scope.filterSetted = [];

            let getStandardFilter = () => {
                return $q.all([ClassificationService.getEntity(), ClassificationService.getAttribute()])
                    .then(data => {
                        return {
                            entity: data[0],
                            attribute: data[1]
                        };
                    });
            };

            let initFilter = () => {
                getStandardFilter().then(res => {
                    scope.filtersArray = [res];
                });
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

                scope.appliedFilter(array);
            };

            scope.showFilter = () => {
                scope.isFilterActive = false;
            };

            scope.updateEntity = (filter, filterSetted) => {
                if (filterSetted.entity) {
                    return;
                }

                ClassificationService.getEntity(filter.attribute).then(res => {
                    filter.entity = res;
                });
            };

            scope.updateAttribute = (filter, filterSetted) => {
                if (filterSetted.attribute) {
                    return;
                }

                ClassificationService.getAttribute(filter.entity).then(res => {
                    filter.attribute = res;
                });
            };
        }
    };
}
