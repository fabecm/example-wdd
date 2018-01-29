import template from './dataDetailAttribute.template.html';

export function DataDetailAttribute () {
    'ngInject';
    return {
        require: '^ngModel',
        scope: {
            attributeName: '=',
            attributeType: '@',
            frontendType: '@',
            isRequired: '@',
            isVisible: '@',
            isEditable: '@',
            attributeValues: '@',
            domainObjValue: '@',
            originValue: '@',
            resetAttribute: '&',
            addEntityFunction: '&',
            unlockAction: '&'
        },
        template: template,
        link: (scope, element, attribute, ngModel, $log) => {
            scope.domainValue = [];
            scope.model = {};
            scope.isFocusEnabled = false;

            ngModel.$render = () => {
                scope.model.value = ngModel.$modelValue;
            };

            try {
                if (scope.domainObjValue) {
                    scope.domainValue = JSON.parse(scope.domainObjValue).array;
                }
            } catch (error) {
                $log.debug(error);
            }

            // if (scope.attributeType === 'CLOB') {
            //     scope.frontendType = 'CLOB';
            // }

            switch(scope.frontendType) {
                case 'MULTILINETEXT':
                case 'VALUETEXT':
                    scope.isTextArea = true;
                    break;
                case 'SINGLELINETEXT':
                    scope.isInput = true;
                    break;
                case 'SINGLESELECTLIST':
                    scope.isRadioButton = true;
                    scope.isSelect = true;
                    break;
                case 'MULTISELECTLIST':
                    scope.isCheckBox = true;
                    break;
                case 'CHECKBOXLIST':
                    if (scope.attributeName === 'Data Source field input') {
                        scope.canAddEntity = true;
                    }
                    scope.isCheckBox = true;
                    break;
                case 'FLAG':
                    scope.isFlag = true;
                    break;
                case 'FILE':
                    scope.isFile = true;
                    break;
                default:
            }

            // if (scope.attributeType && scope.attributeType.indexOf('VARCHAR') === 0) {
            //     scope.attributeType = scope.attributeType.match(/\d+/);
            // }

            scope.setFocusOnAttribute = (value) => setFocusOnAttribute(scope, value);

            scope.reset = () => {
                if (scope.attributeType === 'CLOB') {
                    return;
                }
                ngModel.$setViewValue(scope.originValue);
                ngModel.$render();
            };

            scope.resetAttribute({resetFunction: scope.reset()});

            scope.fileList = [];

            scope.fileNameChanged = (files) => {
                let file = {
                    label: files[0].name,
                    selected: false,
                    removed: false
                };
                scope.fileList.push(file);
                scope.$apply();
            };

            scope.removeFile = () => {
                angular.forEach(scope.fileList, (file) => {
                    if (file.selected) {
                        file.removed = true;
                    }
                });
            };

            scope.changeSelectStatus = (index) => {
                scope.fileList[index].selected = !scope.fileList[index].selected;
            };

            scope.valueChanged = () => {
                ngModel.$setViewValue(scope.model.value);
                ngModel.$render();
                scope.unlockAction();
            };

            scope.addEntity = () => {
                if (scope.isEditable === 'false') {
                    return;
                }
                scope.addEntityFunction();
            };
        }

    };
}

function setFocusOnAttribute (scope, value) {
    scope.isFocusEnabled = value;
}

// function setCheckboxModel (scope) {
//     scope.checkboxModel = {};
//     angular.forEach(scope.domainValue, el => {
//         scope.checkboxModel[el] = false;
//     });

//     angular.forEach(scope.model.value, val => {
//         scope.checkboxModel[val] = true;
//     });
// }
