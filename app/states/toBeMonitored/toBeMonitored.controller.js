export class ToBeMonitoredController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Data Inizio',
        value: 'start_date'
    }, {
        label: 'Data Fine',
        value: 'end_date'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Avanzamento',
        value: 'step'
    }];

    headerTableExpandable = [{
        label: 'Data Field',
        value: 'data_field'
    }, {
        label: 'Data Table',
        value: 'data_table'
    }, {
        label: 'Data Source',
        value: 'data_source'
    }, {
        label: 'Technical Application',
        value: 'tech_appl'
    }, {
        label: 'System owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor ($q, $state, $timeout) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.$timeout = $timeout;

        this.initToBeMonitored();
    }

    initToBeMonitored () {
        // getHeader(this.$q).then(headerRes => {
        //     this.headerTable = headerRes;
        // });
        // getHeaderExpandable(this.$q).then(headerExpRes => {
        //     this.headerTableExpandable = headerExpRes;
        // });

        this.$timeout(() => {
            let param = {};
            param.type = 'attivi';
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    filterChanged (filterApplied) {
        let param = filterApplied;
        param.type = 'attivi';

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}

// function getHeader ($q) {
//     let defer = $q.defer();
//     defer.resolve([{
//         label: 'Workspace',
//         value: 'workspace'
//     }, {
//         label: 'Descrizione',
//         value: 'description'
//     }, {
//         label: 'Data Inizio',
//         value: 'start_date'
//     }, {
//         label: 'Data Fine',
//         value: 'end_date'
//     }, {
//         label: 'Stato',
//         value: 'state'
//     }, {
//         label: 'Avanzamento',
//         value: 'step'
//     }]);
//     return defer.promise;
// }

// function getHeaderExpandable ($q) {
//     let defer = $q.defer();
//     defer.resolve([{
//         label: 'Data Field',
//         value: 'data_field'
//     }, {
//         label: 'Data Table',
//         value: 'data_table'
//     }, {
//         label: 'Data Source',
//         value: 'data_source'
//     }, {
//         label: 'Technical Application',
//         value: 'tech_appl'
//     }, {
//         label: 'System owner',
//         value: 'system_owner'
//     }]);
//     return defer.promise;
// }
