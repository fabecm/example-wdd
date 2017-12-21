import template from './wddAutocomplete.template.html';

export function WddAutocomplete ($log, FilterWorkspace) {
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
                if(ngModel.$modelValue) {
                    scope.model.label = ngModel.$modelValue;
                } else {
                    scope.model = {};
                }
                $log.debug(scope.model);
            };

            scope.showListValues = () => {
                scope.isListVisible = !scope.isListVisible;
            };

            scope.changedLabel = () => {
                ngModel.$setViewValue(scope.model.label);
                ngModel.$setValidity('incomplete', false);
                ngModel.$render();
                $log.debug(scope.model.value);
                scope.updateListValue();
            };

            scope.itemSelected = (item) => {
                ngModel.$setViewValue(item.label);
                ngModel.$setValidity('incomplete', true);
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
