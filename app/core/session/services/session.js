export class SessionService {
    constructor ($http, UserService, $q) {
        'ngInject';
        this.$http = $http;
        this.userService = UserService;
        this.$q = $q;
    }

    init () {
        return this.getApiEntry()
            .then(() => this.userService.getUser());
    }

    getApiEntry () {
        if(Boolean(true) === true) {
            return getMockedData(this.$q).then(apiEndpoint => {
                this.apiEntry = apiEndpoint.contextPath;
            });
        }
        return this.$http.get('/getConfigurationEndpoint').then(apiEndpoint => {
            this.apiEntry = apiEndpoint.contextPath;
        });
    }

}

function getMockedData ($q) {
    var deferred = $q.defer();

    deferred.resolve({
        contextPath: 'http://mbcl26001510:8080/edd-serviceWeb'
    });

    return deferred.promise;
}
