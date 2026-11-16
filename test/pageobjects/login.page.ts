import BasePage, { TIMEOUT } from './base.page';
import MenuPage from './menu.page';
import { selectors } from '../selectors/selectors';
import { inNativeContext } from '../support/native';

const { employeeId, password, termsCheckbox, loginButton } = selectors.login;

class LoginPage extends BasePage {
    async isDisplayed() {
        return this.isVisible(employeeId);
    }

    // Returns once the dashboard is up, so a failed login fails here and not three steps later.
    async login(id: string, pass: string) {
        await this.enterText(employeeId, id);
        await this.enterText(password, pass);
        await this.click(termsCheckbox);
        await this.click(loginButton);
        await this.waitFor(selectors.menu.icon, TIMEOUT.long);
    }

    // Specs share one app session, so each test has to start from the login screen.
    async ensureLoggedOut() {
        for (let attempt = 0; attempt < 5; attempt++) {
            if (await this.isVisible(employeeId)) return;

            if (await this.isVisible(selectors.menu.icon)) {
                await MenuPage.openMenu();
                await MenuPage.signOut();
                await this.waitFor(employeeId);
                return;
            }

            // A previous test stopped half way through a flow: step back and look again.
            if (!driver.isAndroid) break;
            await inNativeContext(() => driver.back());
        }
        throw new Error('App is not on the login screen or the dashboard and could not get back to either');
    }
}

export default new LoginPage();
