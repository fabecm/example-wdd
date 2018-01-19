export class ActionModalController {
    constructor ($uibModalInstance, $scope, ModalService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.modalService = ModalService;

        this.actionParam = this.$scope.$parent.actionParam;
        console.log(this.actionParam);
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
            this.$log.debug(res);
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}