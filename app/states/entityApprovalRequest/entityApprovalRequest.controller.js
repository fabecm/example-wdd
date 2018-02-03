export class EntityApprovalRequestController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    // headerTable = [{
    //     label: 'Workspace',
    //     value: 'workspace'
    // }, {
    //     label: 'Descrizione',
    //     value: 'description'
    // }, {
    //     label: 'Data Inizio',
    //     value: 'start_date'
    // }, {
    //     label: 'Data Fine',
    //     value: 'end_date'
    // }, {
    //     label: 'Stato',
    //     value: 'status'
    // }];

    constructor (SearchWorkspaceService, $q, $state, ModalService) {
        'ngInject';
        this.searchWorkspaceService = SearchWorkspaceService;
        this.$q = $q;
        this.$state = $state;
        this.modalService = ModalService;

        this.initEntityApprovalRequest();
    }

    initEntityApprovalRequest () {

    }

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

}
