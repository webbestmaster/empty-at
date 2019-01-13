// @flow

/* global describe, it, before, after, beforeEach, afterEach */

import {Builder, By, until} from 'selenium-webdriver';

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

        const searchElemSelector = 'input.gLFyf';

        await driver.get('https://google.com');

        await driver.sleep(1e3);

        const localedElem = await driver.wait(until.elementLocated(By.css(searchElemSelector)), 10e3);
        // const localedElem = await driver.findElement(By.css(searchElemSelector));
        // await localedElem.click();

        await localedElem.sendKeys('[ localed element! ]');

        const visibleElem = await driver.wait(until.elementIsVisible(localedElem), 10e3);

        await visibleElem.sendKeys('[ visible element! ]');

        await driver.sleep(3e3);
    }).timeout(30e3);
});
