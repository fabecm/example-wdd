export class ClassificationService {
    constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
    }

    getEntity (attribute, stringSearched, dfTermId) {
        let id = '';
        let text = '';
        let termIdQuery = '';
        if (attribute[0] && attribute[0] !== -1) {
            id = `&id=${attribute[0]}`;
        }
        if (stringSearched) {
            text = `&text=${stringSearched}`;
        }
        if (dfTermId) {
            termIdQuery = `&term_id=${dfTermId}`;
        }
        return this.$http.get(`WDD/filter/datasource/classification?type=Entity${text}${id}${termIdQuery}`);
    }

    getAttribute (entity, stringSearched) {
        let id = '';
        let text = '';
        if (entity[0] && entity[0] !== -1) {
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
