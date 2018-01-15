export class SessionService {
    constructor ($http, UserService, $q, WDDAlert) {
        'ngInject';
        this.$http = $http;
        this.userService = UserService;
        this.$q = $q;
        this.WDDAlert = WDDAlert;
    }

    init () {
        return this.getApiEntry()
            .then(() => this.userService.getUser());
    }

    getApiEntry () {
        if(Boolean(false) === true) {
            return getMockedData(this.$q).then(apiEndpoint => {
                this.apiEntry = apiEndpoint.contextPath;
            });
        }
        return this.$http.get('/edd-uiAppl/getConfigurationEndpoint')
            .then(apiEndpoint => {
                this.apiEntry = apiEndpoint.data.contextPath;
            });
    }

}

function getMockedData ($q) {
    var deferred = $q.defer();
    deferred.resolve({
        contextPath: 'http://10.238.9.61:8080/edd-serviceAppl'
    });

    return deferred.promise;
}
