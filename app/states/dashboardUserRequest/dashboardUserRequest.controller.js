export class DashboardUserRequestController {

    dataList = [];

    overallPercentage = undefined;

    chartValues = [{
        label: 'Attivi',
        value: 0,
        color: '#0288D1',
        childPage: 'tab.toBeMonitored'
    }, {
        label: 'Nuovi',
        value: 0,
        color: '#FB8C00',
        childPage: 'tab.ruDashboard'
    }];

    workspaces = [{
        label: 'Workspace 1',
        requested: 100,
        censed: 70,
        perc: 70
    }, {
        label: 'Workspace 2',
        requested: 100,
        censed: 70,
        perc: 70
    }, {
        label: 'Workspace 3',
        requested: 100,
        censed: 70,
        perc: 70
    }]

    constructor (DashboardsService) {
        'ngInject';
        this.dashboardsService = DashboardsService;
        this.dashboardCall();
    }

    dashboardCall () {
        this.responsibleUserRequest = this.dashboardsService.dashboardCall('responsibleuser');
        this.responsibleUserRequest.then(getData => {
            this.dataList = getData.data.array;

            this.chartValues[0].value = this.dataList[0].value;
            this.chartValues[1].value = this.dataList[1].value;

            this.dataAvailable = true;
        });

        this.statusRequest = this.dashboardsService.dashboardCall('responsibleuserStatus');
        this.statusRequest.then(getData => {
            this.workspaceList = getData.data.array.map(data => {
                return {
                    id: data.id,
                    label: data.label,
                    requested: data.requested,
                    censed: data.completed
                };
            });

            let totalRequested = 0;
            for (let i = 0; i < this.workspaceList.length; i++) {
                totalRequested += Number(this.workspaceList[i].requested);
            }

            let totalConsed = 0;
            for (let i = 0; i < this.workspaceList.length; i++) {
                totalConsed += Number(this.workspaceList[i].censed);
            }

            if (totalRequested !== 0) {
                this.overallPercentage = Math.floor(totalConsed / totalRequested * 100);
            } else {
                this.overallPercentage = 0;
            }

            // this.workspaceList = this.workspaceList.splice(0, 5);
        });
    }
}
