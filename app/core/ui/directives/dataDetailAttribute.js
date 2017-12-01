import template from './dataDetailAttribute.template.html';

export function DataDetailAttribute () {
    return {
        require: 'ngModel',
        scope: {
            attributeName: '@',
            attributeType: '@',
            frontendType: '@',
            isRequired: '@',
            isVisible: '@',
            isEditable: '@',
            attributeValues: '@',
            domainValue: '@'
        },
        template: template,
        link: (scope, element, attribute, ngModel) => {
            switch(scope.frontendType) {
                case 'MULTILINETEXT':
                case 'VALUETEXT': scope.isTextArea = true;
                    break;
                case 'SINGLELINETEXT': scope.isInput = true;
                    break;
                case 'SINGLESELECTLIST': scope.isRadioButton = true;
                    break;
                case 'MULTISELECTLIST': scope.isCheckBox = true;
                    break;
                default:
            }

            if (scope.attributeType.indexOf('VARCHAR') === 0) {
                scope.attributeType = scope.attributeType.match(/\d+/);
            }
        }

    };
}
