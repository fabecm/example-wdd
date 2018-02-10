export class DashboardSOController {

    dataList = [];

    chartValues = [{
        label: 'Richieste di documentazione',
        value: 0,
        color: '#0097D9',
        childPage: 'tab.toDoList'
    }, {
        label: 'Censimenti di iniziativa',
        value: 0,
        color: '#00796B',
        childPage: 'tab.initiativeCensuses'
    }, {
        label: 'Censimenti di entità',
        value: 0,
        color: '#df5356',
        childPage: 'tab.entityCensus'
    }];

    headerTodoList = [{
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
        value: 'status'
    }, {
        label: 'Data Scadenza',
        value: 'workspace_end_date'
    }];

    headerInitiativeCensuses = [{
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
        label: 'Program',
        value: 'program'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    headerEntityCensus = [{
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
        this.systemOwnerPromise = this.dashboardsService.dashboardCall('systemowner');
        this.systemOwnerPromise.then(chartData => {
            this.chartValues[0].value = chartData.data.array[0].value;
            this.chartValues[1].value = chartData.data.array[1].value;
            this.chartValues[2].value = chartData.data.array[2].value;

            this.dataAvailable = true;
        });
    }

    getTablesData () {
        this.toDoListPromise = this.tableService.getTableData('toDoList', {}, 1, 3);
        this.toDoListPromise.then(res => {
            this.tableTodoList = res.dataTable;
        });
        this.initiativeCensusesPromise = this.tableService.getTableData('initiativeCensuses', {}, 1, 3);
        this.initiativeCensusesPromise.then(res => {
            this.tableInitiativeCensuses = res.dataTable;
        });
        this.entityCensusPromise = this.tableService.getTableData('entityCensus', {}, 1, 3);
        this.entityCensusPromise.then(res => {
            this.tableEntityCensus = res.dataTable;
        });
    }
}
