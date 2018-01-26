export class DocumentationRequestsController {

    dataList = [];
    pages = [];
    rawData = [];
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

    constructor (DataService, DatasourceService, $state, $timeout, ModalService) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;

        this.initDocumentationRequest();
    }

    initDocumentationRequest () {
        this.$timeout(() => {
            let param = {};
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

    createNewWorkspace () {
        this.modalService.openNewWorkspaceModal().then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterApplied
                });
            });
        });
    }

    filterChanged (filterApplied) {
        let param = filterApplied;
        this.filterApplied = filterApplied;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
