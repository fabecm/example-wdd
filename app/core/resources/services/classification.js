export class ClassificationService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    getEntity (attribute) {
        let defer = this.$q.defer();
        if (attribute) {
            defer.resolve(['D', 'E', 'F']);
        } else {
            defer.resolve(['A', 'B', 'C']);
        }
        return defer.promise;
    }

    getAttribute (entity) {
        let defer = this.$q.defer();
        if (entity) {
            defer.resolve(['4', '5', '6']);
        } else {
            defer.resolve(['1', '2', '3']);
        }
        return defer.promise;
    }
}
