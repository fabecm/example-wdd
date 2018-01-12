export class TableService {
    defaultPageLength = 10;

    constructor ($q, $http, DataService, SearchWorkspaceService) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
        this.dataService = DataService;
        this.searchWorkspaceService = SearchWorkspaceService;
    }

    getTableData (key, filterApplied, pageNumber, pageLength = this.defaultPageLength) {
        switch (key) {
            case 'searchPage':
                return this.dataService.getData(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.OutputArray,
                        pages: res.data.page_count
                    });
                });

            case 'searchWorkspace':
                return this.searchWorkspaceService.getWorkspace(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.datalist,
                        pages: res.data.page_count
                    });
                });

            case 'toDoList':
                return this.dataService.getSystemOwnerTodoList(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.OutputArray,
                        pages: res.data.page_count
                    });
                });

            case 'initiativeCensuses':
                return this.dataService.getSystemOwnerInitiativeCensuses(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.OutputArray,
                        pages: res.data.page_count
                    });
                });
            default:
                return this.$q.when([]);
        }
    }
}
