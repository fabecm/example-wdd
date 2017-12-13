import { DataService } from './services/data';
import { ClassificationService } from './services/classification';
import { UserService } from './services/user';
import { DatasourceService } from './services/datasource';
import { LineageService } from './services/lineage';
import { HttpRequestInterceptor } from './interceptor/httpRequestInterceptor';
import { WorkspaceService } from './services/workspaceService';
import { FilterWorkspace } from './services/filterWorkspace';
import { SearchWorkspaceService } from './services/searchWorkspace';
import { DetailsService } from './services/details';


export default angular.module('wdd.core.resources', [])
    .service('DataService', DataService)
    .service('ClassificationService', ClassificationService)
    .service('UserService', UserService)
    .service('DatasourceService', DatasourceService)
    .service('LineageService', LineageService)
    .service('FilterWorkspace', FilterWorkspace)
    .service('SearchWorkspaceService', SearchWorkspaceService)
    .factory('httpRequestInterceptor', HttpRequestInterceptor)
    .service('DetailsService', DetailsService)
    .config(($httpProvider) => {
        'ngInject';
        $httpProvider.interceptors.push('httpRequestInterceptor');
    })
    .service('WorkspaceService', WorkspaceService)
    .name;
