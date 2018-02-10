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
        data.term.termType = this.entityType.value;
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
            } else {
                this.WDDAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'save-entity');
            }
        }).finally(() => {
            this.$uibModalInstance.close();
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

