import { byText, byValueKey } from 'appium-flutter-finder';

// Flutter finders, grouped by screen. byValueKey needs a ValueKey in the app code, byText matches visible text.
export const selectors = {
    login: {
        employeeId: byValueKey('employeeIdField'),
        password: byValueKey('passwordField'),
        termsCheckbox: byValueKey('termsCheckbox'),
        loginButton: byValueKey('loginButton'),
    },

    menu: {
        icon: byValueKey('menuIcon'),
        dashboard: byText('Dashboard'),
        myProfile: byText('My Profile'),
        signOut: byText('Sign Out'),
    },

    profile: {
        backButton: byValueKey('profileBackButton'),
    },

    dashboard: {
        dueCollection: byValueKey('dueCollection'),
        filterIcon: byValueKey('filterIcon'),
        lastMonth: byText('Last Month'),
        notificationIcon: byValueKey('notificationIcon'),
    },

    dueCollection: {
        bottomTab: byValueKey('DueCollectionButton'),
        allDuesTab: byValueKey('allDues'),
        searchField: byValueKey('searchDue'),
        completeButton: byValueKey('completeBtn'),
        confirmDue: byValueKey('confirmOne'),
        confirmAmount: byValueKey('confirmTwo'),
        confirmPayment: byValueKey('confirmThree'),
        otherAmountSwitch: byValueKey('otherAmountSwitch'),
        otherAmountField: byValueKey('otherAmountField'),
        walletSwitch: byValueKey('walletSwitch'),
        bankTransfer: byText('Bank Transfer'),
        proceedButton: byValueKey('proceedButton'),
        depositAmount: byText('DEPOSIT AMOUNT'),
        submit: byText('SUBMIT'),
    },

    upload: {
        uploadDocument: byText('Upload Document'),
        camera: byText('Camera'),
        retake: byText('RETAKE'),
        captureButton: byValueKey('captureButton'),
    },

    bm: {
        setTarget: byText('Set Target'),
        selectCro: byValueKey('selectCRO'),
        financialYear: byValueKey('selectFinancialYear'),
        month: byValueKey('selectMonth'),
        targetAmount: byValueKey('targetAmount'),
        next: byText('NEXT'),
        nextSmall: byText('Next'),
        confirm: byText('CONFIRM'),
        submit: byText('SUBMIT'),

        resubmittedLoans: byValueKey('resubmittedLoans'),
        searchResubmitted: byValueKey('searchLoansResubmit'),
        loanDetails: byText('LOAN DETAILS'),
        updateDetails: byText('UPDATE DETAILS'),
        basicEligibility: byText('Basic eligibility check'),

        addDocument: byValueKey('addDocument'),
        selectDocuments: byValueKey('selectDocuments'),
        documentNumber: byValueKey('documentNumber'),
        frontSide: byValueKey('frontSide'),
        backSide: byValueKey('backSide'),
        addButton: byValueKey('addButton'),
    },
};
