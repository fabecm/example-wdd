export class ConfirmationModalController {
    constructor ($uibModalInstance, $scope, WDDAlert) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;
        this.wddAlert = WDDAlert;

        this.confirmationText = this.$scope.$parent.param.body;
    }

    action (choice) {
        if (choice) {
            this.wddAlert.removeAlert();
        }
        this.$uibModalInstance.close({choice: choice});
    }
}
