import template from './wddTable.template.html';

export function WddTable () {
    return {
        scope: {
            serviceResponseObj: '@',
            headerArrayObj: '@'
        },
        template: template,
        link: (scope) => {
            try {
                if (scope.serviceResponseObj) {
                    scope.serviceResponse = JSON.parse(scope.serviceResponseObj).array;
                }

                if (scope.headerArrayObj) {
                    scope.headerArray = JSON.parse(scope.headerArrayObj).array;
                }

                console.log(scope.serviceResponse, scope.headerArray);
            } catch (error) {
                console.log(error);
            }
        }
    };
}
