export class NewWorkspaceController {

    workspaceForm = {};
    responsibleUser = {};

    constructor ($log, $uibModalInstance, ModalService) {
        'ngInject';
        this.$log = $log;
        this.$uibModalInstance = $uibModalInstance;
        this.modalService = ModalService;
    }

    saveWorkspace () {
        if (this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
        }

        this.workspaceForm.send = false;
        this.$log.debug('save', this.workspaceForm);

        this.createNewWorkspace(this.workspaceForm);
    }

    isSaveDisabled () {
        return (!this.workspaceForm.short_description
                || !this.workspaceForm.long_description
                || !this.workspaceForm.start_date
                || !this.workspaceForm.end_date);
    }

    isSendDisabled () {
        return (!this.workspaceForm.short_description
            || !this.workspaceForm.long_description
            || !this.workspaceForm.start_date
            || !this.workspaceForm.end_date
            || !(this.responsibleUser && this.responsibleUser.value));
    }

    close () {
        this.$uibModalInstance.dismiss();
    }

    sendWorkspace () {
        if (this.workspaceForm.start_date && this.workspaceForm.end_date && this.responsibleUser && this.responsibleUser.value) {
            this.workspaceForm.responsible_user_id = this.responsibleUser.value;
            this.workspaceForm.send = true;
            this.$log.debug('send', this.workspaceForm);
            this.createNewWorkspace(this.workspaceForm);
        }
    }

    createNewWorkspace (workspaceForm) {
        this.createNewWorkspacePromise = this.modalService.createNewWorkspace(workspaceForm);
        this.createNewWorkspacePromise.then(res => {
            this.$log.debug(res);
        }).finally(() => {
            this.$uibModalInstance.close();
        });
    }
}
