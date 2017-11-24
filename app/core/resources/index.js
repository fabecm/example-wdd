import { DataService } from './services/data';
import { ClassificationService } from './services/classification';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .name;
