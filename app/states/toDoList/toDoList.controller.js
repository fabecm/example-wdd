export class ToDoListController {

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

    constructor ($state, $timeout, ModalService) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;

        this.initToDoList();
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    initToDoList () {
        this.$timeout(() => {
            let param = {};
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    forwardToApprove (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getForwardText()
        };
        this.modalService.openActionModal(param);
    }

    notOfCompetence (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'REJECT',
            text: this.modalService.getForwardText()
        };
        this.modalService.openActionModal(param);
    }

    takeChargeToModify (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getTakeChargeModifyText()
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
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
