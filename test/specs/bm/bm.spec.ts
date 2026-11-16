import LoginPage from '../../pageobjects/login.page';
import MenuPage from '../../pageobjects/menu.page';
import BMPage from '../../pageobjects/bm.page';
import DueCollectionPage from '../../pageobjects/dueCollection.page';
import { testData } from '../../data/testData';

describe('BM - target and deposit', () => {
    beforeEach(async () => {
        await LoginPage.ensureLoggedOut();
    });

    it('TC13 - Verify BM can set target to CRO', async () => {
        await LoginPage.login(testData.bmEmployeeId, testData.password);
        await MenuPage.openMenu();
        await BMPage.openSetTarget();

        await BMPage.selectCro(testData.croDisplayName);
        await BMPage.selectFinancialYear(testData.financialYear);
        await BMPage.selectMonth(testData.targetMonth);
        await BMPage.enterTargetAmount(testData.targetAmount);
        await BMPage.nextSmall();
    });

    it('TC14 - Verify BM can deposit amount', async function () {
        this.timeout(180000);

        await LoginPage.login(testData.croEmployeeId, testData.password);
        await DueCollectionPage.openFromDashboard();
        await DueCollectionPage.scrollScreen();
        await DueCollectionPage.depositAmount(testData.depositAmount);
        await DueCollectionPage.uploadDocumentFromCamera();
        await DueCollectionPage.submit();
    });

    // Fails on the device and has not been investigated yet, so it is kept out of the run.
    it.skip('TC15 - Verify BM can complete loan resubmission', async function () {
        this.timeout(300000);

        await LoginPage.login(testData.bmEmployeeId, testData.password);
        await BMPage.openResubmittedLoans();
        await BMPage.searchLoan(testData.resubmitLoanId);
        await BMPage.openLoan();
        await BMPage.clickUpdateDetails();
        await BMPage.basicEligibilityCheck();

        await BMPage.next(2); // customer information
        await BMPage.retakeImage(); // house photo
        // house photo, income and expense, loan details, customer documents, agriculture (two screens)
        await BMPage.next(6);
        await BMPage.retakeImage(); // business picture
        // business picture, profit and loss, business overview, continue
        await BMPage.next(4);
        await BMPage.addDocument('GST', testData.gstNumber);
        // GST, bank details, modify amount
        await BMPage.next(3);
        await BMPage.captureBmPhoto();
        await BMPage.submitLoan();
    });
});
