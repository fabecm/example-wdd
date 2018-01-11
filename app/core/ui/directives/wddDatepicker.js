import template from './wddDatepicker.template.html';

export function WddDatepicker () {
    'ngInject';
    return {
        require: '^ngModel',
        scope: {
            label: '@'
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.model = {};

            ngModel.$render = () => {
                if (ngModel.$modelValue) {
                    scope.model.date = ngModel.$modelValue;
                }
            };

            scope.options = {
                showWeeks: false,
                showButtonBar: false
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
