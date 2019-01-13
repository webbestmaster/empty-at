// @flow

/* global describe, it, before, after, beforeEach, afterEach */

import {Builder} from 'selenium-webdriver';

import {SeleniumServer} from 'selenium-webdriver/remote';
import {screen} from '../se-core/util/se';
import {getSeleniumServerArgs, getCapabilities, getEnvData} from '../se-core/util/env';
const {isMobile, wdServerUrl} = getEnvData();

const server = new SeleniumServer(...getSeleniumServerArgs());

let driver = null;

describe('Load', () => {
    if (!isMobile) {
        before(async (): Promise<mixed> => server.start());
    }

    after(async (): Promise<mixed> => server.stop());

    beforeEach(
        async (): Promise<mixed> => {
            driver = new Builder()
                .usingServer(wdServerUrl)
                .withCapabilities(getCapabilities())
                .build();

            if (!isMobile) {
                await screen.setSize(driver, 1024, 768);
            }
        }
    );

    afterEach(async (): Promise<mixed> => driver && driver.quit());

    it('Load iFrame', async () => {
        if (!driver) {
            throw new Error('Driver is not define!');
        }

        await driver.get('https://google.com');
    }).timeout(30e3);
});
