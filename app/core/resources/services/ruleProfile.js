export class RuleProfileService {

    rule = {};

    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getRuleProfile () {
        return this.$http.get('WDD/profile/rule').then(res => {
            this.rule = res.data;
            return this.rule;
        });
    }

    get ruleProfile () {
        return this.rule;
    }
}
