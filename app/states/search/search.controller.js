export class SearchController {

    dataList = []; 
    pages = [];
    rawData = [];
    pageSize = 10;
    currentPage = 1;

    constructor (DataService) {
        'ngInject';

        DataService.getData()
            .then(searchData => {
                this.rawData = angular.copy(searchData.data);
                this.dataList = searchData.data;
                console.log(searchData.data);
                let numPages = Math.ceil(this.dataList.length / this.pageSize);

                // slice data per current page
                this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);

                // create an array of pages to ng-repeat, + 1 for a correct number
                this.pages = [...Array(numPages + 1).keys()].slice(1, numPages + 1);
                                
        }).catch(err =>{
            console.log(err)
        });

    }

    sliceDataToShow(currentPage, pageSize) {
        let startIndex = (Number(currentPage) - 1) * Number(pageSize);
        let endIndex = startIndex + pageSize;

        console.log(this.rawData, startIndex, endIndex);
        let dataVisiblePage = this.rawData.slice(startIndex, endIndex);

        return dataVisiblePage;
    }
    changingPage(obj) {
        this.currentPage = obj;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }
    changingPageToFirst() {
        this.currentPage = 1;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }
    changingPageToLast() {
        this.currentPage = this.pages.length;

        this.dataList = this.rawData;

        this.dataList = this.sliceDataToShow(this.currentPage, this.pageSize);
    }
}
