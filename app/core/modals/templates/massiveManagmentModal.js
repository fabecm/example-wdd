import $ from 'jquery';
export class MassiveManagmentModalController {

    fileToUpload = {};

    constructor ($uibModalInstance, $scope, $timeout, SessionService, $sce, $http) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.scope = $scope;
        this.$http = $http;

        $timeout(() => {
            $('#MSSV_Input').bind('change', changeEvent => {
                this.file = changeEvent.target.files[0];
                $scope.$apply();
            });
        }, 0);
    }

    sendFile () {
        var fd = new FormData();
        fd.append('file', this.file);
        this.$http.post('WDD/uploadFile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

}
