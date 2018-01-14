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
        return this.$http.get('/getConfigurationEndpoint')
            .then(apiEndpoint => {
                this.apiEntry = apiEndpoint.contextPath;
            });
    }

}

function getMockedData ($q) {
    var deferred = $q.defer();
    deferred.resolve({
        contextPath: 'http://GPLLL0062:8080/edd-serviceWeb'
    });

    return deferred.promise;
}
