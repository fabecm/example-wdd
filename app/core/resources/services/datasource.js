export class DatasourceService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getBootstrap () {
        return this.$http.get('WDD/filter/datasource/bootstrap');
    }
}
