export class ClassificationService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getEntity (attribute) {
        return this.$http.get(`http://MBCL26001510:8080/edd-serviceWeb/filter/datasource/classification?type=entity&id=${attribute}`);
    }

    getAttribute (entity) {
        return this.$http.get(`http://MBCL26001510:8080/edd-serviceWeb/filter/datasource/classification?type=attribute&id=${entity}`);
    }
}
