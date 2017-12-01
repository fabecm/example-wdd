import { DataService } from './services/data';
import { ClassificationService } from './services/classification';
import { UserService } from './services/user';
import { DatasourceService } from './services/datasource';
import { LineageService } from './services/lineage';
import { HttpRequestInterceptor } from './interceptor/httpRequestInterceptor';
import { WorkspaceService } from './services/workspaceService';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .service('UserService', UserService)
    .service('DatasourceService', DatasourceService)
    .service('LineageService', LineageService)
    .factory('httpRequestInterceptor', HttpRequestInterceptor)
    .config(($httpProvider) => {
        'ngInject';
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .service('WorkspaceService', WorkspaceService)
    .name;
