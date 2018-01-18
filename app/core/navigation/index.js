export default angular.module('wdd.core.navigation', [])
.run((SessionService, $transitions, $log, WDDAlert, $rootScope) => {
    'ngInject';
    $rootScope.appliedFilter = {};
    $transitions.onStart({}, function (transition) {
        $log.debug('Successful Transition from ' + transition.from().name + ' to ' + transition.to().name);
        if(!transition.from().name) {
            return SessionService.init();
        }
        WDDAlert.removeAlert();
        return true;
    });
})
.name;
