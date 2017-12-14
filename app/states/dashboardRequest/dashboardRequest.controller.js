export class DashboardRequestController {

    dataList = [];

    chartValues = [{
        label: 'Richieste documentazione',
        value: 1,
        color: '#007284',
        childPage: 'tab.documentationRequests'
    }, {
        label: 'Richieste approvazione',
        value: 1,
        color: '#0097d9',
        childPage: 'tab.approvalRequests'
    }, {
        label: 'Eventi automatici',
        value: 1,
        color: '#df5356',
        childPage: 'tab.automaticEvents'
    }];
    constructor (WorkspaceService) {
        'ngInject';
        this.dashboardService = WorkspaceService;
        this.getData();
    }
    getData () {
        this.dashboardService.getData()
        .then(searchData => {
            this.dataList = searchData.data.OutputArray;
            console.log(this.dataList);
        }).catch(err => {
            console.log(err);
        });
    }
}
