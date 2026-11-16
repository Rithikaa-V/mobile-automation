const FLUTTER = 'FLUTTER';
const NATIVE = 'NATIVE_APP';

// Always hands the session back to Flutter, even when the action throws.
// Without the finally block one failure leaves the driver in NATIVE_APP and breaks every later test.
export async function inNativeContext<T>(action: () => Promise<T>): Promise<T> {
    await driver.switchContext(NATIVE);
    try {
        return await action();
    } finally {
        await driver.switchContext(FLUTTER);
    }
}

export function assertAndroid(feature: string) {
    if (!driver.isAndroid) {
        throw new Error(`${feature} is only implemented for Android`);
    }
}

// Positions are fractions of the screen, so they hold on any resolution.
export async function scrollDown(percent = 0.7) {
    assertAndroid('scrollDown');
    await inNativeContext(async () => {
        const { width, height } = await driver.getWindowSize();
        await driver.execute('mobile: scrollGesture', {
            left: Math.round(width * (100 / 1080)),
            top: Math.round(height * (400 / 2400)),
            width: Math.round(width * (800 / 1080)),
            height: Math.round(height * (1400 / 2400)),
            direction: 'down',
            percent,
        });
    });
}

export async function tapAt(xRatio: number, yRatio: number) {
    const { width, height } = await driver.getWindowSize();
    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: Math.round(width * xRatio), y: Math.round(height * yRatio) },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerUp', button: 0 },
            ],
        },
    ]);
    await driver.releaseActions();
}

export async function typeIntoNativeField(locator: string, value: string) {
    assertAndroid('typeIntoNativeField');
    await inNativeContext(async () => {
        const field = await $(locator);
        await field.waitForDisplayed({ timeout: 10000 });
        await field.click();
        await driver.pause(500); // let the keyboard animation finish before typing
        await field.addValue(value);
    });
}
