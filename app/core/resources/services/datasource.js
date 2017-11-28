export class DatasourceService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getBootstrap () {
        return this.$http.get('http://GPLLL0062:8080/edd-serviceWeb/filter/datasource/bootstrap');
    }
}
