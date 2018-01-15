export function WddSpinner ($compile) {
    'ngInject';

    return {
        scope: {
            wddSpinner: '='
        },
        link: (scope, elem) => {
            let position = elem.css('position');
            if (position !== 'absolute' && position !== 'relative') {
                elem.css('position', 'relative');
            }
            elem.append($compile('<div class="wdd-spinner" ng-if="checkPromises()"><img src="{{::imagePath}}" /></div>')(scope));
            scope.checkPromises = () => {
                return scope.wddSpinner.find(e => e.$$state.status === 0);
            }
        }
    }
}
