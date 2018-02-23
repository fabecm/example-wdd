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
            isReadonly: '@',
            requiredDependence: '@',
            promise: '='
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.isListVisible = false;
            scope.model = {};
            scope.idAutocomplete = 'wdd-autocomplete-' + scope.type;
            scope.idClicker = 'autocomplete-clicker-' + scope.type;

            if (scope.type === 'newRequestSO' || scope.type === 'newRequestTA' || scope.type === 'newRequestDS' || scope.type === 'newRequestDT' || scope.type === 'newRequestDF') {
                scope.showMoreValues = true;
            }

            scope.$watch('dipendence', () => {
                let isDipendenceOk = true;
                try {
                    if (scope.dipendence) {
                        scope.dipendenceObj = JSON.parse(scope.dipendence);
                        scope.dipendenceObj.forEach(dipendence => {
                            if (!dipendence) {
                                isDipendenceOk = false;
                            }
                        });
                    }
                } catch (error) {
                    $log.debug(error);
                }

                if (scope.requiredDependence && !isDipendenceOk && scope.type !== 'newRequestDF') {
                    return;
                }
                if (scope.type === 'newRequestDF' && !scope.dipendenceObj[0] && !scope.dipendenceObj[1] && !scope.dipendenceObj[2]) {
                    return;
                }
                scope.initAutocomplete();
            });

            scope.$watch('model', (newVal) => {
                if (!newVal) {
                    ngModel.$setViewValue(undefined);
                    ngModel.$render(scope.model);
                }
            });

            ngModel.$render = (newVal) => {
                if(ngModel.$modelValue) {
                    if (scope.listValues) {
                        let itemApplied = scope.listValues.find(item => item.id === ngModel.$modelValue);

                        if (itemApplied) {
                            scope.model = angular.copy(itemApplied);
                        } else if (scope.newValue) {
                            scope.model = newVal;
                        } else {
                            scope.model = {};
                        }
                    }
                } else {
                    scope.model = {};
                }
            };

            scope.initAutocomplete = () => {
                let typeSelected = '';
                if (scope.type.indexOf('entity') !== -1) {
                    typeSelected = scope.type.substring(0, 6);
                } else if (scope.type.indexOf('attribute') !== -1) {
                    typeSelected = scope.type.substring(0, 9);
                } else {
                    typeSelected = scope.type;
                }
                const requestFilter = FilterWorkspace.updateList(typeSelected, scope.model.label, scope.dipendenceObj);
                scope.promise = requestFilter;
                requestFilter.then(res => {
                    scope.listValues = res;

                    // if (!scope.originalList) {
                    scope.originalList = angular.copy(scope.listValues);
                    // }

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
                if (e.target.id === scope.idClicker) {
                    return;
                }
                if ($(e.target).parents('#autocomplete-value-list').length === 0) {
                    scope.isListVisible = false;
                    scope.$apply();
                }
            });

            // scope.$on('$destroy', function () {
            //     $(document).off('click');
            // });

            scope.changedLabel = () => {
                // ngModel.$setViewValue(scope.model.label);
                // ngModel.$setValidity('incomplete', false);
                // ngModel.$render();
                // $log.debug(scope.model.value);
                scope.updateListValue();
            };

            scope.itemSelected = (item) => {
                scope.model.label = angular.copy(item.label);
                ngModel.$setViewValue(item.id);
                ngModel.$setValidity('incomplete', true);
                ngModel.$render(item);
                scope.showListValues();
            };

            scope.updateListValue = () => {
                if (scope.model.label.length > 2) {
                    let provisionalLabel = scope.model.label;
                    ngModel.$setViewValue(undefined);
                    ngModel.$render(scope.model);
                    scope.model.label = provisionalLabel;

                    const requestFilter = FilterWorkspace.updateList(scope.type, scope.model.label, scope.dipendenceObj);
                    scope.promise = requestFilter;
                    requestFilter.then(res => {
                        scope.listValues = res;
                        scope.isListVisible = true;
                    });
                } else {
                    scope.listValues = scope.originalList;
                    scope.isListVisible = true;
                    if (!scope.model.label) {
                        ngModel.$setViewValue(undefined);
                        ngModel.$render(scope.model);
                    }
                }
            };
        }
    };
}
