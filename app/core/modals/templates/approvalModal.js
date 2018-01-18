export class ApprovalModalController {
    constructor ($uibModalInstance, $scope) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;

        this.selectedItems = this.$scope.$parent.selectedItems;
        console.log(this.selectedItems);
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
