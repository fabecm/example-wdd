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
        value: 'data_table'
    }, {
        label: 'Data Table',
        value: 'data_source_table'
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

    constructor ($timeout, $state, ModalService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$state = $state;
        this.modalService = ModalService;

        this.initApprovalRequest();
    }

    initApprovalRequest () {
        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: {}
            });
        });
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
        this.modalService.openActionModal(param);
    }

    reject (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'REJECT',
            text: this.modalService.getRejectText()
        };
        this.modalService.openActionModal(param);
    }

    takeCharge (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getTakeChargeText()
        };
        this.modalService.openActionModal(param);
    }

    filterChanged (arrayFilter) {
        let param = {};
        param.resetPage = true;

        if (arrayFilter.process_owner_id) {
            param.process_owner_id = arrayFilter.process_owner_id;
        } else {
            param.process_owner_id = 0;
        }
        if (arrayFilter.system_owner_id) {
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

        this.$timeout(() => {
            this.showTab = true;
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
