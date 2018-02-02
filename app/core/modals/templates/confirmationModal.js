export class ConfirmationModalController {
    constructor ($uibModalInstance, $scope) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;

        this.confirmationText = this.$scope.$parent.param.body;
    }

    action (choice) {
        this.$uibModalInstance.close({choice: choice});
    }
}
