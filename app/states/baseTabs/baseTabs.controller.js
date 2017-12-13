export class BaseTabsCtrl {
    selectedTab = 0;

    constructor ($state) {
        'ngInject';
        this.$state = $state;
    }

    goTo (page) {
        this.$state.go(page);
    }
}
