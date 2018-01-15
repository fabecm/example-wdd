import $ from 'jquery';

export class WddAlert {
    constructor ($compile, $rootScope) {
        'ngInject';

        this.$compile = $compile;
        this.$rootScope = $rootScope;
    }

    showAlert (type, message) {
        $('#alert-holder').append(this.$compile(this.getTemplate(type, message))(this.$rootScope));
    }

    getTemplate (type, message) {
        const randId = Math.floor((Math.random() * 100) + 1);
        return `<wdd-alert id="wdd-alert-${randId}" type="${type}" message="${message}"/>`;
    }

    removeAlert () {
        return $('wdd-alert').remove();
    }
}
