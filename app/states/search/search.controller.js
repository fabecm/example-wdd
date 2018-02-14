export class SearchController {

    dataList = [];
    pages = [];
    rawData = [];
    pageSize = 10;
    currentPage = 1;
    // filterBootstrap = {};

    showEntityView = false;

    filterStatus = [{
        label: 'Tutti'
    }, {
        label: 'Bozza'
    }, {
        label: 'Produzione'
    }];

    reloadTableData = undefined;

    selectedTab = 0;
    // 0 is Data, 1 is Entity

    tablePagination = true;
    tablePageSize = 10;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Data field',
        value: 'data_field'
    }, {
        label: 'Data table',
        value: 'data_table'
    }, {
        label: 'Data source',
        value: 'data_source'
    }, {
        label: 'Technical application',
        value: 'tech_application'
    }, {
        label: 'System owner',
        value: 'system_owner'
    }, {
        label: 'Program',
        value: 'program'
    }, {
        label: 'Technical Rule',
        value: 'tech_rule'
    }, {
        label: 'Business Rule',
        value: 'business_rule'
    }, {
        label: 'Business Data',
        value: 'business_data'
    }, {
        label: 'Business Glossary',
        value: 'business_glossary'
    }, {
        label: 'Process Owner',
        value: 'process_owner'
    }];

    headerEntityTable = [{
        label: 'Term Type',
        value: 'term_type'
    }, {
        label: 'Term Name',
        value: 'term_name'
    }, {
        label: 'Description',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'state'
    }, {
        label: 'Ultima Modifica',
        value: 'last_change'
    }];

    constructor (DataService, DatasourceService, $timeout, WddCacheService) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;
        this.$timeout = $timeout;
        this.wddCacheService = WddCacheService;

        this.initSearchPage();
    }

    initSearchPage () {
        if (this.wddCacheService.getCachedFilter('filter_tab_search')) {
            let param = {};
            param.resetPage = false;
            this.mapFilterSetted(param, this.wddCacheService.getCachedFilter('filter_tab_search'));
        }
    }

    changeTab (tab) {
        this.selectedTab = tab;
    }

    filterChanged (arrayFilter) {
        let param = {};
        param.resetPage = true;

        this.mapFilterSetted(param, arrayFilter);
    }

    mapFilterSetted (param, arrayFilter) {
        if (arrayFilter.process_owner_id && arrayFilter.process_owner_id !== -1) {
            param.process_owner_id = arrayFilter.process_owner_id;
        } else {
            param.process_owner_id = 0;
        }
        if (arrayFilter.system_owner_id && arrayFilter.system_owner_id !== -1) {
            param.system_owner_id = arrayFilter.system_owner_id;
        } else {
            param.system_owner_id = 0;
        }
        if (arrayFilter.status_code) {
            param.status_code = arrayFilter.status_code;
        }
        if (arrayFilter.arrayFilter && arrayFilter.arrayFilter.length > 0) {
            param.array_filter_text = arrayFilter.arrayFilter;
        }

        this.$timeout(() => {
            this.showTab = true;
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
