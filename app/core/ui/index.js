import { WbbSelect } from './directives/wbbSelect';
import { WddFilter } from './directives/wddFilter';

export default angular.module('wdd.core.ui', [])
    .directive('wbbSelect', WbbSelect)
    .directive('wddFilter', WddFilter)
    .name;
