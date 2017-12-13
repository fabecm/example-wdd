export class DashboardSOController {

    dataList = [];
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
