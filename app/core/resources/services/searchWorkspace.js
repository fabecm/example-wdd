class QueryParams {
    constructor (params) {
        let baseQuery = [];
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                const element = params[param];
                if (element) {
                    baseQuery.push(`${param}=${element}`);
                }
            }
        }
        if (baseQuery.length === 0) {
            this.stringedQuery = '';
        }
        this.stringedQuery = `?${baseQuery.join('&')}`;
    }

    getString () {
        return this.stringedQuery;
    }
}

export class SearchWorkspaceService {
    constructor ($q, $http, $filter) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
        this.$filter = $filter;
    }

    getWorkspace (pageNumber, pageLength, filterApplied) {
        let startDate;
        if (filterApplied.startDate) {
            startDate = this.$filter('date')(filterApplied.startDate, 'yyyy-MM-dd');
        }

        let endDate;
        if (filterApplied.endDate) {
            endDate = this.$filter('date')(filterApplied.endDate, 'yyyy-MM-dd');
        }

        let params = {
            pageNumber: pageNumber,
            pageLength: pageLength,
            workspace_id: filterApplied.workspaceSelected,
            description_id: filterApplied.descriptionSelected,
            startDate: startDate,
            endDate: endDate,
            status: filterApplied.status,
            type: filterApplied.type
        };

        if (filterApplied.order_by && filterApplied.order_type) {
            params.order_by = filterApplied.order_by;
            params.order_type = filterApplied.order_type;
            params.inner_order_by = filterApplied.order_by;
            params.inner_order_type = filterApplied.order_type;
        }

        let pathQuery = new QueryParams(params).getString();

        let path = `WDD/search/workspace${pathQuery}`;


        return this.$http.get(path);
    }

    // getWorkspaceRu () {
    //     let defer = this.$q.defer();
    //     defer.resolve(getData());
    //     return defer.promise;
    // }

}

// function getData () {
//     return {
//         page_count: 1,
//         outputArray: [
//             {
//                 workspace: {
//                     label: '0test workspace ',
//                     match: 0
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 0
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 0
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 0
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 0
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '1test workspace ',
//                     match: 1
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 1
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 1
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 1
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 1
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '2test workspace ',
//                     match: 2
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 2
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 2
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 2
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 2
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '3test workspace ',
//                     match: 3
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 3
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 3
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 3
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 3
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '4test workspace ',
//                     match: 4
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 4
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 4
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 4
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 4
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '5test workspace ',
//                     match: 5
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 5
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 5
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 5
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 5
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '6test workspace ',
//                     match: 6
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 6
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 6
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 6
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 6
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '7test workspace ',
//                     match: 7
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 7
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 7
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 7
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 7
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '8test workspace ',
//                     match: 8
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 8
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 8
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 8
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 8
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '9test workspace ',
//                     match: 9
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 9
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 9
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 9
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 9
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '10test workspace ',
//                     match: 10
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 10
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 10
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 10
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 10
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '11test workspace ',
//                     match: 11
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 11
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 11
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 11
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 11
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '12test workspace ',
//                     match: 12
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 12
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 12
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 12
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 12
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '13test workspace ',
//                     match: 13
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 13
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 13
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 13
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 13
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '14test workspace ',
//                     match: 14
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 14
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 14
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 14
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 14
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '15test workspace ',
//                     match: 15
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 15
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 15
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 15
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 15
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '16test workspace ',
//                     match: 16
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 16
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 16
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 16
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 16
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '17test workspace ',
//                     match: 17
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 17
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 17
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 17
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 17
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '18test workspace ',
//                     match: 18
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 18
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 18
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 18
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 18
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '19test workspace ',
//                     match: 19
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 19
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 19
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 19
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 19
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             },
//             {
//                 workspace: {
//                     label: '20test workspace ',
//                     match: 20
//                 },
//                 description: {
//                     label: 'test technical rule 44',
//                     match: 20
//                 },
//                 start_date: {
//                     label: 'test technical rule 5',
//                     match: 20
//                 },
//                 end_date: {
//                     label: 'test techApplication',
//                     match: 20
//                 },
//                 state: {
//                     label: 'test systemOwner',
//                     match: 20
//                 },
//                 data_fields: [{
//                     data_field: {
//                         id: 1,
//                         label: 'Dato1'
//                     },
//                     data_table: {label: 'Table1'},
//                     data_source: {label: 'Data source1'},
//                     tech_appl: {label: 'Tech appl1'},
//                     system_owner: {label: 'System ownerA'}
//                 }, {
//                     data_field: {
//                         id: 2,
//                         label: 'Dato2'
//                     },
//                     data_table: {label: 'Table2'},
//                     data_source: {label: 'Data source2'},
//                     tech_appl: {label: 'Tech appl2'},
//                     system_owner: {label: 'System ownerB'}
//                 }, {
//                     data_field: {
//                         id: 3,
//                         label: 'Dato3'
//                     },
//                     data_table: {label: 'Table3'},
//                     data_source: {label: 'Data source3'},
//                     tech_appl: {label: 'Tech appl3'},
//                     system_owner: {label: 'System ownerC'}
//                 }]
//             }
//         ]
//     };
// }
