export class DashboardUserRequestController {

    dataList = [];

    overallPercentage = '19';

    chartValues = [{
        label: 'Attivi',
        value: 10,
        color: '#0288D1',
        childPage: 'tab.toBeMonitored'
    }, {
        label: 'Nuovi',
        value: 2,
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

    constructor () {

    }
}
