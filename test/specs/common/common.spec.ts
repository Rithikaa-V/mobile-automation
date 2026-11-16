import LoginPage from '../../pageobjects/login.page';
import DashboardPage from '../../pageobjects/dashboard.page';
import MenuPage from '../../pageobjects/menu.page';
import { testData } from '../../data/testData';
import { selectors } from '../../selectors/selectors';

describe('Common - login, menu and dashboard', () => {
    beforeEach(async () => {
        await LoginPage.ensureLoggedOut();
    });

    it('TC01 - Verify user can login successfully', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);

        expect(await DashboardPage.isLoaded()).toBe(true);
    });

    it('TC02 - Verify user can sign out successfully', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);
        await MenuPage.openMenu();
        await MenuPage.signOut();

        expect(await LoginPage.isDisplayed()).toBe(true);
    });

    it('TC03 - Verify user can open My Profile', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);
        await MenuPage.openMenu();
        await MenuPage.openMyProfile();

        expect(await MenuPage.isVisible(selectors.profile.backButton)).toBe(true);
    });

    it('TC04 - Verify user can open Sidebar', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);
        await MenuPage.openMenu();

        expect(await MenuPage.isVisible(selectors.menu.dashboard)).toBe(true);
        expect(await MenuPage.isVisible(selectors.menu.signOut)).toBe(true);
    });

    it('TC05 - Verify user can filter dashboard by Last Month', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);
        await DashboardPage.openFilter();

        expect(await DashboardPage.isVisible(selectors.dashboard.lastMonth)).toBe(true);
        await DashboardPage.selectLastMonth();
    });

    it('TC06 - Verify user can open Notifications', async () => {
        await LoginPage.login(testData.croEmployeeId, testData.password);
        await DashboardPage.openNotifications();
    });
});
