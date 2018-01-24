export class ActionModalController {
    constructor ($uibModalInstance, $scope, ModalService, WDDAlert) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.modalService = ModalService;
        this.WDDAlert = WDDAlert;

        this.actionParam = this.$scope.$parent.actionParam;
        // console.log(this.actionParam);
    }

    confirmChoice () {
        let entities = this.actionParam.selectedItems.map(e => {
            return ({
                termId: e.id_field,
                action: this.actionParam.action,
                note: this.note
            });
        });

        this.doActionPromise = this.modalService.doAction(entities);
        this.doActionPromise.then(res => {
            if (res.data.completed) {
                this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO');
            } else {
                this.modalService.openErrorActionModal(res.data);
                this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE');
            }
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
