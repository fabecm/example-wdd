import libraries from './libraries';
import ui from './ui';
import resources from './resources';
import session from './session';

export default angular.module('wdd.core', [
    libraries,
    ui,
    resources,
    session
])
.name;
