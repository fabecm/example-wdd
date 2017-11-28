import { DataService } from './services/data';
import { ClassificationService } from './services/classification';
import { UserService } from './services/user';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .service('UserService', UserService)
    .name;
