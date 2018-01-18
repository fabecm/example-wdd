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
            newValue: '=',
            isEditable: '=',
            requiredDependence: '@',
            promise: '='
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.isListVisible = false;
            scope.model = {};

            scope.$watch('dipendence', () => {
                if (scope.requiredDependence && !scope.dipendence) {
                    return;
                }
                scope.initAutocomplete();
            });

            ngModel.$render = () => {
                if(ngModel.$modelValue) {
                    if (scope.listValues) {
                        let itemApplied = scope.listValues.find(item => item.id === ngModel.$modelValue);

                        if (itemApplied) {
                            scope.model = itemApplied;
                        } else {
                            scope.model = {};
                        }
                    }
                } else {
                    scope.model = {};
                }
                $log.debug(scope.model);
            };

            scope.initAutocomplete = () => {
                const requestFilter = FilterWorkspace.updateList(scope.type, scope.model.label, scope.dipendence);
                scope.promise = requestFilter;
                requestFilter.then(res => {
                    scope.listValues = res;
                    
                    if (!scope.originalList) {
                        scope.originalList = angular.copy(scope.listValues);
                    }

                    ngModel.$render();
                });
            };

            scope.showListValues = () => {
                if (!scope.isEditable) {
                    scope.isListVisible = !scope.isListVisible;
                }
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
                    const requestFilter = FilterWorkspace.updateList(scope.type, scope.model.label);
                    scope.promise = requestFilter;
                    requestFilter.then(res => {
                        scope.listValues = res;
                        scope.isListVisible = true;
                        // scope.listValues = [{
                        //     id: 1,
                        //     label: 'test1'
                        // }, {
                        //     id: 2,
                        //     label: 'test2'
                        // }];
                    });
                } else {
                    scope.listValues = scope.originalList;
                    scope.isListVisible = true;
                }
            };
        }
    };
}
