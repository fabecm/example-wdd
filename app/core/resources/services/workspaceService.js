export class WorkspaceService {

    constructor ($http, $q) {
        'ngInject';

        this.$q = $q;
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

    getData (key) {
        // return this.$http.post('WDD/search/workspace?pageNumber=0&pageLength=0 ', this.smth);
        let defer = this.$q.defer();
        switch (key) {
            case 'dataCentrico':
                defer.resolve(getMockedData());
                break;
            case 'workspaceCentrico':
                defer.resolve(getMockedDataWork());
                break;
            default:
                break;
        }

        return defer.promise;
    }
}

function getMockedDataWork () {
    return {
        data: {
            page_count: 1,
            OutputArray: [
                {
                    workspace: {
                        label: 'test workspace',
                        match: 0
                    },
                    data_field: {
                        label: 'test data field',
                        match: 0
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 0
                    },
                    data_source: {
                        label: 'test data source',
                        match: 0
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 0
                    },
                    system_owner: {
                        label: 'test systemOwner',
                        match: 0
                    }
                },
                {
                    workspace: {
                        label: 'test workspace',
                        match: 1
                    },
                    data_field: {
                        label: 'test data field',
                        match: 1
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 1
                    },
                    data_source: {
                        label: 'test data source',
                        match: 1
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 1
                    },
                    system_owner: {
                        label: 'test systemOwner',
                        match: 1
                    }
                },
                {
                    workspace: {
                        label: 'test workspace',
                        match: 2
                    },
                    data_field: {
                        label: 'test data field',
                        match: 2
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 2
                    },
                    data_source: {
                        label: 'test data source',
                        match: 2
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 2
                    },
                    system_owner: {
                        label: 'test systemOwner',
                        match: 2
                    }
                }
            ]
        }
    };
}

function getMockedData () {
    return {
        data: {
            page_count: 1,
            OutputArray: [
                {
                    data_field: {
                        label: 'test data field',
                        match: 0
                    },
                    data_field_description: {
                        label: 'test data field description',
                        match: 0
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 0
                    },
                    data_source: {
                        label: 'test data source',
                        match: 0
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 0
                    }
                },
                {
                    data_field: {
                        label: 'test data field',
                        match: 1
                    },
                    data_field_description: {
                        label: 'test data field description',
                        match: 1
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 1
                    },
                    data_source: {
                        label: 'test data source',
                        match: 1
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 1
                    }
                },
                {
                    data_field: {
                        label: 'test data field',
                        match: 2
                    },
                    data_field_description: {
                        label: 'test data field description',
                        match: 2
                    },
                    data_table: {
                        label: 'test dataTable',
                        match: 2
                    },
                    data_source: {
                        label: 'test data source',
                        match: 2
                    },
                    tech_application: {
                        label: 'test techApplication',
                        match: 2
                    }
                }
            ]
        }
    };
}
