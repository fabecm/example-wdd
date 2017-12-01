import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';
import { TestDirectiveComponent } from './directives/testDirectiveComponent';
import { DashboardTable } from './directives/dashboardTable';

export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .directive('testDirectiveComponent', TestDirectiveComponent)
    .directive('dashboardTable', DashboardTable)
    .name;
