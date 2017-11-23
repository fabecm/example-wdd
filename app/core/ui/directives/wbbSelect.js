import template from './wbbSelect.template.html';

export function WbbSelect() {
    return {
        scope: {
            name: '@',
            options: '='
        },
        template: template
    }
}