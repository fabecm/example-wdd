export class WorkspaceService {

    constructor ($http, $q) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
    }

    getFieldValues (type, stringSearched = '', dipendence, isInitiativeCensus = false) {
        switch (type) {
            case 'newRequestSO':
                return this.$http.get(`WDD/filter/newdata?type=systemowner&label_search=${stringSearched}&initiative_census_so=${isInitiativeCensus}`);
            case 'newRequestTA':
                return this.$http.get(`WDD/filter/newdata?type=techapp&systemowner_id=${dipendence[0]}&label_search=${stringSearched}`);
            case 'newRequestDS':
                return this.$http.get(`WDD/filter/newdata?type=datasource&systemowner_id=${dipendence[0]}&techapp_id=${dipendence[1]}&label_search=${stringSearched}`);
            case 'newRequestDT':
                return this.$http.get(`WDD/filter/newdata?type=datatable&systemowner_id=${dipendence[0]}&techapp_id=${dipendence[1]}&datasource_id=${dipendence[2]}&label_search=${stringSearched}`);
            case 'newRequestDF':
                let datatable = '';
                if (dipendence[3]) {
                    datatable += `&datatable_id=${dipendence[3]}`;
                }
                return this.$http.get(`WDD/filter/newdata?type=datafield&systemowner_id=${dipendence[0]}&techapp_id=${dipendence[1]}&datasource_id=${dipendence[2]}${datatable}&label_search=${stringSearched}`);
            default:
                return this.$q.when([]);
        }
    }

}
