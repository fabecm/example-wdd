export class SearchController {
    dataList = [];
    constructor (DataService) {
        'ngInject';

        DataService.getData().then(searchData => {
         
            try {
                console.log(searchData);
                this.dataList = searchData.data;
            }
            catch(err) {
                console.log(err.message);
            }

        });

    }
}
