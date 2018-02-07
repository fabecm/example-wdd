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
        this.modalService.openConfirmationModal(this.modalService.getConfirmActionText()).then(selection => {
            if (selection.choice) {
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
                        this.WDDAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'action');
                        this.$uibModalInstance.close();
                    } else {
                        this.modalService.openErrorActionModal(res.data);
                        this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE', 'action');
                    }
                });
            }
        });
    }

    close () {
        this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
            if (res.choice) {
                this.$uibModalInstance.dismiss();
            }
        });
    }
}
