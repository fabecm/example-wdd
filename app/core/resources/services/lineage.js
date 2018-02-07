export class LineageService {
    constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
    }

    getLineageField (termId, draft) {
        return this.$http.get(`WDD/lineage/field/${termId}?draft=${draft}`);
    }

    getLineageRule (ruleId, draft) {
        return this.$http.get(`WDD/lineage/rule/${ruleId}?draft=${draft}`);
    }
}
