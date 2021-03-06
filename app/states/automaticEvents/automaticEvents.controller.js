export class AutomaticEventsController {

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
        value: 'data_source_table'
    },
    {
        label: 'Data Source',
        value: 'data_source'
    }, {
        label: 'Technical Application',
        value: 'tech_application'
    }, {
        label: 'Program',
        value: 'program'
    }, {
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Data Evento',
        value: 'data_event'
    }, {
        label: 'Evento',
        value: 'event'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    approveStatus = ['Da controllare da evento'];
    forwardToApproveStatus = ['Da controllare da evento'];

    constructor ($timeout, $state, ModalService, WddCacheService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$state = $state;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initAutomaticEvents();
    }

    initAutomaticEvents () {
        let param = {};
        let filter = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_automaticEvents')) {
            param.resetPage = false;
            filter = this.wddCacheService.getCachedFilter('filter_tab_automaticEvents');
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
            action: 'SEND',
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

    forwardToApprove (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getForwardText()
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
