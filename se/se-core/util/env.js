// @flow

/* global process */

import {type ServerArgType} from 'selenium-webdriver/remote';
import path from 'path';

const pathToDrivers = path.resolve('se-core', 'driver');

type EnvDataType = {|
    +isMobile: boolean,
    +wdServerUrl: string,
|};

export function getEnvData(): EnvDataType {
    // eslint-disable-next-line no-process-env, id-match
    const {IS_MOBILE, SE_SERVER_PORT} = process.env;

    const seServerPort = parseInt(SE_SERVER_PORT, 10);

    return {
        isMobile: Boolean(IS_MOBILE),
        wdServerUrl: 'http://localhost:' + seServerPort + '/wd/hub',
    };
}

export function getCapabilities(): mixed {
    // eslint-disable-next-line no-process-env
    const browserName = String(process.env.BROWSER_NAME);

    switch (browserName) {
        case 'android':
        case 'chrome':
            return {browserName: 'chrome', chromeOptions: {args: ['--disable-extensions', '--disable-infobars']}};
        case 'ff':
            return {browserName: 'firefox'};
        case 'opera':
            return {browserName: 'opera', operaOptions: {binary: '/usr/bin/opera'}};

        default:
            throw new Error('Not support browser with name: ' + browserName);
    }
}

type OsNameType = 'darwin' | 'linux';

function getOsName(): OsNameType {
    const platformName = process.platform;

    if (/darwin/.test(platformName)) {
        return 'darwin';
    }

    if (/linux/.test(platformName)) {
        return 'linux';
    }

    throw new Error('Can NOT detect OS!');
}

function getJvmArgs(): [string] | null {
    // eslint-disable-next-line no-process-env
    const browserName = String(process.env.BROWSER_NAME);
    const osName = getOsName();

    switch (browserName) {
        case 'android':
            return null;
        case 'chrome':
            return ['-Dwebdriver.chrome.driver=' + path.join(pathToDrivers, osName, 'chromedriver')];
        case 'ff':
            return ['-Dwebdriver.gecko.driver=' + path.join(pathToDrivers, osName, 'geckodriver')];
        case 'opera':
            return ['-Dwebdriver.opera.driver=' + path.join(pathToDrivers, osName, 'operadriver')];

        default:
            throw new Error('Not support browser with name: ' + browserName);
    }
}

export function getSeleniumServerArgs(): [string, ServerArgType] {
    const seServerPort = parseInt(process.env.SE_SERVER_PORT, 10); // eslint-disable-line no-process-env

    return [
        path.join(pathToDrivers, 'selenium-server-standalone-3.9.1.jar'),
        {
            port: seServerPort,
            jvmArgs: getJvmArgs(),
        },
    ];
}
