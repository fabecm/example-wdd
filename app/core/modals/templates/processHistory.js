export class ProcessHistoryController {

    headerTable = [{
        label: 'Stato',
        value: 'status'
    }, {
        label: 'Data Inizio',
        value: 'start_data'
    }, {
        label: 'Nota',
        value: 'note'
    }, {
        label: 'Utente',
        value: 'office_name'
    }];

    constructor ($uibModalInstance, $scope, ModalService, $timeout) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$timeout = $timeout;

        this.termId = $scope.$parent.termId;

        this.initProcessHistory(this.termId);
    }

    initProcessHistory (termId) {
        this.$timeout(() => {
            let param = {};
            param.termId = termId;
            this.reloadTableData({
                filterSetted: param
            });
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
