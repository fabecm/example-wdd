import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';
import { DataDetailAttribute } from './directives/dataDetailAttribute';
import { DoughnutChart } from './directives/doughnutChart';

export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .directive('att', DataDetailAttribute)
    .directive('doughnutChart', DoughnutChart)
    .name;
