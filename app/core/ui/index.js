import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';

import { TestDirectiveComponent } from './directives/testDirectiveComponent';
import { DashboardTable } from './directives/dashboardTable';

import { DoughnutChart } from './directives/doughnutChart';
import { DashboardFilter } from './directives/dashboardFilter';
import { WddAutocomplete } from './directives/wddAutocomplete';
import { WddDatepicker } from './directives/wddDatepicker';


export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)

    .directive('testDirectiveComponent', TestDirectiveComponent)
    .directive('dashboardTable', DashboardTable)

    .directive('doughnutChart', DoughnutChart)
    .directive('dashboardFilter', DashboardFilter)
    .directive('wddAutocomplete', WddAutocomplete)
    .directive('wddDatepicker', WddDatepicker)

    .name;
