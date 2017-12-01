export class WorkspaceService {

    constructor ($http) {
        'ngInject';

        this.$http = $http;
        this.smth = {
            page_type: 'string',
            status_code: 'string',
            array_filter_text: [{
                entity_id: 'string',
                attribute_id: 'string',
                text: 'string'
            }]
        };
    }

    getData () {
        // return this.$http.post('http://GPLLL0062:8080/edd-serviceWeb/search/workspace?pageNumber=0&pageLength=0 ', this.smth);
        return this.$http.post('http://10.238.9.61:8080/edd-serviceWeb/search/workspace?pageNumber=0&pageLength=0 ', this.smth);
    }
}