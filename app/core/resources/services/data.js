export class DataService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getData (params = {}) {
        return this.$http.post('WDD/search/fulltext ', params);
    }
}
