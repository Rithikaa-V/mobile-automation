import path from 'node:path';
import { optional } from './test/config/env';

const platform = optional('PLATFORM', 'android').toLowerCase();

// Anything device specific is optional: when it is left out Appium uses the connected device or booted simulator.
const androidCaps = {
    platformName: 'Android',
    'appium:automationName': 'Flutter',
    'appium:deviceName': optional('ANDROID_DEVICE_NAME', 'Android Emulator'),
    ...(process.env.ANDROID_UDID ? { 'appium:udid': process.env.ANDROID_UDID } : {}),
    ...(process.env.ANDROID_PLATFORM_VERSION ? { 'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION } : {}),
    'appium:app': path.resolve(optional('ANDROID_APP_PATH', 'app/app-under-test.apk')),
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:autoGrantPermissions': true,
};

// iOS is wired up for the Flutter steps only. The camera, native text entry and scroll helpers are Android only.
const iosCaps = {
    platformName: 'iOS',
    'appium:automationName': 'Flutter',
    'appium:deviceName': optional('IOS_DEVICE_NAME', 'iPhone 15'),
    ...(process.env.IOS_UDID ? { 'appium:udid': process.env.IOS_UDID } : {}),
    ...(process.env.IOS_PLATFORM_VERSION ? { 'appium:platformVersion': process.env.IOS_PLATFORM_VERSION } : {}),
    'appium:app': path.resolve(optional('IOS_APP_PATH', 'app/Runner.app')),
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:showXcodeLog': true,
    'appium:maxRetryCount': 30,
    'appium:retryBackoffTime': 5000,
};

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,

    specs: ['./test/specs/**/*.spec.ts'],
    maxInstances: 1,
    capabilities: [platform === 'ios' ? iosCaps : androidCaps],

    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['appium'],
    framework: 'mocha',
    mochaOpts: { ui: 'bdd', timeout: 60000 },

    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results', disableWebdriverStepsReporting: true, disableWebdriverScreenshotsReporting: false }],
    ],

    afterTest: async (_test, _context, { passed }) => {
        if (!passed) {
            // the Allure reporter picks the screenshot up from the command
            await browser.takeScreenshot();
        }
    },
};
