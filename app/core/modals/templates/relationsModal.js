export class RelationsModalController {

    headerTable = [{
        label: 'Tipo entità',
        value: 'term_type'
    }, {
        label: 'Tipo relazione',
        value: 'relation_type'
    }, {
        label: 'Nome entità',
        value: 'term_name'
    }, {
        label: 'Descrizione',
        value: 'description'
    }, {
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data',
        value: 'date'
    }];

    constructor ($uibModalInstance, $scope, ModalService, $timeout, FilterWorkspace) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$timeout = $timeout;

        this.termId = $scope.$parent.termId;
        this.termType = $scope.$parent.termType;
        this.termName = $scope.$parent.termName;
        this.baseCheckboxFilter = undefined;

        FilterWorkspace.getRelativeFiler(this.termType).then(res => {
            this.checkboxFilters = res.data.array.map(e => {
                e.enabled = true;
                return e;
            });
            this.baseCheckboxFilter = angular.copy(this.checkboxFilters);
            return this.initRelationModal();
        });
    }

    initRelationModal () {
        this.$timeout(() => {
            let param = {};
            param.term_id = this.termId;
            param.term_types = this.checkboxFilters
                .filter(temp => {
                    return temp.enabled === true;
                }).map(e => {
                    return {
                        id: e.id
                    };
                });
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    resetFilter () {
        this.checkboxFilters = angular.copy(this.baseCheckboxFilter);
    }

    setFilter () {
        let param = {};
        param.term_id = this.termId;
        param.term_types = this.checkboxFilters
            .filter(temp => {
                return temp.enabled === true;
            }).map(e => {
                return {
                    id: e.id
                };
            });
        this.reloadTableData({
            filterSetted: param
        });
    }


    close () {
        this.$uibModalInstance.dismiss();
    }
}
