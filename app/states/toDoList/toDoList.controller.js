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
        label: 'Data field',
        value: 'data_field'
    }, {
        label: 'Data source table',
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
        label: 'Data scadenza',
        value: 'data_scadenza'
    }];

    constructor (DataService, DatasourceService, $state) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;
        this.$state = $state;

        this.getBootstrap();
        this.loadData();
    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

    loadData (params) {
        this.dataService.getData(params)
        .then(searchData => {
            this.rawData = angular.copy(searchData.data.OutputArray);
            this.dataList = searchData.data.OutputArray;
            let numPages = Math.ceil(this.dataList.length / this.pageSize);

            // slice data per current page
            this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

            // create an array of pages to ng-repeat, + 1 for a correct number
            this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
        });
    }

    sliceDataToShow (currentPage, pageSize) {
        let startIndex = (Number(currentPage) - 1) * Number(pageSize);
        let endIndex = startIndex + pageSize;
        let dataVisiblePage = this.rawData.slice(startIndex, endIndex);

        return dataVisiblePage;
    }

    changingPage (obj) {
        this.currentPage = obj;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }

    changingPageToFirst () {
        this.currentPage = 1;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }

    changingPageToLast () {
        this.currentPage = this.pages.length;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }

    filterChanged (arrayFilter) {
        let param = {};

        if (this.processOwnerChosen) {
            param.process_owner_id = this.processOwnerChosen.id;
        }
        if (this.systemOwnerChosen) {
            param.system_owner_id = this.systemOwnerChosen.id;
        }
        if (this.statusChosen) {
            param.status_code = this.statusChosen.label;
        }
        if (arrayFilter && arrayFilter.length > 0) {
            param.arrayFilter = arrayFilter;
        }

        this.dataService.getData(param)
        .then(searchData => {
            this.rawData = angular.copy(searchData.data.OutputArray);
            this.dataList = searchData.data.OutputArray;
            let numPages = Math.ceil(this.dataList.length / this.pageSize);

            this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

            this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
        });
    }

    getBootstrap () {
        this.datasourceService.getBootstrap().then(res => {
            this.filterBootstrap = {
                processOwner: res.data.process_owner,
                systemOwner: res.data.system_owner
            };
        });
    }
}
