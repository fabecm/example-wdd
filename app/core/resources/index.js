import { DataService } from './services/data';
import { ClassificationService } from './services/classification';
import { UserService } from './services/user';
import { DatasourceService } from './services/datasource';
import { LineageService } from './services/lineage';
import { HttpRequestInterceptor } from './interceptor/httpRequestInterceptor';
import { FilterWorkspace } from './services/filterWorkspace';
import { SearchWorkspaceService } from './services/searchWorkspace';

export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .service('UserService', UserService)
    .service('DatasourceService', DatasourceService)
    .service('LineageService', LineageService)
    .service('FilterWorkspace', FilterWorkspace)
    .service('SearchWorkspaceService', SearchWorkspaceService)
    .factory('httpRequestInterceptor', HttpRequestInterceptor)
    .config(($httpProvider) => {
        'ngInject';
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .name;
