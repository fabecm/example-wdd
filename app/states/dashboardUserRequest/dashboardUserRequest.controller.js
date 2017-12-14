export class DashboardUserRequestController {

    dataList = [];

    chartValues = [{
        label: 'Attivi',
        value: 10,
        color: '#0097D9',
        childPage: 'tab.toBeMonitored'
    }, {
        label: 'Nuovi',
        value: 2,
        color: '#F2BE00',
        childPage: 'tab.ruDashboard'
    }];

    constructor () {

    }
}
