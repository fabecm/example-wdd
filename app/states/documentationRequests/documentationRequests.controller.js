export class DocumentationRequestsController {

    dataList = [];
    pages = [];
    rawData = [];
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
    tableExpandable = true;

    headerTable = [{
        label: 'Workspace',
        value: 'workspace'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Data Table',
        value: 'data_table'
    }, {
        label: 'Data Inizio',
        value: 'start_date'
    }, {
        label: 'Data Fine',
        value: 'end_date'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    headerTableExpandable = [{
        label: 'Data Field',
        value: 'data_fields'
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
    }]

    constructor (DataService, DatasourceService, $state, $timeout, ModalService) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;

        this.initDocumentationRequest();

        // this.getBootstrap();
        // this.loadData();
    }

    initDocumentationRequest () {
        this.$timeout(() => {
            let param = {};
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

    createNewWorkspace () {
        this.modalService.openNewWorkspaceModal();
    }

    filterChanged (filterApplied) {
        let param = filterApplied;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
        // let param = {};

        // if (this.processOwnerChosen) {
        //     param.process_owner_id = this.processOwnerChosen.id;
        // }
        // if (this.systemOwnerChosen) {
        //     param.system_owner_id = this.systemOwnerChosen.id;
        // }
        // if (this.statusChosen) {
        //     param.status_code = this.statusChosen.label;
        // }
        // if (arrayFilter && arrayFilter.length > 0) {
        //     param.arrayFilter = arrayFilter;
        // }

        // this.dataService.getData(param)
        // .then(searchData => {
        //     this.rawData = angular.copy(searchData.data.OutputArray);
        //     this.dataList = searchData.data.OutputArray;
        //     let numPages = Math.ceil(this.dataList.length / this.pageSize);

        //     this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

        //     this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
        // });
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
