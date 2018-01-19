export class MassiveManagmentModalController {

    fileToUpload = {};

    constructor ($uibModalInstance, $scope) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.scope = $scope;
    }

    importFile () {
        document.getElementById('uploadFile').click();
    }

    fileNameChanged (files) {
        let file = {
            label: files[0].name,
            selected: false,
            removed: false
        };
        this.fileToUpload = file;
        this.scope.$apply();
    }

    sendFile () {
        // console.log(this.fileToUpload);
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

}
