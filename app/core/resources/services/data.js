export class DataService {
    constructor ($http) {
        'ngInject';

        this.$http = $http;
        this.smth = {
            "process_owner_id": 0,
            "system_owner_id": 0,
            "status_code": "string",
            "array_filter_text": [
              {
                "entity_id": "string",
                "attribute_id": "string",
                "text": "string"
              }
            ]
        }
    }
    
    getData () {
        // return this.$http.post('http://MBCL26001510:8080/edd-serviceWeb/search/fulltext', this.smth);
        // return this.$http.post('http://GPLLL0062:8080/edd-serviceWeb/search/fulltext ', this.smth);
        return this.$http.post('http://GPLLL0162:8080/edd-serviceWeb/search/fulltext ', this.smth);
    }
}
