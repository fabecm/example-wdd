export class InitiativeCensusesController {

    dataList = [];
    pages = [];
    rawData = [];
    pageSize = 10;
    currentPage = 1;
    filterBootstrap = {};
    filterStatus = [{
        label: 'Tutti'
    }, {
        label: 'Bozza'
    }, {
        label: 'Produzione'
    }];

    tablePagination = true;
    tablePageSize = 10;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Data Field',
        value: 'data_field'
    }, {
        label: 'Data Table',
        value: 'data_table'
    }, {
        label: 'Data Source',
        value: 'data_source'
    }, {
        label: 'Technical Application',
        value: 'tech_application',
        termTypeId: 'technical_application'
    }, {
        label: 'Program',
        value: 'program'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    forwardToApproveStatus = ['In modifica da iniziativa'];

    constructor ($state, $timeout, ModalService, WddCacheService, RuleProfileService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$state = $state;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;
        this.ruleProfileService = RuleProfileService;

        if (this.ruleProfileService.ruleProfile.dashboards.length === 1 && this.ruleProfileService.ruleProfile.dashboards[0] === 'DSBOARD_SO') {
            this.hideFirstFilterLine = true;
        }

        this.initInitiativeCensuses();
    }

    initInitiativeCensuses () {
        let param = {};
        let filter = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_initiativeCensuses')) {
            param.resetPage = false;
            filter = this.wddCacheService.getCachedFilter('filter_tab_initiativeCensuses');
        }

        this.mapFilterSetted(param, filter);
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    forwardToApprove (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getForwardText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterApplied
                });
            });
        });
    }

    openGestioneMassiva () {
        this.modalService.openMassiveManagmentModal();
    }

    createNewData () {
        this.modalService.openNewWorkspaceRequests(undefined, undefined, true).then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterApplied
                });
            });
        });
    }

    filterChanged (filterApplied) {
        let param = {};
        param.resetPage = true;

        this.mapFilterSetted(param, filterApplied);
    }

    mapFilterSetted (param, filterApplied) {
        this.filterApplied = filterApplied;

        if (filterApplied.process_owner_id && filterApplied.process_owner_id !== -1) {
            param.process_owner_id = filterApplied.process_owner_id;
        } else {
            param.process_owner_id = 0;
        }
        if (filterApplied.system_owner_id && filterApplied.system_owner_id !== -1) {
            param.system_owner_id = filterApplied.system_owner_id;
        } else {
            param.system_owner_id = 0;
        }
        if (filterApplied.status_code) {
            param.status_code = filterApplied.status_code;
        }
        if (filterApplied.arrayFilter && filterApplied.arrayFilter.length > 0) {
            param.array_filter_text = filterApplied.arrayFilter;
        }

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
