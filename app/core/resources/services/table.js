export class TableService {
    defaultPageLength = 10;

    constructor ($q, $http, DataService, SearchWorkspaceService, ModalService) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
        this.dataService = DataService;
        this.searchWorkspaceService = SearchWorkspaceService;
        this.modalService = ModalService;
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
                        dataTable: res.data.data_list,
                        pages: res.data.page_count
                    });
                });

            case 'initiativeCensuses':
                return this.dataService.getSystemOwnerInitiativeCensuses(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.data_list,
                        pages: res.data.page_count
                    });
                });

            case 'entityCensus':
                return this.dataService.getSystemOwnerEntityCensuses(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.data_list,
                        pages: res.data.page_count
                    });
                });

            case 'approvalRequest':
                return this.dataService.getDQApprovalRequest(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.data_list,
                        pages: res.data.page_count
                    });
                });

            case 'automaticEvents':
                return this.dataService.getDQAutomaticEvents(pageNumber, pageLength, filterApplied).then(res => {
                    return ({
                        dataTable: res.data.data_list,
                        pages: res.data.page_count
                    });
                });

            case 'processHistory':
                return this.modalService.getProcessHistory(filterApplied.termId).then(res => {
                    return ({
                        dataTable: res.data.array,
                        pages: 1
                    });
                });

            default:
                return this.$q.when([]);
        }
    }
}
