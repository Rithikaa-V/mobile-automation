import LoginPage from '../../pageobjects/login.page';
import DueCollectionPage, { CollectionOptions } from '../../pageobjects/dueCollection.page';
import { testData } from '../../data/testData';

interface Scenario extends Pick<CollectionOptions, 'mode' | 'amount' | 'proceedForVerification'> {
    id: string;
    title: string;
}

const scenarios: Scenario[] = [
    { id: 'TC07', title: 'cash payment and other amount', mode: 'cash', amount: 'other' },
    { id: 'TC08', title: 'cash payment and wallet', mode: 'cash', amount: 'wallet' },
    { id: 'TC09', title: 'cash payment and the normal amount', mode: 'cash', amount: 'normal' },
    { id: 'TC10', title: 'bank transfer and other amount', mode: 'bank', amount: 'other', proceedForVerification: true },
    { id: 'TC11', title: 'bank transfer and wallet', mode: 'bank', amount: 'wallet' },
    { id: 'TC12', title: 'bank transfer and the normal amount', mode: 'bank', amount: 'normal' },
];

describe('CRO - due collection', () => {
    beforeEach(async () => {
        await LoginPage.ensureLoggedOut();
    });

    scenarios.forEach(({ id, title, mode, amount, proceedForVerification }, index) => {
        it(`${id} - Verify CRO can complete a due collection with ${title}`, async () => {
            const dueId = testData.dueIds[index % testData.dueIds.length];

            await LoginPage.login(testData.croEmployeeId, testData.password);
            await DueCollectionPage.openAllDues();
            await DueCollectionPage.startCollection(dueId);
            await DueCollectionPage.collect({
                mode,
                amount,
                otherAmount: amount === 'other' ? testData.otherAmount : undefined,
                proceedForVerification,
            });
        });
    });
});
