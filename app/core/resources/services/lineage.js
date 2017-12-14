export class LineageService {
    constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
    }

    getLineageField (termId) {
        // return this.$http.get(`WDD/lineage/field/${termId}`);
        this.$log.debug(termId);
        let defer = this.$q.defer();
        defer.resolve(getLineageFieldMock());
        return defer.promise;
    }

    getLineageRule (ruleId) {
        // return this.$http.get(`WDD/lineage/rule/${ruleId}`);
        this.$log.debug(ruleId);
        let defer = this.$q.defer();
        defer.resolve(getLineageRuleMock());
        return defer.promise;
    }
}

function getLineageRuleMock () {
    return {
        data: {
            business_rule: {},
            data_field_in: [
                {
                    label: 'MOTIVO_STATO_ENTE - DSEC.TSEC67',
                    id: 1108142
                }
            ],
            tech_rules: {
                label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67'
            },
            program: [],
            data_field_out: [
                {
                    label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
                    id: 1136820
                }
            ]
        }
    };
}

function getLineageFieldMock () {
    return {
        data: {
            tech_hierarchy: [
                {
                    label: 'UBIS-BIG DATA & ANALYTICS'
                },
                {
                    label: 'BIG'
                },
                {
                    label: 'R_MONETICA'
                },
                {
                    label: 'BD_TSEC67 - R_MONETICA'
                }
            ],
            data_field: {
                label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
                id: 1136820
            },
            tech_rules_in: [
                {
                    label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
                    id: 1127567
                }
            ],
            tech_rules_out: [],
            other_relation: []
        }
    };
}
