export class DataService {
    constructor ($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
    }

    // Use this one
    getData (pageNumber, pageLength, params = {}) {
        return this.$http.post(`WDD/search/fulltext?pageNumber=${pageNumber}&pageLength=${pageLength}`, params);
    }

    // // Mock function (not use)
    // getData (params = {}) {
    //     let defer = this.$q.defer();
    //     defer.resolve(getMockData(params));
    //     return defer.promise;
    // }
}

// function getMockData () {
//     return {
//         data: {
//             page_count: 1,
//             OutputArray: [
//                 {
//                     workspace: {
//                         label: '0test workspace ',
//                         match: 0
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 0
//                     },
//                     data_fields: [{
//                         data_field: {
//                             id: 1,
//                             label: 'Dato1'
//                         },
//                         data_table: {label: 'Table1'},
//                         data_source: {label: 'Data source1'},
//                         tech_appl: {label: 'Tech appl1'},
//                         system_owner: {label: 'System ownerA'}
//                     }, {
//                         data_field: {
//                             id: 2,
//                             label: 'Dato2'
//                         },
//                         data_table: {label: 'Table2'},
//                         data_source: {label: 'Data source2'},
//                         tech_appl: {label: 'Tech appl2'},
//                         system_owner: {label: 'System ownerB'}
//                     }, {
//                         data_field: {
//                             id: 3,
//                             label: 'Dato3'
//                         },
//                         data_table: {label: 'Table3'},
//                         data_source: {label: 'Data source3'},
//                         tech_appl: {label: 'Tech appl3'},
//                         system_owner: {label: 'System ownerC'}
//                     }],
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 0
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 0
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 0
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 0
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 0
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 0
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 0
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 0
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 0
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 0',
//                         match: 0
//                     },
//                     business_glossary: {
//                         label: 'test business rule 0',
//                         match: 0
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 0
//                     },
//                     data_scadenza: {
//                         label: '10/10/12'
//                     },
//                     id_field: 0
//                 },
//                 {
//                     workspace: {
//                         label: '1test workspace ',
//                         match: 1
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 1
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 1
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 1
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 1
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 1
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 1
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 1
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 1
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 1
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 1
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 1',
//                         match: 1
//                     },
//                     business_glossary: {
//                         label: 'test business rule 1',
//                         match: 1
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 1
//                     },
//                     id_field: 1
//                 },
//                 {
//                     workspace: {
//                         label: '2test workspace ',
//                         match: 2
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 2
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 2
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 2
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 2
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 2
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 2
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 2
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 2
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 2
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 2
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 2',
//                         match: 2
//                     },
//                     business_glossary: {
//                         label: 'test business rule 2',
//                         match: 2
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 2
//                     },
//                     id_field: 2
//                 },
//                 {
//                     workspace: {
//                         label: '3test workspace ',
//                         match: 3
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 3
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 3
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 3
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 3
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 3
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 3
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 3
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 3
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 3
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 3
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 3',
//                         match: 3
//                     },
//                     business_glossary: {
//                         label: 'test business rule 3',
//                         match: 3
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 3
//                     },
//                     id_field: 3
//                 },
//                 {
//                     workspace: {
//                         label: '4test workspace ',
//                         match: 4
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 4
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 4
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 4
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 4
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 4
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 4
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 4
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 4
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 4
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 4
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 4',
//                         match: 4
//                     },
//                     business_glossary: {
//                         label: 'test business rule 4',
//                         match: 4
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 4
//                     },
//                     id_field: 4
//                 },
//                 {
//                     workspace: {
//                         label: '5test workspace ',
//                         match: 5
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 5
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 5
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 5
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 5
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 5
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 5
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 5
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 5
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 5
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 5
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 5',
//                         match: 5
//                     },
//                     business_glossary: {
//                         label: 'test business rule 5',
//                         match: 5
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 5
//                     },
//                     id_field: 5
//                 },
//                 {
//                     workspace: {
//                         label: '6test workspace ',
//                         match: 6
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 6
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 6
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 6
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 6
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 6
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 6
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 6
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 6
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 6
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 6
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 6',
//                         match: 6
//                     },
//                     business_glossary: {
//                         label: 'test business rule 6',
//                         match: 6
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 6
//                     },
//                     id_field: 6
//                 },
//                 {
//                     workspace: {
//                         label: '7test workspace ',
//                         match: 7
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 7
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 7
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 7
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 7
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 7
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 7
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 7
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 7
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 7
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 7
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 7',
//                         match: 7
//                     },
//                     business_glossary: {
//                         label: 'test business rule 7',
//                         match: 7
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 7
//                     },
//                     id_field: 7
//                 },
//                 {
//                     workspace: {
//                         label: '8test workspace ',
//                         match: 8
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 8
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 8
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 8
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 8
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 8
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 8
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 8
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 8
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 8
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 8
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 8',
//                         match: 8
//                     },
//                     business_glossary: {
//                         label: 'test business rule 8',
//                         match: 8
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 8
//                     },
//                     id_field: 8
//                 },
//                 {
//                     workspace: {
//                         label: '9test workspace ',
//                         match: 9
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 9
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 9
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 9
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 9
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 9
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 9
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 9
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 9
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 9
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 9
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 9',
//                         match: 9
//                     },
//                     business_glossary: {
//                         label: 'test business rule 9',
//                         match: 9
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 9
//                     },
//                     id_field: 9
//                 },
//                 {
//                     workspace: {
//                         label: '10test workspace ',
//                         match: 10
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 10
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 10
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 10
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 10
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 10
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 10
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 10
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 10
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 10
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 10
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 10',
//                         match: 10
//                     },
//                     business_glossary: {
//                         label: 'test business rule 10',
//                         match: 10
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 10
//                     },
//                     id_field: 10
//                 },
//                 {
//                     workspace: {
//                         label: '11test workspace ',
//                         match: 11
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 11
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 11
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 11
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 11
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 11
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 11
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 11
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 11
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 11
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 11
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 11',
//                         match: 11
//                     },
//                     business_glossary: {
//                         label: 'test business rule 11',
//                         match: 11
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 11
//                     },
//                     id_field: 11
//                 },
//                 {
//                     workspace: {
//                         label: '12test workspace ',
//                         match: 12
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 12
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 12
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 12
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 12
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 12
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 12
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 12
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 12
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 12
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 12
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 12',
//                         match: 12
//                     },
//                     business_glossary: {
//                         label: 'test business rule 12',
//                         match: 12
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 12
//                     },
//                     id_field: 12
//                 },
//                 {
//                     workspace: {
//                         label: '13test workspace ',
//                         match: 13
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 13
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 13
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 13
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 13
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 13
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 13
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 13
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 13
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 13
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 13
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 13',
//                         match: 13
//                     },
//                     business_glossary: {
//                         label: 'test business rule 13',
//                         match: 13
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 13
//                     },
//                     id_field: 13
//                 },
//                 {
//                     workspace: {
//                         label: '14test workspace ',
//                         match: 14
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 14
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 14
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 14
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 14
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 14
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 14
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 14
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 14
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 14
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 14
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 14',
//                         match: 14
//                     },
//                     business_glossary: {
//                         label: 'test business rule 14',
//                         match: 14
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 14
//                     },
//                     id_field: 14
//                 },
//                 {
//                     workspace: {
//                         label: '15test workspace ',
//                         match: 15
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 15
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 15
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 15
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 15
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 15
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 15
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 15
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 15
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 15
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 15
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 15',
//                         match: 15
//                     },
//                     business_glossary: {
//                         label: 'test business rule 15',
//                         match: 15
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 15
//                     },
//                     id_field: 15
//                 },
//                 {
//                     workspace: {
//                         label: '16test workspace ',
//                         match: 16
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 16
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 16
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 16
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 16
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 16
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 16
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 16
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 16
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 16
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 16
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 16',
//                         match: 16
//                     },
//                     business_glossary: {
//                         label: 'test business rule 16',
//                         match: 16
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 16
//                     },
//                     id_field: 16
//                 },
//                 {
//                     workspace: {
//                         label: '17test workspace ',
//                         match: 17
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 17
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 17
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 17
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 17
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 17
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 17
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 17
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 17
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 17
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 17
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 17',
//                         match: 17
//                     },
//                     business_glossary: {
//                         label: 'test business rule 17',
//                         match: 17
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 17
//                     },
//                     id_field: 17
//                 },
//                 {
//                     workspace: {
//                         label: '18test workspace ',
//                         match: 18
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 18
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 18
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 18
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 18
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 18
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 18
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 18
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 18
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 18
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 18
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 18',
//                         match: 18
//                     },
//                     business_glossary: {
//                         label: 'test business rule 18',
//                         match: 18
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 18
//                     },
//                     id_field: 18
//                 },
//                 {
//                     workspace: {
//                         label: '19test workspace ',
//                         match: 19
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 19
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 19
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 19
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 19
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 19
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 19
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 19
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 19
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 19
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 19
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 19',
//                         match: 19
//                     },
//                     business_glossary: {
//                         label: 'test business rule 19',
//                         match: 19
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 19
//                     },
//                     id_field: 19
//                 },
//                 {
//                     workspace: {
//                         label: '20test workspace ',
//                         match: 20
//                     },
//                     data_field: {
//                         label: 'test technical rule 44',
//                         match: 20
//                     },
//                     data_table: {
//                         label: 'test dataTable',
//                         match: 20
//                     },
//                     data_source: {
//                         label: 'test technical rule 5',
//                         match: 20
//                     },
//                     tech_application: {
//                         label: 'test techApplication',
//                         match: 20
//                     },
//                     system_owner: {
//                         label: 'test systemOwner',
//                         match: 20
//                     },
//                     program: {
//                         label: 'test program',
//                         match: 20
//                     },
//                     tech_rules: [
//                         {
//                             label: 'test technical rule item38',
//                             match: 20
//                         },
//                         {
//                             label: 'test technical rule item38',
//                             match: 20
//                         }
//                     ],
//                     business_rules: [
//                         {
//                             label: 'test technical rule 3',
//                             match: 20
//                         },
//                         {
//                             label: 'test technical rule 4',
//                             match: 20
//                         }
//                     ],
//                     business_data: {
//                         label: 'test business rule 20',
//                         match: 20
//                     },
//                     business_glossary: {
//                         label: 'test business rule 20',
//                         match: 20
//                     },
//                     process_owner: {
//                         label: 'test processOwner',
//                         match: 20
//                     },
//                     id_field: 20
//                 }
//             ]
//         }
//     };
// }
