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
            business_rule: {
                label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu...'
            },
            data_field_in: [
                {
                    label: 'MOTIVO_STATO_ENTE - DSEC.TSEC67',
                    id: 1108142
                }
            ],
            tech_rules: {
                label: 'MOTIVO_STATO_ENTE - R_MONETICA.BD_TSEC67',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu...'
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
                    label: 'UBIS-BIG DATA & ANALYTICS',
                    type: 'SYSTEM OWNER'
                },
                {
                    label: 'BIG',
                    type: 'TECHNICAL APPLICATION'
                },
                {
                    label: 'R_MONETICA',
                    type: 'DATA SOURCE'
                },
                {
                    label: 'BD_TSEC67 - R_MONETICA',
                    type: 'DATA TABLE'
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
