export class DataLineageController {

    lineageBoxes = Array(9);

    // Default view: Data Lineage
    currentView = 0;

    constructor (LineageService, $state) {
        'ngInject';
        this.$state = $state;
        this.lineageService = LineageService;
        this.$state = $state;

        this.initLineage(1136820);
    }

    initLineage (termId) {
        this.getLineageField(termId);
    }

    getLineageField (termId) {
        this.lineageService.getLineageField(termId).then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.tech_hierarchy) {
                this.lineageBoxes[1] = {
                    title: 'Technical Hierarchy',
                    data: res.data.tech_hierarchy,
                    operation: null
                };
            }

            if (res.data.tech_rules_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_in,
                    operation: this.getLineageRule.bind(this)
                };
            }

            this.lineageBoxes[4] = {
                title: 'Data Field',
                data: res.data.data_field,
                infoOperation: this.goToDataDetail.bind(this)
            };

            if (res.data.tech_rules_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_out,
                    operation: this.getLineageRule.bind(this)
                };
            }

            if (res.data.other_relation[0]) {
                this.lineageBoxes[7] = {
                    title: 'Business Data',
                    data: res.data.other_relation[0],
                    operation: null
                };
            }

            if (res.data.other_relation[1]) {
                this.lineageBoxes[6] = {
                    title: 'Business Data',
                    data: res.data.other_relation[1],
                    operation: null
                };
            }

            if (res.data.other_relation[2]) {
                this.lineageBoxes[8] = {
                    title: 'Business Data',
                    data: res.data.other_relation[2],
                    operation: null
                };
            }
        });
    }

    getLineageRule (ruleId) {
        this.lineageService.getLineageRule(ruleId).then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.business_rule.label) {
                this.lineageBoxes[1] = {
                    title: 'Business Rule',
                    data: res.data.business_rule,
                    operation: null
                };
            }

            if (res.data.data_field_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Data Field',
                    data: res.data.data_field_in,
                    operation: this.getLineageField.bind(this)
                };
            }

            this.lineageBoxes[4] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                operation: null
            };

            if (res.data.data_field_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Data Field',
                    data: res.data.data_field_out,
                    operation: this.getLineageField.bind(this)
                };
            }

            if (res.data.program.length > 0) {
                this.lineageBoxes[7] = {
                    title: 'Program',
                    data: res.data.program,
                    operation: null
                };
            }
        });
    }

    goToDataDetail (termId) {
        this.$state.go('data-detail', {id: termId});
    }
}
