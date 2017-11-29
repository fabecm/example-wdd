export class ClassificationService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getEntity (attribute) {
        return this.$http.get(`http://GPLLL0062:8080/edd-serviceWeb/filter/datasource/classification?type=entity&id=${attribute}`);
    }

    getAttribute (entity) {
        return this.$http.get(`http://GPLLL0062:8080/edd-serviceWeb/filter/datasource/classification?type=attribute&id=${entity}`);
    }
}
