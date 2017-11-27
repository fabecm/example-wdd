export class SearchController {

    dataList = []; 
    pages = [];

    constructor (DataService) {
        'ngInject';

        DataService.getData()
            .then(searchData => {
                this.dataList = searchData.data;

                const pageSize = 10;
                let currentPage = 1;
                let numPages = Math.ceil(this.dataList.length / pageSize);

                // slice data per current page
                this.dataList = this.sliceDataToShow(currentPage, pageSize);

                // create an array of pages to ng-repeat, + 1 for a correct number
                this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);

                console.log(this.pages);

              
                    
        }).catch(err =>{
            console.log(err)
        });

    }

    sliceDataToShow(currentPage, pageSize) {
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = startIndex + pageSize;

        let dataVisiblePage = this.dataList.slice(startIndex, endIndex);

        return dataVisiblePage;
    }
}
