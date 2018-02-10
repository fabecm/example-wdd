export class EntityCensusController {

    tablePagination = true;
    tablePageSize = 10;
    tableExpandable = true;

    headerTable = [{
        label: 'Tipo entità',
        value: 'type_entity'
    }, {
        label: 'Nome entità',
        value: 'name_entity'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    headerTableExpandable = [{
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
        value: 'tech_appl'
    }, {
        label: 'System Owner',
        value: 'system_owner'
    }, {
        label: 'Stato',
        value: 'status'
    }];

    constructor ($state, $timeout, ModalService, WddCacheService) {
        'ngInject';
        this.$state = $state;
        this.$timeout = $timeout;
        this.modalService = ModalService;
        this.wddCacheService = WddCacheService;

        this.initEntityCensus();
    }

    initEntityCensus () {
        let param = {};
        if (this.wddCacheService.getCachedFilter('filter_tab_entityCensus')) {
            param = this.wddCacheService.getCachedFilter('filter_tab_entityCensus');
            param.resetPage = false;
        }
        this.$timeout(() => {
            this.reloadTableData({
                filterSetted: param
            });
        });
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

    changeChild () {
        if (this.pageChild) {
            this.$state.go(this.pageChild);
        }
    }

}
