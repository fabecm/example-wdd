export class SessionService {
    constructor ($http, UserService, RuleProfileService, $q, WDDAlert, $state, $log) {
        'ngInject';
        this.$http = $http;
        this.userService = UserService;
        this.ruleProfileService = RuleProfileService;
        this.$q = $q;
        this.WDDAlert = WDDAlert;
        this.$state = $state;
        this.$log = $log;
    }

    init () {
        return this.getApiEntry()
            .then(() => this.userService.getUser())
            .then(() => this.ruleProfileService.getRuleProfile())
            .then(rules => {
                const dashboardStatesEnabled = this.$state.get().filter(state => rules.dashboards.indexOf(state.pageId) >= 0);
                let destinationPage = '';

                if ((this.userService.getAutorities()[0] === 'ROLE_SO') && dashboardStatesEnabled.find(e => e.name === 'tab.dashboardSO')) {
                    destinationPage = 'tab.dashboardSO';
                } else if ((this.userService.getAutorities()[0] === 'ROLE_DQ') && dashboardStatesEnabled.find(e => e.name === 'tab.dashboardRequest')) {
                    destinationPage = 'tab.dashboardRequest';
                } else if ((this.userService.getAutorities()[0] === 'ROLE_UR') && dashboardStatesEnabled.find(e => e.name === 'tab.dashboardUserRequest')) {
                    destinationPage = 'tab.dashboardUserRequest';
                } else {
                    destinationPage = 'tab.search';
                }
                this.$state.go(destinationPage);
            })
            .catch(err => {
                this.$log.debug(err);
                this.$state.go('tab.errorPage');
            });
    }

    getApiEntry () {
        if(Boolean(false) === true) {
            return getMockedData(this.$q).then(apiEndpoint => {
                this.apiEntry = apiEndpoint.contextPath;
                this.endPointSas = 'http://itam.hbl.local/jsasdqm/SASLineage/';
                this.objectIdSas = 'BDN:q5miodGw:';
            });
        }
        return this.$http.get('/edd-uiAppl/getConfigurationEndpoint')
            .then(apiEndpoint => {
                this.apiEntry = apiEndpoint.data.contextPath;
                this.endPointSas = apiEndpoint.data.endPointSas;
                this.objectIdSas = apiEndpoint.data.objectIdSas;
            });
    }

}

function getMockedData ($q) {
    var deferred = $q.defer();
    deferred.resolve({
        // contextPath: 'http://MBCL26001510:8080/edd-serviceAppl'
        contextPath: 'http://10.238.9.61:8080/edd-serviceWeb'
        // contextPath: 'http://localhost:8080/edd-serviceAppl'
    });

    return deferred.promise;
}
