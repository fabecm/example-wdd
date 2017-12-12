import libraries from './libraries';
import ui from './ui';
import resources from './resources';
import session from './session';
import navigation from './navigation';
import modals from './modals';

export default angular.module('wdd.core', [
    libraries,
    ui,
    resources,
    session,
    navigation,
    modals
])
.name;
