export class NewWorkspaceController {

    workspaceForm = {};

    constructor ($log, $uibModalInstance, ModalService) {
        'ngInject';
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;
        this.modalService = ModalService;
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

    close () {
        this.$uibModalInstance.dismiss();
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser) {
            this.$log.debug('send', this.workspaceForm);
            this.workspaceForm.send = true;
            this.workspaceForm.responsible_user_id = this.responsibleUser;
        }
    }
}
