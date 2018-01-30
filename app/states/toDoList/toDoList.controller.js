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

    constructor ($state, $timeout, ModalService, WddCacheService) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initToDoList();
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    initToDoList () {
        let param = {};
        let filter = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_toDoList')) {
            param.resetPage = false;
            filter = this.wddCacheService.getCachedFilter('filter_tab_toDoList');
        }

        this.mapFilterSetted(param, filter);
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
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    notOfCompetence (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'REJECT',
            text: this.modalService.getForwardText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    takeChargeToModify (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getTakeChargeModifyText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
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

        this.filterSetted = param;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
