export class ApprovalRequestsController {

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
        label: 'Descrizione Data Field',
        value: 'data_field_description'
    }, {
        label: 'Data Table',
        value: 'data_table'
    }, {
        label: 'Technical Application',
        value: 'tech_application'
    }, {
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    takeChargeStatus = ['Da approvare', 'Da approvare da evento', 'Da approvare da iniziativa'];
    approveStatus = ['In approvazione', 'In approvazione da evento', 'In approvazione da iniziativa'];
    rejectStatus = ['In approvazione', 'In approvazione da evento', 'In approvazione da iniziativa'];

    constructor ($timeout, $state, ModalService, WddCacheService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$state = $state;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initApprovalRequest();
    }

    initApprovalRequest () {
        let param = {};
        let filter = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_approvalRequests')) {
            param.resetPage = false;
            filter = this.wddCacheService.getCachedFilter('filter_tab_approvalRequests');
        }

        this.mapFilterSetted(param, filter);
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    approve (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getApproveText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.showTab = true;
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    reject (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'REJECT',
            text: this.modalService.getRejectText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.showTab = true;
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    takeCharge (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getTakeChargeText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.showTab = true;
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    filterChanged (arrayFilter) {
        let param = {};
        param.resetPage = true;

        this.mapFilterSetted(param, arrayFilter);
    }

    mapFilterSetted (param, arrayFilter) {
        if (arrayFilter.process_owner_id && arrayFilter.process_owner_id !== -1) {
            param.process_owner_id = arrayFilter.process_owner_id;
        } else {
            param.process_owner_id = 0;
        }
        if (arrayFilter.system_owner_id && arrayFilter.system_owner_id !== -1) {
            param.system_owner_id = arrayFilter.system_owner_id;
        } else {
            param.system_owner_id = 0;
        }
        if (arrayFilter.status_code) {
            param.status_code = arrayFilter.status_code;
        }
        if (arrayFilter.arrayFilter && arrayFilter.arrayFilter.length > 0) {
            param.array_filter_text = arrayFilter.arrayFilter;
        }

        this.filterSetted = param;

        this.$timeout(() => {
            this.showTab = true;
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
