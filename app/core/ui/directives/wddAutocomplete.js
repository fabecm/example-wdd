import template from './wddAutocomplete.template.html';

export function WddAutocomplete (FilterWorkspace) {
    'ngInject';
    return {
        require: '^ngModel',
        scope: {
            label: '@',
            placeholder: '@',
            type: '@',
            listValues: '='
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.isListVisible = false;
            scope.model = {};

            ngModel.$render = () => {
                if (ngModel.$modelValue) {
                    scope.model.label = ngModel.$modelValue;
                }
            };

            scope.showListValues = () => {
                scope.isListVisible = !scope.isListVisible;
            };

            scope.changedLabel = () => {
                console.log(scope.model.value);
                scope.updateListValue();
            };

            scope.itemSelected = (item) => {
                ngModel.$setViewValue(item.label);
                ngModel.$render();
                scope.showListValues();
            };

            scope.updateListValue = () => {
                FilterWorkspace.updateList(scope.type, scope.model.label).then(res => {
                    scope.listValues = res;
                });
            };
        }
    };
}
