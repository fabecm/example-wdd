export function WddSpinner ($compile) {
    'ngInject';

    return {
        scope: {
            wddSpinner: '=',
            spinnerStyle: '@'
        },
        link: (scope, elem) => {
            let position = elem.css('position');
            if (position !== 'absolute' && position !== 'relative') {
                elem.css('position', 'relative');
            }
            elem.append($compile(`
                <div class="wdd-spinner" ng-class="spinnerStyle" ng-if="checkPromises()">
                    <div class="sk-circle">
                        <div class="sk-circle1 sk-child"></div>
                        <div class="sk-circle2 sk-child"></div>
                        <div class="sk-circle3 sk-child"></div>
                        <div class="sk-circle4 sk-child"></div>
                        <div class="sk-circle5 sk-child"></div>
                        <div class="sk-circle6 sk-child"></div>
                        <div class="sk-circle7 sk-child"></div>
                        <div class="sk-circle8 sk-child"></div>
                        <div class="sk-circle9 sk-child"></div>
                        <div class="sk-circle10 sk-child"></div>
                        <div class="sk-circle11 sk-child"></div>
                        <div class="sk-circle12 sk-child"></div>
                    </div>
                </div>`)(scope));
            scope.checkPromises = () => {
                return scope.wddSpinner.find(e => e && e.status === 0);
            };
        }
    };
}
