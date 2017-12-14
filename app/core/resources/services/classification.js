export class ClassificationService {
    constructor ($http, $q, $log) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.$log = $log;
    }

    getEntity (attribute) {
        this.$log.debug(attribute);
        // let id = '';
        // if (attribute) {
        //     id = `&id=${attribute}`;
        // }
        // return this.$http.get(`WDD/filter/datasource/classification?type=Entity${id}`);
        let defer = this.$q.defer();
        defer.resolve(getEntityMock());
        return defer.promise;
    }

    getAttribute (entity) {
        this.$log.debug(entity);
        // let id = '';
        // if (entity) {
        //     id = `&id=${entity}`;
        // }
        // return this.$http.get(`WDD/filter/datasource/classification?type=Attribute${id}`);
        let defer = this.$q.defer();
        defer.resolve(getAttributeMock());
        return defer.promise;
    }
}

function getAttributeMock () {
    return {
        data: [
            {
                label: 'Data Layout',
                id: 201
            },
            {
                label: 'Retention',
                id: 202
            },
            {
                label: 'Rule',
                id: 203
            },
            {
                label: 'Full Description',
                id: 204
            },
            {
                label: 'Status',
                id: 205
            },
            {
                label: 'Data Length',
                id: 206
            },
            {
                label: 'Field',
                id: 207
            },
            {
                label: 'Data Type',
                id: 208
            },
            {
                label: 'Data Source',
                id: 209
            },
            {
                label: 'Description',
                id: 210
            },
            {
                label: 'Security Level',
                id: 211
            },
            {
                label: 'Destruction Requirements',
                id: 212
            },
            {
                label: 'Importance',
                id: 213
            },
            {
                label: 'Process',
                id: 214
            },
            {
                label: 'Data Position',
                id: 215
            },
            {
                label: 'Master Data',
                id: 216
            },
            {
                label: 'Group Legal Entities',
                id: 217
            },
            {
                label: 'Program',
                id: 218
            },
            {
                label: 'Data Source Type',
                id: 219
            },
            {
                label: 'Table',
                id: 220
            }
        ]
    };
}

function getEntityMock () {
    return {
        data: [
            {
                label: 'EDG DD - System Owner',
                id: 33
            },
            {
                label: 'EDG DD - Technical Application',
                id: 34
            },
            {
                label: 'EDG DD - Business Glossary',
                id: 35
            },
            {
                label: 'EDG DD - Program',
                id: 36
            },
            {
                label: 'EDG DD - Business Data',
                id: 37
            },
            {
                label: 'EDG DD - Data Source',
                id: 38
            },
            {
                label: 'EDG DD - Data Table',
                id: 39
            },
            {
                label: 'EDG DD - Process Owner',
                id: 40
            },
            {
                label: 'EDG DD - Responsible User',
                id: 41
            },
            {
                label: 'EDG DD - Business Rule',
                id: 42
            },
            {
                label: 'EDG DD - Data Field',
                id: 43
            },
            {
                label: 'EDG DD - Technical Rule',
                id: 44
            }
        ]
    };
}
