export class WorkspaceService {

    constructor ($http, $q) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
    }

    getFieldValues (type, stringSearched = '', dipendence) {
        switch (type) {
            case 'newRequestSO':
                return this.$http.get(`WDD/filter/newdata?type=systemowner&label_search=${stringSearched}`);
            case 'newRequestTA':
                return this.$http.get(`WDD/filter/newdata?type=techapp&systemowner_id=${dipendence[0]}&label_search=${stringSearched}`);
            case 'newRequestDS':
                return this.$http.get(`WDD/filter/newdata?type=datasource&techapp_id=${dipendence[0]}&label_search=${stringSearched}`);
            case 'newRequestDT':
                return this.$http.get(`WDD/filter/newdata?type=datatable&datasource_id=${dipendence[0]}&label_search=${stringSearched}`);
            case 'newRequestDF':
                return this.$http.get(`WDD/filter/newdata?type=datafield&datasource_id=${dipendence[0]}&label_search=${stringSearched}`);
            default:
                return this.$q.when([]);
        }
    }

}
