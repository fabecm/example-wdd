export class DataService {
    constructor ($http) {
        'ngInject';

        this.$http = $http;
    }
    getData () {
        return this.$http.get('http://localhost/getData');
    }
}
