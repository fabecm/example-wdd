export class BaseTabsCtrl {
    constructor ($state, RuleProfileService, $transitions, WddCacheService) {
        'ngInject';
        this.$state = $state;
        this.wddCacheService = WddCacheService;

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
                this.wddCacheService.clearAllCache();
                break;
            case 'tab.dashboardRequest':
                this.selectedTab = 1;
                this.wddCacheService.clearAllCache();
                break;
            case 'tab.dashboardUserRequest':
                this.selectedTab = 2;
                this.wddCacheService.clearAllCache();
                break;
            case 'tab.search':
                this.selectedTab = 3;
                break;
            default:
                break;
        }
    }
}
