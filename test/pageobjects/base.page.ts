import { required } from '../config/env';
import { selectors } from '../selectors/selectors';
import { assertAndroid, inNativeContext, scrollDown, tapAt } from '../support/native';

export type Finder = string;

export const TIMEOUT = { short: 3000, default: 10000, long: 15000 };

// The system camera has no stable locator, so these two waits stay as pauses.
const CAMERA_WARMUP_MS = 2000;
const BACK_FROM_EDITOR_MS = 2000;

// Where the shutter button sits on the reference device (1080x2400), as fractions of the screen.
const SHUTTER = { x: 543 / 1080, y: 2166 / 2400 };

export default class BasePage {
    async waitFor(finder: Finder, timeout = TIMEOUT.default) {
        await driver.execute('flutter:waitFor', finder, timeout);
    }

    async isVisible(finder: Finder, timeout = TIMEOUT.short): Promise<boolean> {
        try {
            await this.waitFor(finder, timeout);
            return true;
        } catch {
            return false;
        }
    }

    async click(finder: Finder, timeout = TIMEOUT.default) {
        await this.waitFor(finder, timeout);
        await driver.elementClick(finder);
    }

    async enterText(finder: Finder, value: string) {
        await this.waitFor(finder);
        await driver.elementSendKeys(finder, value);
    }

    async scrollScreen() {
        await scrollDown();
    }

    async uploadDocumentFromCamera() {
        assertAndroid('uploadDocumentFromCamera');

        await this.click(selectors.upload.uploadDocument);
        await this.click(selectors.upload.camera);
        await driver.pause(CAMERA_WARMUP_MS);

        await inNativeContext(async () => {
            await tapAt(SHUTTER.x, SHUTTER.y);

            // The photo editor comes from a third-party library inside the app, hence the app id in the locator.
            const done = await $(`id=${required('APP_ID')}:id/menu_crop`);
            await done.waitForDisplayed({
                timeout: TIMEOUT.long,
                timeoutMsg: 'Photo editor did not open after taking the picture',
            });
            await done.click();
            await driver.pause(BACK_FROM_EDITOR_MS);
        });
    }
}
