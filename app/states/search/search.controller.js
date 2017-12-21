export class SearchController {

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
        value: 'tech_rules'
    }, {
        label: 'Business Rule',
        value: 'business_rules'
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

    constructor (DataService, DatasourceService) {
        'ngInject';
        this.datasourceService = DatasourceService;
        this.dataService = DataService;

        this.getBootstrap();
        // this.loadData();
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

    changeTab (tab) {
        this.selectedTab = tab;
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
            // this.dataList = searchData.data.OutputArray;
            let tableEntity = getEntityTable();
            this.rawDataEntity = tableEntity.data.OutputArray;
            // let numPages = Math.ceil(this.dataList.length / this.pageSize);

            // this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

            // this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
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

function getEntityTable () {
    return {
        data: {
            OutputArray: [
                {
                    term_type: {
                        label: 'Term type 1',
                        value: 1
                    },
                    term_name: {
                        label: 'Term name 1',
                        value: 1
                    },
                    description: {
                        label: 'Description 1',
                        value: 1
                    },
                    state: {
                        label: 'Stato 1',
                        value: 1
                    },
                    last_change: {
                        label: '30/06/2006',
                        value: 1
                    }
                },
                {
                    term_type: {
                        label: 'Term type 2',
                        value: 2
                    },
                    term_name: {
                        label: 'Term name 2',
                        value: 2
                    },
                    description: {
                        label: 'Description 2',
                        value: 2
                    },
                    state: {
                        label: 'Stato 2',
                        value: 2
                    },
                    last_change: {
                        label: '30/06/2006',
                        value: 2
                    }
                },
                {
                    term_type: {
                        label: 'Term type 3',
                        value: 3
                    },
                    term_name: {
                        label: 'Term name 3',
                        value: 3
                    },
                    description: {
                        label: 'Description 3',
                        value: 3
                    },
                    state: {
                        label: 'Stato 3',
                        value: 3
                    },
                    last_change: {
                        label: '30/06/2006',
                        value: 3
                    }
                }, {
                    term_type: {
                        label: 'Term type 4',
                        value: 4
                    },
                    term_name: {
                        label: 'Term name 4',
                        value: 4
                    },
                    description: {
                        label: 'Description 4',
                        value: 4
                    },
                    state: {
                        label: 'Stato 4',
                        value: 4
                    },
                    last_change: {
                        label: '30/06/2006',
                        value: 4
                    }
                },
                {
                    term_type: {
                        label: 'Term type 5',
                        value: 5
                    },
                    term_name: {
                        label: 'Term name 5',
                        value: 5
                    },
                    description: {
                        label: 'Description 5',
                        value: 5
                    },
                    state: {
                        label: 'Stato 5',
                        value: 5
                    },
                    last_change: {
                        label: '30/06/2006',
                        value: 5
                    }
                }
            ]
        }
    };
}
