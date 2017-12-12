export class FilterWorkspace {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    updateList (type, stringSearched) {
        switch (type) {
            case 'workspace':
                return this.getWorkspace(stringSearched);
            case 'description':
                return this.getDescription(stringSearched);
            default:
                return this.$q().promise;
        }
    }

    getWorkspace (stringSearched) {
        console.log(stringSearched);
        return getMockedWorkspace(this.$q);
    }

    getDescription (stringSearched) {
        console.log(stringSearched);
        return getMockedDescription(this.$q);
    }
}

function getMockedDescription ($q) {
    var deferred = $q.defer();

    var x = Date.now();

    if (x % 2 === 0) {
        deferred.resolve([{
            label: 'd5',
            value: 5
        }, {
            label: 'd6',
            value: 6
        }, {
            label: 'd7',
            value: 7
        }]);
    } else {
        deferred.resolve([{
            label: 'd8',
            value: 8
        }, {
            label: 'd9',
            value: 9
        }, {
            label: 'd0',
            value: 0
        }]);
    }

    return deferred.promise;
}

function getMockedWorkspace ($q) {
    var deferred = $q.defer();

    var x = Date.now();

    if (x % 2 === 0) {
        deferred.resolve([{
            label: 'w5',
            value: 5
        }, {
            label: 'w6',
            value: 6
        }, {
            label: 'w7',
            value: 7
        }]);
    } else {
        deferred.resolve([{
            label: 'w8',
            value: 8
        }, {
            label: 'w9',
            value: 9
        }, {
            label: 'w0',
            value: 0
        }]);
    }

    return deferred.promise;
}