export class EntityApprovalRequestController {


    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    constructor(SearchWorkspaceService, $q, $state, ModalService) {
        'ngInject';
        this.searchWorkspaceService = SearchWorkspaceService;
        this.$q = $q;
        this.$state = $state;
        this.modalService = ModalService;

        this.initRuDashboard();
    }

    initRuDashboard() {
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

    changeChild() {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    createNewWorkspace() {
        this.modalService.openNewWorkspaceModal();
    }
}

function getHeader($q) {
    let defer = $q.defer();
    defer.resolve([{
        label: 'Tipo entità',
        value: 'workspace'
    }, {
        label: 'Nome entità',
        value: 'description'
    }, {
        label: 'Descrizione',
        value: 'start_date'
    }, {
        label: 'Stato',
        value: 'state'
    }]);
    return defer.promise;
}

function getHeaderExpandable($q) {
    let defer = $q.defer();
    defer.resolve([{
        label: 'Data Field',
        value: 'data_field'
    }, {
        label: 'Data source table',
        value: 'data_table'
    }, {
        label: 'Data source',
        value: 'data_source'
    }, {
        label: 'Technical application',
        value: 'data_source'
    }, {
        label: 'System Owner',
        value: 'data_source'
    }]);
    return defer.promise;
}