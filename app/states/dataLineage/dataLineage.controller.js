export class DataLineageController {

    lineageBoxes = Array(9);

    // Default view: Data Lineage
    currentView = 0;

    constructor (LineageService) {
        'ngInject';
        this.lineageService = LineageService;

        this.initLineage(123);
    }

    initLineage (termId) {
        this.getLineageField(termId);
    }

    getLineageField (termId) {
        this.lineageService.getLineageField(termId).then(res => {
            this.lineageBoxes = Array(9);
            this.lineageBoxes[1] = {
                title: 'Technical Hierarchy',
                data: res.data.tech_hierarchy,
                operation: null
            };

            this.lineageBoxes[3] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                operation: this.getLineageRule
            };

            this.lineageBoxes[4] = {
                title: 'Data Field',
                data: res.data.data_field,
                operation: this.goToDateDetail
            };

            this.lineageBoxes[5] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                operation: this.getLineageRule
            };

            this.lineageBoxes[7] = {
                title: 'Business Data',
                data: res.data.other_relations[0],
                operation: null
            };

            if (res.data.other_relations[1]) {
                this.lineageBoxes[6] = {
                    title: 'Business Data',
                    data: res.data.other_relations[1],
                    operation: null
                };
            }

            if (res.data.other_relations[2]) {
                this.lineageBoxes[8] = {
                    title: 'Business Data',
                    data: res.data.other_relations[2],
                    operation: null
                };
            }
        });
    }

    getLineageRule (ruleId) {debugger
        this.lineageService.getLineageRule(ruleId).then(res => {
            this.lineageBoxes = Array(9);
            this.lineageBoxes[1] = {
                title: 'Business Rule',
                data: res.data.business_rule,
                operation: null
            };
            this.lineageBoxes[3] = {
                title: 'Data Field',
                data: res.data.data_field_in,
                operation: this.getLineageField
            };
            this.lineageBoxes[4] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                operation: null
            };
            this.lineageBoxes[5] = {
                title: 'Data Field',
                data: res.data.data_field_out,
                operation: this.getLineageField
            };
            this.lineageBoxes[7] = {
                title: 'Program',
                data: res.data.program,
                operation: null
            };
        });
    }
}
