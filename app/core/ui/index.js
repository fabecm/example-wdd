import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';

import { TestDirectiveComponent } from './directives/testDirectiveComponent';
import { DashboardTable } from './directives/dashboardTable';

import { DataDetailAttribute } from './directives/dataDetailAttribute';
import { DoughnutChart } from './directives/doughnutChart';
import { DashboardFilter } from './directives/dashboardFilter';
import { WddAutocomplete } from './directives/wddAutocomplete';
import { WddDatepicker } from './directives/wddDatepicker';
import { WddCell } from './directives/wddCell';
import { WddRow } from './directives/wddRow';
import { WddTable } from './directives/wddTable';


export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .directive('att', DataDetailAttribute)

    .directive('testDirectiveComponent', TestDirectiveComponent)
    .directive('dashboardTable', DashboardTable)

    .directive('doughnutChart', DoughnutChart)
    .directive('dashboardFilter', DashboardFilter)
    .directive('wddAutocomplete', WddAutocomplete)
    .directive('wddDatepicker', WddDatepicker)
    .directive('wddCell', WddCell)
    .directive('wddRow', WddRow)
    .directive('wddTable', WddTable)
    .name;
