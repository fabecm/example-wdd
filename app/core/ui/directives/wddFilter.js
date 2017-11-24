import template from './wddFilter.template.html';

export function WddFilter () {
    return {
        scope: {},
        template: template,
        link: (scope) => {
            scope.filtersArray = [];

            let initNewObjectFilter = () => {
                return {
                    entity: ['A', 'B', 'C'],
                    attribute: ['1', '2', '3'],
                    text: 'text'
                };
            };

            scope.filtersArray.push(initNewObjectFilter());

            scope.addNewFilter = () => {
                scope.filtersArray.push(initNewObjectFilter());
            };

            scope.removeFilter = (filter) => {
                if (scope.filtersArray.length === 1) {
                    return;
                }
                let indexElem = scope.filtersArray.indexOf(filter);
                scope.filtersArray.splice(indexElem, 1);
            };

            scope.setFilter = () => {
                scope.isFilterActive = true;
            };

            scope.showFilter = () => {
                scope.isFilterActive = false;
            };
        }
    };
}
