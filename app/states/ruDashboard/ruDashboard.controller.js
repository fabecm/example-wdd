export class RuDashboardController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    constructor (SearchWorkspaceService, $q, $state, ModalService) {
        'ngInject';
        this.searchWorkspaceService = SearchWorkspaceService;
        this.$q = $q;
        this.$state = $state;
        this.modalService = ModalService;

        this.initRuDashboard();
    }

    initRuDashboard () {
        this.searchWorkspaceService.getWorkspaceRu().then(res => {
            this.workspaceData = res.outputArray;
            getHeader(this.$q).then(headerRes => {
                this.headerTable = headerRes;
            });
            getHeaderExpandable(this.$q).then(headerExpRes => {
                this.headerTableExpandable = headerExpRes;
            });
        });
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    createNewWorkspace () {
        this.modalService.openNewWorkspaceModal();
    }
}

function getHeader ($q) {
    let defer = $q.defer();
    defer.resolve([{
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
        value: 'state'
    }]);
    return defer.promise;
}

function getHeaderExpandable ($q) {
    let defer = $q.defer();
    defer.resolve([{
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
    }]);
    return defer.promise;
}
