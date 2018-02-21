export class ErrorActionModalController {
    constructor ($uibModalInstance, $scope) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.$scope = $scope;

        this.errorList = this.$scope.$parent.infoParam.processList;
        this.text = this.$scope.$parent.text;

        // console.log('Modal error', this.errorList);
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
