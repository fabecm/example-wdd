export class LineageService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getLineageField (termId) {
        return this.$http.get(`http://mbcl26001510:8080/edd-serviceWeb/lineage/field/${termId}`);
    }

    getLineageRule (ruleId) {
        return this.$http.get(`http://mbcl26001510:8080/edd-serviceWeb/lineage/rule/${ruleId}`);
    }
}
