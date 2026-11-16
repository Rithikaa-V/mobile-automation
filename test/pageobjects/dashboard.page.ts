import BasePage from './base.page';
import { selectors } from '../selectors/selectors';

class DashboardPage extends BasePage {
    async isLoaded() {
        return this.isVisible(selectors.dashboard.dueCollection);
    }

    async openFilter() {
        await this.click(selectors.dashboard.filterIcon);
    }

    async selectLastMonth() {
        await this.click(selectors.dashboard.lastMonth);
    }

    async openNotifications() {
        await this.click(selectors.dashboard.notificationIcon);
    }
}

export default new DashboardPage();
