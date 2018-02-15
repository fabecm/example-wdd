export class DashboardRequestController {

    dataList = [];

    chartValues = [{
        label: 'Richieste di documentazione',
        value: 0,
        color: '#0097d9',
        childPage: 'tab.documentationRequests'
    }, {
        label: 'Richieste di approvazione',
        value: 0,
        color: '#007284',
        childPage: 'tab.approvalRequests'
    }, {
        label: 'Eventi automatici',
        value: 0,
        color: '#df5356',
        childPage: 'tab.automaticEvents'
    }, {
        label: 'Richieste approvazione entità',
        value: 0,
        color: '#b24042',
        childPage: 'tab.entityApprovalRequest'
    }];

    headerRichiestaDocumentazione = [{
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

    headerApprovalRequest = [{
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
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    headerAutomaticEvents = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Data Field',
        value: 'data_field'
    }, {
        label: 'Data Table',
        value: 'data_source_table'
    }, {
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

    headerEntityApprovalRequest = [{
        label: 'Tipo entità',
        value: 'type_entity'
    }, {
        label: 'Nome entità',
        value: 'name_entity'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor (DashboardsService, TableService) {
        'ngInject';
        this.dashboardsService = DashboardsService;
        this.tableService = TableService;
        this.getChartData();
        this.getTablesData();
    }

    getChartData () {
        this.dataqualityPromise = this.dashboardsService.dashboardCall('dataquality');
        this.dataqualityPromise.then(chartData => {
            this.chartValues[0].value = chartData.data.array[0].value;
            this.chartValues[1].value = chartData.data.array[1].value;
            this.chartValues[2].value = chartData.data.array[2].value;
            this.chartValues[3].value = chartData.data.array[3].value;

            this.dataAvailable = true;
        });
    }

    getTablesData () {
        this.searchWorkspacePromise = this.tableService.getTableData('searchWorkspace', {}, 1, 3);
        this.searchWorkspacePromise.then(res => {
            this.tableRichiesteDocumentazione = res.dataTable;
        });

        this.approvalRequestPromise = this.tableService.getTableData('approvalRequest', {}, 1, 3);
        this.approvalRequestPromise.then(res => {
            this.tableApprovalRequest = res.dataTable;
        });

        this.automaticEventsPromise = this.tableService.getTableData('automaticEvents', {}, 1, 3);
        this.automaticEventsPromise.then(res => {
            this.tableAutomaticEvents = res.dataTable;
        });

        this.entityApprovalRequestPromise = this.tableService.getTableData('entityApprovalRequest', {}, 1, 3);
        this.entityApprovalRequestPromise.then(res => {
            this.tableEntityApprovalRequest = res.dataTable;
        });
    }

}
