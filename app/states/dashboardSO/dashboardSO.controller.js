export class DashboardSOController {

    dataList = [];

    chartValues = [{
        label: 'To do list',
        value: 1,
        color: '#0097D9',
        childPage: 'tab.toDoList'
    }, {
        label: 'Censiti di iniziativa',
        value: 1,
        color: '#F2BE00',
        childPage: 'tab.initiativeCensuses'
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
