import { RunNavigation } from './runNavigation';
import { WddCacheService } from './services/wddCache';

export default angular.module('wdd.core.navigation', [])
.service('WddCacheService', WddCacheService)
.run(RunNavigation)
.name;
