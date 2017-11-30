export class LineageService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getLineageField (termId) {
        return this.$http.get(`WDD/lineage/field/${termId}`);
    }

    getLineageRule (ruleId) {
        return this.$http.get(`WDD/lineage/rule/${ruleId}`);
    }
}
