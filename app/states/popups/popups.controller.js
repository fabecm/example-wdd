export class PopupsController {
    constructor (ModalService) {
        'ngInject';
        this.ModalService = ModalService;

        this.open = () => {
            this.ModalService.openNewWorkspaceModal();
        }

        this.open2 = () => {
            this.ModalService.openModificationWorkspace();
        }

        this.open3 = () => {
            this.ModalService.openNewWorkspaceRequests();
        }

    }
}
