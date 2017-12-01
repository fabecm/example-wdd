export class DataDetailController {

    listDataDetails = [];

    constructor (DetailsService, $stateParams) {
        'ngInject';
        this.detailsService = DetailsService;
        this.$stateParams = $stateParams;

        this.initDataDetails();
    }

    initDataDetails () {
        this.detailsService.getDataFieldDetails(this.$stateParams.id).then(res => {
            this.listDataDetails = res;
        });
    }

}
