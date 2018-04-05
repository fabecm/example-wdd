export class DataLineageController {

    lineageBoxes = Array(9);

    // Default view: Data Lineage
    currentView = 0;

    constructor (LineageService, $state, $stateParams, ModalService) {
        'ngInject';
        this.$state = $state;
        this.lineageService = LineageService;
        this.$stateParams = $stateParams;
        this.modalService = ModalService;

        // TODO per l'init recuperare il termId dai parametri dello state
        this.initLineage();
    }

    initLineage () {
        let draft = this.$stateParams.isDraft === 'true';
        if (this.$stateParams.type === 'F') {
            this.getLineageField(this.$stateParams.id, draft);
        } else if (this.$stateParams.type === 'R') {
            this.getLineageRule(this.$stateParams.id, draft);
        }
    }

    goToRuleState (termId, draft) {
        this.$state.go('.', {id: termId, type: 'R', isDraft: draft, workspaceId: this.$stateParams.workspaceId});
    }

    goToFieldState (termId, draft) {
        this.$state.go('.', {id: termId, type: 'F', isDraft: draft, workspaceId: this.$stateParams.workspaceId});
    }

    getLineageField (termId, draft) {
        this.getLineageFieldPromise = this.lineageService.getLineageField(termId, draft);
        this.getLineageFieldPromise.then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.tech_hierarchy) {
                this.lineageBoxes[1] = {
                    title: 'Technical Hierarchy',
                    data: res.data.tech_hierarchy,
                    showType: true
                };
            }

            if (res.data.tech_rules_in && res.data.tech_rules_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_in,
                    operation: this.goToRuleState.bind(this)
                };
            }

            this.lineageBoxes[4] = {
                title: 'Data Field',
                data: res.data.data_field,
                contentBold: true,
                infoOperation: this.goToDataDetail.bind(this)
            };

            if (res.data.tech_rules_out && res.data.tech_rules_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Technical Rule',
                    data: res.data.tech_rules_out,
                    operation: this.goToRuleState.bind(this)
                };
            }

            if (res.data.other_relations && res.data.other_relations[0]) {
                this.lineageBoxes[7] = {
                    title: res.data.other_relations[0].title,
                    data: res.data.other_relations[0],
                    operation: null
                };
            }

            if (res.data.other_relations && res.data.other_relations[1]) {
                this.lineageBoxes[6] = {
                    title: res.data.other_relations[1].title,
                    data: res.data.other_relations[1],
                    operation: null
                };
            }

            if (res.data.other_relations && res.data.other_relations[2]) {
                this.lineageBoxes[8] = {
                    title: res.data.other_relations[2].title,
                    data: res.data.other_relations[2],
                    operation: null
                };
            }
        });
    }

    getLineageRule (ruleId, draft) {
        this.getLineageRulePromise = this.lineageService.getLineageRule(ruleId, draft);
        this.getLineageRulePromise.then(res => {
            this.lineageBoxes = Array(9);

            if (res.data.business_rule && res.data.business_rule.label) {
                this.lineageBoxes[1] = {
                    title: 'Business Rule',
                    data: res.data.business_rule,
                    hasDescription: true,
                    operation: null
                };
            }

            if (res.data.data_field_in && res.data.data_field_in.length > 0) {
                this.lineageBoxes[3] = {
                    title: 'Data Field',
                    data: res.data.data_field_in,
                    operation: this.goToFieldState.bind(this)
                };
            }

            this.lineageBoxes[4] = {
                title: 'Technical Rule',
                data: res.data.tech_rules,
                contentBold: true,
                hasDescription: true,
                infoOperation: this.goToDataDetail.bind(this)
            };

            if (res.data.data_field_out && res.data.data_field_out.length > 0) {
                this.lineageBoxes[5] = {
                    title: 'Data Field',
                    data: res.data.data_field_out,
                    operation: this.goToFieldState.bind(this)
                };
            }

            if (res.data.program && res.data.program.length > 0) {
                this.lineageBoxes[7] = {
                    title: 'Program',
                    data: res.data.program,
                    operation: null
                };
            }
        });
    }

    back () {
        window.history.back();
    }

    goToDataDetail (termId, draft) {
        this.modalService.openMDDataDetail(termId, draft, this.$stateParams.workspaceId);
    }
}
