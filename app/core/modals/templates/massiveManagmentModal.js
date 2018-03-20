import $ from 'jquery';
export class MassiveManagmentModalController {

    fileToUpload = {};

    constructor ($uibModalInstance, $scope, $timeout, SessionService, $sce, $http, ModalService, WDDAlert) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.scope = $scope;
        this.$http = $http;
        this.modalService = ModalService;
        this.wddAlert = WDDAlert;

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
        this.uploadPromise = this.$http.post('WDD/uploadFile', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
        this.uploadPromise.then(res => {
            if (res.data.result) {
                this.wddAlert.showAlert('success', 'OPERAZIONE EFFETTUATA CON SUCCESSO', 'uploadFile');
                this.$uibModalInstance.close();
            } else {
                let data = {
                    processList: res.data.wrong.map(e => {
                        return ({
                            termId: e
                        });
                    })
                };
                let text = {
                    title: 'ATTENZIONE',
                    body: res.data.result_message.message
                };
                this.modalService.openErrorActionModal(data, text);
                this.wddAlert.showAlert('error', 'OPERAZIONE NON ESEGUITA', 'uploadFile');
            }
        });
    }

    downloadTemplate () {
        this.modalService.downloadExcelTemplate();
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

}
