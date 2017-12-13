import template from './testDirectiveComponent.template.html';

export function TestDirectiveComponent () {
    return {
        scope: {
            name: '@',
            options: '='
        },
        template: template
    };
}

