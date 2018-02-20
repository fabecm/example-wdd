export function EnabledButtonDirective ($timeout, EnabledButtonService) {
    'ngInject';
    return {
        scope: {
            isDisabled: '=',
            idButton: '@'
        },
        link: (scope) => {
            $timeout(() => {
                scope.$watch('isDisabled', (newVal) => {
                    EnabledButtonService.updateButtonStatus(scope.idButton, newVal);
                });
            });
        }
    };
}
