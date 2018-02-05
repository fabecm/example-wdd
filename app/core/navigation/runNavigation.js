import $ from 'jquery';

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

    $(document).unbind('keydown').bind('keydown', function (event) { // eslint-disable-line consistent-return
        if (event.keyCode === 8) {
            let doPrevent = true;
            let types = ['text', 'password', 'file', 'search', 'email', 'number', 'date', 'color', 'datetime', 'datetime-local', 'month', 'range', 'search', 'tel', 'time', 'url', 'week'];
            let d = $(event.srcElement || event.target);
            let disabled = d.prop('readonly') || d.prop('disabled');
            if (!disabled) {
                if (d[0].isContentEditable) {
                    doPrevent = false;
                } else if (d.is('input')) {
                    let type = d.attr('type');
                    if (type) {
                        type = type.toLowerCase();
                    }
                    if (types.indexOf(type) > -1) {
                        doPrevent = false;
                    }
                } else if (d.is('textarea')) {
                    doPrevent = false;
                }
            }
            if (doPrevent) {
                event.preventDefault();
                return false;
            }
        }
    });
}
