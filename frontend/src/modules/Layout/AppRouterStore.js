import { observable, action } from 'mobx';

class AppRouterStore {
    @observable activeTab = '';

    @action
    setup = () => {
        this.activeTab = 'home';
    }

    @action
    reset = () => {
        this.activeTab = 'home';
    }

    @action
    handleTabClick = (e, { name }) => {
        this.activeTab = name;
    }
}

export default new AppRouterStore();