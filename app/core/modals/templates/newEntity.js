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
    }

    close () {
        if (this.entityType && this.entityType.value) {
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

