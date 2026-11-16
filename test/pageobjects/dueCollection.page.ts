import BasePage from './base.page';
import { selectors } from '../selectors/selectors';
import { typeIntoNativeField } from '../support/native';

const s = selectors.dueCollection;

export type PaymentMode = 'cash' | 'bank';
export type AmountType = 'normal' | 'other' | 'wallet';

export interface CollectionOptions {
    mode: PaymentMode;
    amount: AmountType;
    otherAmount?: string;
    /** Bank transfers sometimes end on the accountant verification screen. */
    proceedForVerification?: boolean;
}

class DueCollectionPage extends BasePage {
    async openFromDashboard() {
        await this.click(selectors.dashboard.dueCollection);
    }

    async openAllDues() {
        await this.openFromDashboard();
        await this.click(s.bottomTab);
        await this.click(s.allDuesTab);
    }

    async searchDue(dueId: string) {
        await this.enterText(s.searchField, dueId);
    }

    async startCollection(dueId: string) {
        await this.searchDue(dueId);
        await this.click(s.completeButton);
        await this.click(s.confirmDue);
    }

    // The cash and bank flows differ only in the proof upload and a few optional steps,
    // so one method covers all of them.
    async collect({ mode, amount, otherAmount, proceedForVerification = false }: CollectionOptions) {
        if (mode === 'bank') {
            await this.click(s.bankTransfer);
            await this.uploadDocumentFromCamera();
        }

        if (amount === 'other') {
            if (!otherAmount) throw new Error('otherAmount is required when amount is "other"');
            await this.click(s.otherAmountSwitch);
            if (mode === 'bank') await this.scrollScreen(); // the field sits below the fold after the upload
            await this.enterText(s.otherAmountField, otherAmount);
        } else if (amount === 'wallet') {
            await this.click(s.walletSwitch);
        }

        await this.click(s.confirmAmount);

        if (amount !== 'wallet') {
            await this.click(s.confirmPayment);
        }
        if (proceedForVerification) {
            await this.click(s.proceedButton);
        }
    }

    async depositAmount(amount: string) {
        await this.click(s.depositAmount);
        await typeIntoNativeField('//android.widget.EditText', amount);
    }

    async submit() {
        await this.click(s.submit);
    }
}

export default new DueCollectionPage();
