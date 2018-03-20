export class DetailsService {

    firstParam = true;

    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getEntityNameType (dipendence, stringSearched) {
        return this.$http.get(`WDD/details/autocomplete/?term_type=${dipendence[0]}&label_search=${stringSearched}`);
    }

    getEntityVersionList (term_id) {
        return this.$http.get(`WDD/entity/version/${term_id}`);
    }

    getEntityVersion (term_id, version_number) {
        return this.$http.get(`WDD/entity/history?term_id=${term_id}&version_number=${version_number}`);
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

    deleteEntityDraft (param) {
        return this.$http.get(`WDD/delete/draft?temp_term_id=${param.temp_term_id}&data_field_temp_term_id=${param.data_field_temp_term_id}`);
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
