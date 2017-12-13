import { stateConfig as SearchConfig } from './search/search.config';
import { stateConfig as BaseTabConfig } from './baseTabs/baseTabs.config';
import { stateConfig as DataLineageConfig } from './dataLineage/dataLineage.config';
import { stateConfig as DashboardSOConfig } from './dashboardSO/dashboardSO.config';
import { stateConfig as ToDoListConfig } from './toDoList/toDoList.config';
import { stateConfig as PopupsConfig } from './popups/popups.config';
import { stateConfig as RuDashboardConfig } from './ruDashboard/ruDashboard.config';


export default angular.module('wdd.states', [])
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('tab', BaseTabConfig)
            .state('tab.search', SearchConfig)
            .state('tab.dataLineage', DataLineageConfig)
            .state('tab.dashboardSO', DashboardSOConfig)
            .state('tab.toDoList', ToDoListConfig)
            .state('tab.popups', PopupsConfig)
            .state('tab.ruDashboard', RuDashboardConfig);


        $urlRouterProvider.otherwise(SearchConfig.url);
    })
    .name;
