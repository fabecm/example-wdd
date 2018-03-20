export class EntityHistoryController {

    constructor ($scope, $uibModalInstance, DetailsService) {
        'ngInject';
        this.$uibModalInstance = $uibModalInstance;
        this.detailsService = DetailsService;

        this.termDetail = $scope.$parent.termDetail;
        this.initEntityHistory();
    }

    initEntityHistory () {
        this.entityVersionListPromise = this.detailsService.getEntityVersionList(this.termDetail.termId);
        this.entityVersionListPromise.then(res => {
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
        this.entityVersionPromise = this.detailsService.getEntityVersion(this.termDetail.termId, this.version.value);
        this.entityVersionPromise.then(res => {
            this.attrList = res.data.array;
        });
    }

    close () {
        this.$uibModalInstance.dismiss();
    }
}
