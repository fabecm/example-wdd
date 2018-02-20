export class EnabledButtonService {

    enabledButton = {};

    constructor (ModalService, $q) {
        'ngInject';
        this.modalService = ModalService;
        this.$q = $q;
    }

    updateButtonStatus (key, isDisabled) {
        if (!this.enabledButton[key]) {
            this.enabledButton[key] = {
                isDisabled: isDisabled
            };
        } else {
            this.enabledButton[key].isDisabled = isDisabled;
        }

        console.log(this.enabledButton);
    }

    getResultStatus () {
        let numEnabled = 0;
        for (const btn in this.enabledButton) {
            if (this.enabledButton.hasOwnProperty(btn) && !this.enabledButton[btn].isDisabled) {
                numEnabled++;
            }
        }
        return numEnabled > 0 ? true : false;
    }

    openModalAlert () {
        let modalPromise = this.$q.defer();
        this.modalService.openConfirmationModal(this.modalService.getNavigationAlertText()).then((selection) => {
            if (selection.choice) {
                return modalPromise.resolve();
            }
            return modalPromise.reject();
        });

        return modalPromise.promise;
    }
}
