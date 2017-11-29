export class DatasourceService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getBootstrap () {
        return this.$http.get('http://mbcl26001510:8080/edd-serviceWeb/filter/datasource/bootstrap');
    }
}
