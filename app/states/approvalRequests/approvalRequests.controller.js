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

    approve () {
        this.modalService.openDateApproveModal();
    }

    reject () {
        this.modalService.openDateRejectModal();
    }

    filterChanged (arrayFilter) {
        if (!arrayFilter && Object.keys(this.$rootScope.appliedFilter).length === 0) {
            return;
        }

        let param = {
            filterType: 'searchFilter',
            resetPage: true
        };

        if (!arrayFilter && Object.keys(this.$rootScope.appliedFilter).length > 0) {
            param.getChached = true;
        } else {
            param.filterSetted = arrayFilter;
        }

        this.filterApplied = param.filterSetted;

        this.$timeout(() => {
            this.reloadTableData(param);
        });
    }
}
