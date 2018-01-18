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
        value: 'state'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    constructor ($state, $timeout) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;

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
