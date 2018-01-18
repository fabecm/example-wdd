export class DateApproveController {
    constructor ($uibModalInstance) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;

        this.selectedItems = this.$scope.$parent.selectedItems;
        console.log(this.selectedItems);
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
