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
        return this.$http.get('/getConfigurationEndpoint').then(apiEndpoint => {
            this.apiEntry = apiEndpoint.contextPath;
        });
    }

}
