import $ from 'jquery';

export class WddAlert {
    constructor ($compile, $rootScope) {
        'ngInject';

        this.$compile = $compile;
        this.$rootScope = $rootScope;
    }

    showAlert (type, message) {
        $('body').append(this.$compile(this.getTemplate(type, message))(this.$rootScope));
    }

    getTemplate (type, message) {
        const randId = Math.floor((Math.random() * 100) + 1);
        return `<wdd-alert id="${randId}" type="${type}" message="${message}"/>`;
    }
}
