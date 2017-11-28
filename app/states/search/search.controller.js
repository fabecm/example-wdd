export class SearchController {
    constructor (DataService) {
        'ngInject';

        DataService.getData();
    }

    filterChanged (arrayFilter) {
        console.log(arrayFilter);
    }
}
