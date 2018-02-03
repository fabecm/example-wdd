export class DetailsService {

    firstParam = true;

    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getDataFieldDetails (termId, isDraft) {
        return this.$http.get(`WDD/details/${termId}?draft=${isDraft}`);
    }

    saveEntity (entity) {
        return this.$http.post('WDD/save/entity', entity);
    }

    deleteEntity (param) {
        let path = '';
        path += this.checkProperty(param.term_id, 'term_id');
        path += this.checkProperty(param.temp_term_id, 'temp_term_id');
        path += this.checkProperty(param.data_field_term_id, 'data_field_term_id');
        path += this.checkProperty(param.data_field_temp_term_id, 'data_field_temp_term_id');
        this.firstParam = true;
        return this.$http.get(`WDD/delete/entity${path}`);
    }

    checkProperty (property, label) {
        if (property) {
            if (this.firstParam) {
                this.firstParam = false;
                return `?${label}=${property}`;
            }
            return `&${label}=${property}`;
        }
        return '';
    }
}
