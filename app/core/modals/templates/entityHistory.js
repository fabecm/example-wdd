export class EntityHistoryController {

    constructor ($scope, $uibModalInstance, DetailsService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.detailsService = DetailsService;

        this.termDetail = $scope.$parent.termDetail;
        this.initEntityHistory();
    }

    initEntityHistory () {
        this.detailsService.getEntityVersionList(this.termDetail.termId).then(res => {
            this.versionList = res.data.array.map(e => {
                e.label = `Versione ${e.version}`;
                return e;
            });
        });
    }

    versionChanged () {
        if (!this.version.value) {
            return;
        }
        this.detailsService.getEntityVersion(this.termDetail.termId, this.version.value).then(res => {
            this.attrList = res.data.array;
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
