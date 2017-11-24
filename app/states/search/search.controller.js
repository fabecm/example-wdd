export class SearchController {
    constructor (DataService) {
        'ngInject';

        DataService.getData();
    }
}
