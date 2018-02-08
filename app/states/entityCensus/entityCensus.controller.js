export class EntityCensusController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    headerTable = [{
        label: 'Tipo entità',
        value: 'type_entity'
    }, {
        label: 'Nome entità',
        value: 'name_entity'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'status'
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
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor ($state, $timeout, ModalService, WddCacheService) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initEntityCensus();
    }

    initEntityCensus () {
        let param = {};
        let filter = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_entityCensus')) {
            param.resetPage = false;
            filter = this.wddCacheService.getCachedFilter('filter_tab_entityCensus');
        }

        this.mapFilterSetted(param, filter);
    }

    // param: arrayFilter
    filterChanged (filterApplied) {

        console.log(filterApplied);
        // let param = {};
        // param.resetPage = true;

        // this.mapFilterSetted(param, arrayFilter);
    }

    createNewEntity () {

    }

    sendToApprove () {

    }

    // params: param, arrayFilter
    mapFilterSetted (param) {
        // if (arrayFilter.process_owner_id) {
        //     param.process_owner_id = arrayFilter.process_owner_id;
        // } else {
        //     param.process_owner_id = 0;
        // }
        // if (arrayFilter.system_owner_id) {
        //     param.system_owner_id = arrayFilter.system_owner_id;
        // } else {
        //     param.system_owner_id = 0;
        // }
        // if (arrayFilter.status_code) {
        //     param.status_code = arrayFilter.status_code;
        // }
        // if (arrayFilter.arrayFilter && arrayFilter.arrayFilter.length > 0) {
        //     param.array_filter_text = arrayFilter.arrayFilter;
        // }

        // this.filterSetted = param;

        this.$timeout(() => {
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

}
