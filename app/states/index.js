import { stateConfig as SearchConfig } from './search/search.config';
import { stateConfig as BaseTabConfig } from './baseTabs/baseTabs.config';
import { stateConfig as DataLineageConfig } from './dataLineage/dataLineage.config';
import { stateConfig as DataDetailConfig } from './dataDetail/dataDetail.config';
import { stateConfig as DashboardSOConfig } from './dashboardSO/dashboardSO.config';
import { stateConfig as ToDoListConfig } from './toDoList/toDoList.config';
import { stateConfig as PopupsConfig } from './popups/popups.config';
import { stateConfig as RuDashboardConfig } from './ruDashboard/ruDashboard.config';
import { stateConfig as ApprovalRequestsConfig } from './approvalRequests/approvalRequests.config';
import { stateConfig as AutomaticEventsConfig } from './automaticEvents/automaticEvents.config';
import { stateConfig as InitiativeCensusesConfig } from './initiativeCensuses/initiativeCensuses.config';
import { stateConfig as DocumentationRequestsConfig } from './documentationRequests/documentationRequests.config';
import { stateConfig as DashboardRequestConfig } from './dashboardRequest/dashboardRequest.config';

export default angular.module('wdd.states', [])
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('tab', BaseTabConfig)
            .state('tab.search', SearchConfig)
            .state('tab.dataDetail', DataDetailConfig)
            .state('tab.dataLineage', DataLineageConfig)
            .state('tab.dashboardSO', DashboardSOConfig)
            .state('tab.toDoList', ToDoListConfig)
            .state('tab.popups', PopupsConfig)
            .state('tab.approvalRequests', ApprovalRequestsConfig)
            .state('tab.automaticEvents', AutomaticEventsConfig)
            .state('tab.initiativeCensuses', InitiativeCensusesConfig)
            .state('tab.documentationRequests', DocumentationRequestsConfig)
            .state('tab.ruDashboard', RuDashboardConfig)
            .state('tab.dashboardRequest', DashboardRequestConfig);


        $urlRouterProvider.otherwise(DashboardSOConfig.url);
    })
    .name;
