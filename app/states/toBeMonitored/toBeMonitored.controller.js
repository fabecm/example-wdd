export class ToBeMonitoredController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Data Inizio',
        value: 'start_date'
    }, {
        label: 'Data Fine',
        value: 'end_date'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Avanzamento',
        value: 'step'
    }];

    headerTableExpandable = [{
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
        value: 'tech_appl'
    }, {
        label: 'System owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor ($q, $state, $timeout, WddCacheService) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.$timeout = $timeout;
        this.wddCacheService = WddCacheService;

        this.initToBeMonitored();
    }

    initToBeMonitored () {
        let param = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_toBeMonitored')) {
            param = this.wddCacheService.getMapDashboardFilter('filter_tab_toBeMonitored');
            param.resetPage = false;
        }
        param.type = 'attivi';
        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    filterChanged (filterApplied) {
        let param = filterApplied;
        param.type = 'attivi';
        param.resetPage = true;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
