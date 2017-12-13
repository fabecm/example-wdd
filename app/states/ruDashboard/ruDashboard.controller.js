export class RuDashboardController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    constructor (SearchWorkspaceService, $q) {
        'ngInject';
        this.searchWorkspaceService = SearchWorkspaceService;
        this.$q = $q;

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
        label: 'Data field',
        value: 'data_field'
    }, {
        label: 'Data source table',
        value: 'data_table'
    }, {
        label: 'Data source',
        value: 'data_source'
    }, {
        label: 'Technical application',
        value: 'tech_appl'
    }, {
        label: 'System owner',
        value: 'system_owner'
    }]);
    return defer.promise;
}
