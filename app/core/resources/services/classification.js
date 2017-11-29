export class ClassificationService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getEntity (attribute) {
        let id = '';
        if (attribute) {
            id = `&id=${attribute}`;
        }
        return this.$http.get(`http://mbcl26001510:8080/edd-serviceWeb/filter/datasource/classification?type=Entity${id}`);
    }

    getAttribute (entity) {
        let id = '';
        if (entity) {
            id = `&id=${entity}`;
        }
        return this.$http.get(`http://mbcl26001510:8080/edd-serviceWeb/filter/datasource/classification?type=Attribute${id}`);
    }
}
