import { stateConfig as SearchConfig } from './search/search.config';
import { stateConfig as BaseTabConfig } from './baseTabs/baseTabs.config';
import { stateConfig as DataLineageConfig } from './dataLineage/dataLineage.config';
import { stateConfig as RuDashboardConfig } from './ruDashboard/ruDashboard.config';

export default angular.module('wdd.states', [])
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('tab', BaseTabConfig)
            .state('tab.search', SearchConfig)
            .state('tab.dataLineage', DataLineageConfig)
            .state('tab.ruDashboard', RuDashboardConfig);

        $urlRouterProvider.otherwise(SearchConfig.url);
    })
    .name;
