import { optional, required } from '../config/env';

// Getters, so a variable is only demanded by the specs that actually use it.
export const testData = {
    get croEmployeeId() { return required('CRO_EMPLOYEE_ID'); },
    get bmEmployeeId() { return required('BM_EMPLOYEE_ID'); },
    get password() { return required('TEST_PASSWORD'); },

    // One due per payment scenario; a completed due cannot be collected again.
    // DUE_IDS is comma separated. With fewer ids than scenarios the list is reused.
    get dueIds() {
        const ids = (optional('DUE_IDS') || required('DUE_ID')).split(',').map((id) => id.trim()).filter(Boolean);
        if (ids.length === 0) throw new Error('DUE_IDS is empty');
        return ids;
    },
    get otherAmount() { return required('OTHER_AMOUNT'); },
    get depositAmount() { return required('DEPOSIT_AMOUNT'); },

    get targetAmount() { return required('TARGET_AMOUNT'); },
    get croDisplayName() { return required('CRO_DISPLAY_NAME'); },
    get financialYear() { return optional('FINANCIAL_YEAR', '2025'); },
    get targetMonth() { return optional('TARGET_MONTH', 'July'); },

    // only used by the skipped resubmission test
    get resubmitLoanId() { return optional('RESUBMIT_LOAN_ID'); },
    get gstNumber() { return optional('GST_NUMBER'); },
};
