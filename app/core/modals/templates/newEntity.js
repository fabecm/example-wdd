export class NewEntityController {

    lockButtonSave = true;

    constructor ($uibModalInstance, $scope, $timeout, DetailsService, WDDAlert, ModalService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.detailsService = DetailsService;
        this.WDDAlert = WDDAlert;
        this.modalService = ModalService;
    }

    saveEntity () {
        let data = {};
        data.term = {};
        data.term.termtype = this.entityType.value;
        data.term.name = this.entityName;

        data.createProcess = true;
        data.onlyEntity = true;
        data.addNewEntityToRelation = false;

        data.attributes = [];
        data.relations = [];

        this.saveEntityPromise = this.detailsService.saveEntity(data);
        this.saveEntityPromise.then(res => {
            if (res.data.result) {
                this.WDDAlert.showAlert('success', 'OPERAZIONE ESEGUITA CON SUCCESSO', 'save-entity');
                this.$uibModalInstance.close();
            } else if (res.data.message_type === 'SHOW_ERROR') {
                this.WDDAlert.showAlert('error', `OPERAZIONE NON ESEGUITA-${res.data.message}`, 'save-entity');
            } else {
                this.WDDAlert.showAlert('error', 'SI E\' VERIFICATO UN ERRORE', 'save-entity');
            }
        });
    }

    disabledSaveEntity () {
        if (!this.entityType || !this.entityType.value) {
            return true;
        }
        if (!this.entityName) {
            return true;
        }
        return false;
    }

    close () {
        if ((this.entityType && this.entityType.value) || this.entityName) {
            this.modalService.openConfirmationModal(this.modalService.getCancelActionText()).then(res => {
                if (res.choice) {
                    this.$uibModalInstance.dismiss();
                }
            });
        } else {
            this.$uibModalInstance.dismiss();
        }
    }
}

