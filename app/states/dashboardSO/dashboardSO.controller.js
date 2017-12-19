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
        color: '#F2BE00',
        childPage: 'tab.initiativeCensuses'
    }];

    constructor (WorkspaceService) {
        'ngInject';
        this.workspaceService = WorkspaceService;
        this.getData();
    }

    getData () {
        this.workspaceService.getData('dataCentrico')
        .then(searchData => {
            this.dataList = searchData.data.OutputArray;
            this.chartValues[0].value = this.dataList.length;
            this.chartValues[1].value = this.dataList.length;
        });
    }
}
