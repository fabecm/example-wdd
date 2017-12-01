import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';
import { DataDetailAttribute } from './directives/dataDetailAttribute';

export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .directive('att', DataDetailAttribute)
    .name;
