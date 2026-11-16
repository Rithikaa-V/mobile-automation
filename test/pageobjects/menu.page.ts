import BasePage from './base.page';
import { selectors } from '../selectors/selectors';

class MenuPage extends BasePage {
    async openMenu() {
        await this.click(selectors.menu.icon);
    }

    async openMyProfile() {
        await this.click(selectors.menu.myProfile);
    }

    async signOut() {
        await this.click(selectors.menu.signOut);
    }
}

export default new MenuPage();
