import $ from 'jquery';

export class WddAlert {
    constructor ($compile, $rootScope) {
        'ngInject';

        this.$compile = $compile;
        this.$rootScope = $rootScope;
    }

    showAlert (type, message, alertKey) {
        this.isAlreadyOpenTemplate(alertKey);
        $('#alert-holder').append(this.$compile(this.getTemplate(type, message, alertKey))(this.$rootScope));
    }

    getTemplate (type, message, alertKey) {
        let key = alertKey;
        if (!alertKey) {
            key = Math.floor((Math.random() * 100) + 1);
        }
        return `<wdd-alert id="wdd-alert-${key}" type="${type}" message="${message}"/>`;
    }

    isAlreadyOpenTemplate (alertKey) {
        let element = $(`#wdd-alert-${alertKey}`);
        if (element.length && element.length > 0) {
            $(`#wdd-alert-${alertKey}`).remove();
        }
    }

    removeAlert () {
        return $('wdd-alert').remove();
    }

    removeEmptyTableAlert () {
        return $('#wdd-alert-empty-table').remove();
    }
}
