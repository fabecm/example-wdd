export class Dashboards {
    constructor ($http) {
    // constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        // this.$q = $q;
        // this.$log = $log;
    }

    dashboardCall (type) {
        switch (type) {
            case 'dataquality':
                return this.getDataquality();
            case 'responsibleuser':
                return this.getResponsibleuser();
            case 'responsibleuserStatus':
                return this.getResponsibleuserStatus();
            case 'systemowner':
                return this.getSystemowner();


            default:
                return this.getDataquality();
        }
    }

    getDataquality () {
        return this.$http.get('WDD/dashboard/dataquality');
    }
    getResponsibleuser () {
        return this.$http.get('WDD/dashboard/responsibleuser');
    }
    getResponsibleuserStatus () {
        return this.$http.get('WDD/dashboard/responsibleuser/status');
    }
    getSystemowner () {
        return this.$http.get('WDD/dashboard/systemowner');
    }
}