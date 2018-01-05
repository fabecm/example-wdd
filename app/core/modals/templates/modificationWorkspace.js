export class ModificationWorkspace {

    // startDate = 'GG/MM/AAAA'; === modalData.dataInizio

    modalData = {
        descrizione: '',
        descrizioneEstesa: '',
        dataInizio: '',
        dataFine: '',
        stato: '',
        utenteRichiedente: '',
        note: ''
    };

    constructor (DetailsService, $scope) {
        'ngInject';

        this.detailsService = DetailsService;

        console.log($scope.$parent.test);


        this.getWorkspaceDetails();
    }

    getWorkspaceDetails() {
        this.detailsService.getWorkspaceIdDetails()
            .then(getData => {
                this.dataList = getData.data;

                console.log('test1');
                console.log(this.dataList);
                console.log(this.modalData);
                console.log('test2');

                this.modalData.descrizione = this.dataList.short_description;
                this.modalData.descrizioneEstesa = this.dataList.long_description;
                this.modalData.dataInizio = this.dataList.start_date;
                this.modalData.dataFine = this.dataList.end_date;
                this.modalData.stato = this.dataList.status;
                this.modalData.utenteRichiedente = this.dataList.responsible_user.label;
                this.modalData.note = this.dataList.note;

            });
    }

    // this.initDataDetails();


    // getWorkspaceIdDeatils
}
