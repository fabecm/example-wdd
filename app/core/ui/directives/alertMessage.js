import $ from 'jquery';
import template from './wddAlert.template.html';

export function WddAlertMessage () {
    return {
        scope: {
            type: '@',
            message: '@'
        },
        template: template,
        link: (scope) => {
            scope.close = () => {
                $('wdd-alert').remove();
            };
        }
    };
}
