export class RuDashboardController {

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
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor ($q, $state, $timeout, ModalService) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;

        this.initRuDashboard();
    }

    initRuDashboard () {
        let param = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_ruDashboard')) {
            param = this.wddCacheService.getMapDashboardFilter('filter_tab_ruDashboard');
            param.resetPage = false;
        }
        param.type = 'nuovi';
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

    openGestioneMassiva () {
        this.modalService.openMassiveManagmentModal();
    }

    createNewWorkspace () {
        this.modalService.openNewWorkspaceModal().then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    filterChanged (filterApplied) {
        let param = filterApplied;
        param.type = 'nuovi';
        param.resetPage = true;
        this.filterSetted = param;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
