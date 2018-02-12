export class ClassificationService {
    constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
    }

    getEntity (attribute, stringSearched) {
        let id = '';
        let text = '';
        if (attribute[0]) {
            id = `&id=${attribute[0]}`;
        }
        if (stringSearched) {
            text = `&text=${stringSearched}`;
        }
        return this.$http.get(`WDD/filter/datasource/classification?type=Entity${text}${id}`);
    }

    getAttribute (entity, stringSearched) {
        let id = '';
        let text = '';
        if (entity[0]) {
            id = `&id=${entity[0]}`;
        }
        if (stringSearched) {
            text = `&text=${stringSearched}`;
        }
        return this.$http.get(`WDD/filter/datasource/classification?type=Attribute${text}${id}`);
    }

    getEntityNoFather (stringSearched) {
        let entityName = '';
        if (stringSearched) {
            entityName = `?entityName=${stringSearched}`;
        }
        return this.$http.get(`WDD/filter/singleEntityCreatable${entityName}`);
    }
}
