import $ from 'jquery';
import template from './wddAlert.template.html';

export function WddAlertMessage () {
    return {
        scope: {
            type: '@',
            message: '@',
            id: '@'
        },
        template: template,
        link: (scope) => {
            scope.close = () => {
                $(`#${scope.id}`).remove();
            };
        }
    };
}
