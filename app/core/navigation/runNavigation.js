export function RunNavigation (SessionService, $transitions, $log, WDDAlert) {
    'ngInject';

    $transitions.onStart({}, function (transition) {
        $log.debug('Successful Transition from ' + transition.from().name + ' to ' + transition.to().name);

        if(!transition.from().name) {
            return SessionService.init();
        }
        WDDAlert.removeAlert();
        return true;
    });
}