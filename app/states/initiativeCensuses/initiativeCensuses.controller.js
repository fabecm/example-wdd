export class InitiativeCensusesController {

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
        label: 'Program',
        value: 'program'
    }, {
        label: 'Data Scadenza',
        value: 'data_scadenza'
    }];

    constructor ($state, $timeout, ModalService) {
        'ngInject';
        this.$timeout = $timeout;
        this.$state = $state;
        this.modalService = ModalService;

        this.initInitiativeCensuses();
    }

    initInitiativeCensuses () {
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

    openGestioneMassiva () {
        this.modalService.openMassiveManagmentModal();
    }

    createNewData () {
        this.modalService.openNewWorkspaceRequests();
    }


    filterChanged (filterApplied) {
        // this.dataService.getData(param)
        // .then(searchData => {
        //     this.rawData = angular.copy(searchData.data.OutputArray);
        //     this.dataList = searchData.data.OutputArray;
        //     let numPages = Math.ceil(this.dataList.length / this.pageSize);

        //     this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

        //     this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
        // });

        let param = filterApplied;
        this.filterApplied = filterApplied;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }
}
