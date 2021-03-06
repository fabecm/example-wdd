import template from './wddDatepicker.template.html';

export function WddDatepicker () {
    'ngInject';
    return {
        require: '^ngModel',
        scope: {
            label: '@',
            dependence: '=',
            limit: '@',
            isEditable: '='
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.model = {};

            scope.options = {
                showWeeks: false,
                showButtonBar: false
            };

            scope.$watch('dependence', (newVal) => {
                if (scope.limit === 'max') {
                    scope.options.maxDate = new Date(newVal);
                } else if (scope.limit === 'min') {
                    scope.options.minDate = new Date(newVal);
                }
            });

            ngModel.$render = () => {
                if (ngModel.$modelValue) {
                    scope.model.date = ngModel.$modelValue;
                } else {
                    scope.model.date = undefined;
                }
            };

            scope.popup = {
                opened: false
            };

            scope.format = 'dd/MM/yyyy';

            scope.openDatepicker = () => {
                scope.popup.opened = true;
            };

            scope.$watch('model.date', (newVal) => {
                ngModel.$setViewValue(newVal);
                ngModel.$render();
            });
        }
    };
}
