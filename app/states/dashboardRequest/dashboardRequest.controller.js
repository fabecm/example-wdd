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
    }];

    constructor(DashboardsService) {
        'ngInject';
        this.dashboardsService = DashboardsService;
        this.dashboardCall();
    }

    dashboardCall() {
        this.dashboardsService.dashboardCall('dataquality')
            .then(getData => {
                this.dataList = getData.data.array;

                this.chartValues[0].value = this.dataList[0].value;
                this.chartValues[1].value = this.dataList[1].value;
                this.chartValues[2].value = this.dataList[2].value;

                // this is for magic in dashboardRequest.template.html ng-if="vm.dataAvailable"
                this.dataAvailable = true;
            });
    }




    // constructor (WorkspaceService) {
    //     'ngInject';
    //     this.workspaceService = WorkspaceService;
    //     this.getData();
    // }

    // getData () {
    //     this.workspaceService.getData('workspaceCentrico')
    //     .then(searchData => {
    //         this.dataList = searchData.data.OutputArray;
    //         this.chartValues[0].value = 99;
    //         this.chartValues[1].value = this.dataList.length;
    //         this.chartValues[2].value = this.dataList.length;
    //     });
    // }


}