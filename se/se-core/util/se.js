// @flow

import {By, WebDriver} from 'selenium-webdriver';

const byCss = By.css;

export const screen = {
    setSize: (driver: WebDriver, width: number, height: number): Promise<mixed> => {
        return driver
            .manage()
            .window()
            .setSize(width, height);
    },

    setScrollTop: async (driver: WebDriver, scrollSize: number): Promise<number> => {
        await driver.executeScript('document.body.scrollTop = ' + scrollSize);

        return screen.getScrollTop(driver);
    },

    setScrollLeft: async (driver: WebDriver, scrollSize: number): Promise<number> => {
        await driver.executeScript('document.body.scrollLeft = ' + scrollSize);

        return screen.getScrollLeft(driver);
    },

    getScrollTop: (driver: WebDriver): Promise<number> => {
        return driver
            .executeScript('return document.body.scrollTop')
            .then((scrollSize: mixed): number => parseInt(scrollSize, 10));
    },

    getScrollLeft: (driver: WebDriver): Promise<number> => {
        return driver
            .executeScript('return document.body.scrollLeft')
            .then((scrollSize: mixed): number => parseInt(scrollSize, 10));
    },
};
