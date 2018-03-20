export class EntityApprovalRequestController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    headerTable = [{
        label: 'Tipo entità',
        value: 'term_type'
    }, {
        label: 'Nome entità',
        value: 'term_name'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    headerTableExpandable = [{
        label: 'Tipo entità',
        value: 'term_type'
    }, {
        label: 'Nome entità',
        value: 'term_name'
    }, {
        label: 'Descrizione',
        value: 'description'
    }];

    approveStatus = ['In approvazione'];
    rejectStatus = ['In approvazione'];

    constructor ($state, $timeout, ModalService, WddCacheService) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initEntityApprovalRequest();
    }

    initEntityApprovalRequest () {
        let param = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_entityApprovalRequest')) {
            param = this.wddCacheService.getMapEntityFilter('filter_tab_entityApprovalRequest');
            param.resetPage = false;
        }
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

    filterChanged (filterApplied) {
        let param = filterApplied;
        param.resetPage = true;
        this.filterApplied = filterApplied;

        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    createNewEntity () {
        this.modalService.openNewEntity().then(() => {
            this.$timeout(() => {
                this.reloadTableData({
                    filterSetted: this.filterApplied
                });
            });
        });
    }

    reject (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'REJECT',
            text: this.modalService.getRejectText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.showTab = true;
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

    sendToApprove (selectedItems) {
        let param = {
            selectedItems: selectedItems,
            action: 'FORWARD',
            text: this.modalService.getForwardText()
        };
        this.modalService.openActionModal(param).then(() => {
            this.$timeout(() => {
                this.showTab = true;
                this.reloadTableData({
                    filterSetted: this.filterSetted
                });
            });
        });
    }

}
