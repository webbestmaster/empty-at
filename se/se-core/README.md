# se-core
Selenium Web Driver Auto Test Core.

## Example
```javascript
/* global describe, it, before, after, beforeEach, afterEach, process */

const {assert} = require('chai');
const WebDriver = require('selenium-webdriver');
const addContext = require('mochawesome/addContext');
const {SeleniumServer} = require('selenium-webdriver/remote');
const {seUtil, testUtil} = require('se-core');

const {mainConfig} = require('./../test-config/main-config.js');
const envData = testUtil.getEnvData();
const server = new SeleniumServer(...testUtil.getSeleniumServerArgs());
const until = WebDriver.until;
const byCss = WebDriver.By.css;
let driver = null;

const selector = {
    iFrame: 'iframe-css-selector',
    loader: 'loader-css-selector'
};

describe('Load', () => {
    if (!envData.isMobile) {
        before(async () => server.start());
    }

    after(async () => server.stop());

    beforeEach(async () => {
        driver = new WebDriver
            .Builder()
            .usingServer(envData.wdServerUrl)
            .withCapabilities(testUtil.getCapabilities())
            .build();

        if (!envData.isMobile) {
            await seUtil.screen.setSize(driver, 1024, 768);
        }
    });

    afterEach(async () => driver.quit());


    it('Load iFrame', async function loadIFrame() {
        await driver.get(mainConfig.url.host + mainConfig.url.pathname);

        // wait to create loader
        const loader = await driver.wait(until.elementLocated(byCss(selector.loader)), 5e3);

        // wait to hide loader
        await driver.wait(until.elementIsNotVisible(loader), 10e3);

        // wait to create iFrame
        const iFrame = await driver.wait(until.elementLocated(byCss(selector.iFrame)), 5e3);

        // wait to show iFrame
        await driver.wait(until.elementIsVisible(iFrame), 5e3);

        const image = await seUtil.screen
            .ofSelector(driver, selector.iFrame);

        addContext(this, image); // eslint-disable-line no-invalid-this
    }).timeout(30e3);

});
```
