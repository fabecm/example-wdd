import $ from 'jquery';
import template from './wddAutocomplete.template.html';

export function WddAutocomplete ($log, FilterWorkspace) {
    'ngInject';
    return {
        require: '^ngModel',
        scope: {
            label: '@',
            placeholder: '@',
            type: '@',
            dipendence: '@',
            newValue: '='
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.isListVisible = false;
            scope.model = {};

            scope.$watch('dipendence', () => {
                scope.initAutocomplete();
            });

            scope.initAutocomplete = () => {
                FilterWorkspace.updateList(scope.type, scope.model.label, scope.dipendence).then(res => {
                    scope.listValues = res;
                    scope.originalList = angular.copy(scope.listValues);
                });
            };

            ngModel.$render = () => {
                if(ngModel.$modelValue) {
                    let itemApplied = scope.listValues.find(item => item.id === ngModel.$modelValue);

                    if (itemApplied) {
                        scope.model = itemApplied;
                    } else {
                        scope.model = {};
                    }
                } else {
                    scope.model = {};
                }
                $log.debug(scope.model);
            };

            scope.showListValues = () => {
                $log.debug(scope.listValues);
                scope.isListVisible = !scope.isListVisible;
            };

            $(document).click(function (e) {
                e.stopPropagation();
                if (e.target.id === 'autocomplete-clicker') {
                    return;
                }
                if ($(e.target).parents('#autocomplete-value-list').length === 0) {
                    scope.isListVisible = false;
                    scope.$apply();
                }
            });

            scope.$on('$destroy', function () {
                $(document).off('click');
            });

            scope.changedLabel = () => {
                // ngModel.$setViewValue(scope.model.label);
                // ngModel.$setValidity('incomplete', false);
                // ngModel.$render();
                // $log.debug(scope.model.value);
                scope.updateListValue();
            };

            scope.itemSelected = (item) => {
                scope.model.label = item.label;
                ngModel.$setViewValue(item.id);
                ngModel.$setValidity('incomplete', true);
                ngModel.$render();
                scope.showListValues();
            };

            scope.updateListValue = () => {
                // To add autocomplete behaviour
                if (scope.model.label.length > 2) {
                    FilterWorkspace.updateList(scope.type, scope.model.label).then(res => {
                        scope.listValues = res;
                        scope.listValues = [{
                            id: 1,
                            label: 'test1'
                        }, {
                            id: 2,
                            label: 'test2'
                        }];
                    });
                } else {
                    scope.listValues = scope.originalList;
                }
            };

            scope.newValue = () => {
                return scope.model.label;
            };
        }
    };
}
