import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';

import { ShowTooltip } from './directives/showTooltip';

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
import { wddProgress } from './directives/wddProgress';

import { WddAlert } from './services/alert';
import { WddAlertMessage } from './directives/alertMessage';


export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .directive('showTooltip', ShowTooltip)
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
    .directive('wddProgress', wddProgress)
    .service('WDDAlert', WddAlert)
    .directive('wddAlert', WddAlertMessage)
    .name;
