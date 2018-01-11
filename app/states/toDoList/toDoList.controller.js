export class ToDoListController {

    dataList = [];
    pages = [];
    rawData = [];
    pageSize = 10;
    currentPage = 1;
    filterBootstrap = {};
    filterStatus = [{
        label: 'Tutti'
    }, {
        label: 'Bozza'
    }, {
        label: 'Produzione'
    }];

    tablePagination = true;
    tablePageSize = 10;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
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
        value: 'tech_application'
    }, {
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'state'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    constructor (DataService, DatasourceService, $state, $timeout) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;
        this.$state = $state;
        this.$timeout = $timeout;

        // this.getBootstrap();
        // this.loadData();
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    initToDoList () {
        this.$timeout(() => {
            this.reloadTableData({});
        });
    }

    // loadData (params) {
    //     this.dataService.getData(params)
    //     .then(searchData => {
    //         this.rawData = angular.copy(searchData.data.OutputArray);
    //         this.dataList = searchData.data.OutputArray;
    //         let numPages = Math.ceil(this.dataList.length / this.pageSize);

    //         // slice data per current page
    //         this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

    //         // create an array of pages to ng-repeat, + 1 for a correct number
    //         this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
    //     });
    // }

    // sliceDataToShow (currentPage, pageSize) {
    //     let startIndex = (Number(currentPage) - 1) * Number(pageSize);
    //     let endIndex = startIndex + pageSize;
    //     let dataVisiblePage = this.rawData.slice(startIndex, endIndex);

    //     return dataVisiblePage;
    // }

    // changingPage (obj) {
    //     this.currentPage = obj;

    //     this.dataList = this.rawData;

    //     this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    // }

    // changingPageToFirst () {
    //     this.currentPage = 1;

    //     this.dataList = this.rawData;

    //     this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    // }

    // changingPageToLast () {
    //     this.currentPage = this.pages.length;

    //     this.dataList = this.rawData;

    //     this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    // }

    filterChanged (arrayFilter) {
        let param = {};
        param.resetPage = true;

        if (arrayFilter.process_owner_id) {
            param.process_owner_id = arrayFilter.process_owner_id;
        } else {
            param.process_owner_id = 0;
        }
        if (arrayFilter.system_owner_id) {
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
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    // getBootstrap () {
    //     this.datasourceService.getBootstrap().then(res => {
    //         this.filterBootstrap = {
    //             processOwner: res.data.process_owner,
    //             systemOwner: res.data.system_owner
    //         };
    //     });
    // }
}
