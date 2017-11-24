import { DataService } from './services/data';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .name;
