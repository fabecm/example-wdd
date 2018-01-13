export class ModificationWorkspace {

    workspaceForm = {};

    constructor (ModalService, $scope, $log, $uibModalInstance) {
        'ngInject';
        this.modalService = ModalService;
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;

        this.getWorkspaceDetails($scope.$parent.workspaceId);
    }

    getWorkspaceDetails (workspaceId) {
        this.modalService.getWorkspaceIdDetails(workspaceId).then(w => {
            this.workspaceForm.short_description = w.data.short_description;
            this.workspaceForm.long_description = w.data.long_description;
            this.workspaceForm.start_date = w.data.start_date;
            this.workspaceForm.end_date = w.data.end_date;
            this.workspaceForm.stato = w.data.status;
            this.workspaceForm.utenteRichiedente = w.data.responsible_user.label;
            this.workspaceForm.note = w.data.note;
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

    saveWorkspace () {
        this.$log.debug('save', this.workspaceForm);
        this.workspaceForm.send = false;

        this.modalService.createNewWorkspace(this.workspaceForm).then(res => {
            this.$log.debug(res);
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser) {
            this.$log.debug('send', this.workspaceForm);
            this.workspaceForm.send = true;
            this.workspaceForm.responsible_user_id = this.responsibleUser;
        }
    }
}
