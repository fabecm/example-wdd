export class BaseTabsCtrl {
    constructor ($state, RuleProfileService, $transitions) {
        'ngInject';
        this.$state = $state;

        this.setSelectedTab(this.$state.$current.name);

        this.numDashboards = RuleProfileService.ruleProfile.dashboards.length;
        this.SOEnabled = RuleProfileService.ruleProfile.dashboards.indexOf('DSBOARD_SO') >= 0;
        this.DQEnabled = RuleProfileService.ruleProfile.dashboards.indexOf('DSBOARD_DQ') >= 0;
        this.UREnabled = RuleProfileService.ruleProfile.dashboards.indexOf('DSBOARD_UR') >= 0;

        $transitions.onStart({}, transition => {
            this.setSelectedTab(transition.to().name);
            return true;
        });
    }

    goTo (page) {
        this.$state.go(page);
    }

    setSelectedTab (stateName) {
        switch (stateName) {
            case 'tab.dashboardSO':
                this.selectedTab = 0;
                break;
            case 'tab.dashboardRequest':
                this.selectedTab = 1;
                break;
            case 'tab.dashboardUserRequest':
                this.selectedTab = 2;
                break;
            case 'tab.search':
                this.selectedTab = 3;
                break;
            default:
                break;
        }
    }
}
