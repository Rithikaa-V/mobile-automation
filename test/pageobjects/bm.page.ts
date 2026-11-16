import { byText } from 'appium-flutter-finder';
import BasePage, { TIMEOUT } from './base.page';
import { selectors } from '../selectors/selectors';

const s = selectors.bm;

class BMPage extends BasePage {
    // Set target
    async openSetTarget() {
        await this.click(s.setTarget);
    }

    private async pickFromList(opener: string, optionText: string) {
        await this.click(opener);
        await this.click(byText(optionText));
    }

    async selectCro(displayName: string) {
        await this.pickFromList(s.selectCro, displayName);
    }

    async selectFinancialYear(year: string) {
        await this.pickFromList(s.financialYear, year);
    }

    async selectMonth(month: string) {
        await this.pickFromList(s.month, month);
    }

    async enterTargetAmount(amount: string) {
        await this.click(s.targetAmount);
        await this.enterText(s.targetAmount, amount);
    }

    async nextSmall() {
        await this.click(s.nextSmall);
    }

    // Loan resubmission wizard
    async openResubmittedLoans() {
        await this.click(s.resubmittedLoans);
    }

    async searchLoan(loanId: string) {
        await this.enterText(s.searchResubmitted, loanId);
    }

    async openLoan() {
        await this.click(s.loanDetails, TIMEOUT.long);
    }

    async clickUpdateDetails() {
        await this.click(s.updateDetails);
    }

    async basicEligibilityCheck() {
        await this.click(s.basicEligibility);
    }

    async next(times = 1) {
        for (let i = 0; i < times; i++) {
            await this.click(s.next);
        }
    }

    async retakeImage() {
        await this.click(selectors.upload.retake);
        await this.uploadDocumentFromCamera();
    }

    async addDocument(type: string, number: string) {
        await this.click(s.addDocument);
        await this.click(s.selectDocuments);
        await this.click(byText(type));
        await this.enterText(s.documentNumber, number);

        await this.click(s.frontSide);
        await this.uploadDocumentFromCamera();
        await this.click(s.backSide);
        await this.uploadDocumentFromCamera();

        await this.click(s.addButton);
    }

    async captureBmPhoto() {
        await this.click(selectors.upload.captureButton);
        await this.uploadDocumentFromCamera();
    }

    async submitLoan() {
        await this.click(s.submit);
        await this.click(s.confirm);
    }
}

export default new BMPage();
