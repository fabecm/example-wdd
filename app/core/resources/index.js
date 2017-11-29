import { DataService } from './services/data';
import { ClassificationService } from './services/classification';
import { UserService } from './services/user';
import { DatasourceService } from './services/datasource';
import { HttpRequestInterceptor } from './interceptor/httpRequestInterceptor';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .service('UserService', UserService)
    .service('DatasourceService', DatasourceService)
    .factory('httpRequestInterceptor', HttpRequestInterceptor)
    .config(($httpProvider) => {
        'ngInject';
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .name;
