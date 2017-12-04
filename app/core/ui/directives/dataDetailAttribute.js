import template from './dataDetailAttribute.template.html';

export function DataDetailAttribute () {
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
            resetAttribute: '&'
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            scope.domainValue = [];
            scope.model = {};
            scope.isFocusEnabled = false;

            ngModel.$render = () => {
                if (ngModel.$modelValue) {
                    scope.model.value = ngModel.$modelValue;

                    if (scope.isCheckBox) {
                        setCheckboxModel(scope);
                    }
                }
            };

            try {
                scope.domainValue = JSON.parse(scope.domainObjValue).array;
            } catch (error) {
                console.log(error);
            }

            if (scope.attributeType === 'CLOB') {
                scope.frontendType = 'CLOB';
            }

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
                    break;
                case 'MULTISELECTLIST':
                    scope.isCheckBox = true;
                    break;
                case 'CLOB':
                    scope.isFile = true;
                    break;
                default:
            }

            if (scope.attributeType.indexOf('VARCHAR') === 0) {
                scope.attributeType = scope.attributeType.match(/\d+/);
            }

            scope.setFocusOnAttribute = (value) => setFocusOnAttribute(scope, value);

            scope.reset = () => {
                if (scope.attributeType === 'CLOB') {
                    return;
                }
                ngModel.$setViewValue(scope.originValue);
                ngModel.$render();
            };

            scope.resetAttribute({resetFunction: scope.reset()});
        }

    };
}

function setFocusOnAttribute (scope, value) {
    scope.isFocusEnabled = value;
}

function setCheckboxModel (scope) {
    scope.checkboxModel = {};
    angular.forEach(scope.domainValue, el => {
        scope.checkboxModel[el] = false;
    });

    angular.forEach(scope.model.value, val => {
        scope.checkboxModel[val] = true;
    });
}
