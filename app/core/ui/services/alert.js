import $ from 'jquery';

export class WddAlert {
    constructor ($compile, $rootScope) {
        'ngInject';

        this.$compile = $compile;
        this.$rootScope = $rootScope;
    }

    showAlert (type, message) {
        const parsedMessage = message.statusText;
        $('body').append(this.$compile(this.getTemplate(type, parsedMessage))(this.$rootScope));
    }

    getTemplate (type, message) {
        return `<wdd-alert type="${type}" message="${message}"/>`;
    }
}
