export class DetailsService {
    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getDataFieldDetails (termId) {
        return this.$http.get(`WDD/details/${termId}`);
    }
}
