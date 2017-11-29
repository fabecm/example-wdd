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

    getData (params = {}) {
        return this.$http.post('WDD/search/fulltext ', params);
    }
}
