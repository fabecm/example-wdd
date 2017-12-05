import template from './wddAutocomplete.template.html';

export function WddAutocomplete () {
    return {
        scope: {

        },
        template: template,
        link: (scope) => {
            console.log(scope);
        }
    };
}
