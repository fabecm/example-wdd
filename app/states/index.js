import { stateConfig as SearchConfig } from './search/search.config';
import { stateConfig as BaseTabConfig } from './baseTabs/baseTabs.config';
import { stateConfig as DataLineageConfig } from './dataLineage/dataLineage.config';
import { stateConfig as ToDoListConfig } from './toDoList/toDoList.config';

export default angular.module('wdd.states', [])
    .config(($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('tab', BaseTabConfig)
            .state('tab.search', SearchConfig)
            .state('tab.toDoList', ToDoListConfig)
            .state('tab.dataLineage', DataLineageConfig);

        $urlRouterProvider.otherwise(SearchConfig.url);
    })
    .name;
