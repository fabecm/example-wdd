export class RuDashboardController {

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
                console.log(this.workspaceData, this.headerTable);
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
