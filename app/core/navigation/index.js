import { RunNavigation } from './runNavigation';
import { WddCacheService } from './services/wddCache';
import { EnabledButtonService } from './services/enabledButton.service';
import { EnabledButtonDirective } from './directives/enabledButton.directive';

export default angular.module('wdd.core.navigation', [])
.service('WddCacheService', WddCacheService)
.service('EnabledButtonService', EnabledButtonService)
.directive('enabledButton', EnabledButtonDirective)
.run(RunNavigation)
.name;
