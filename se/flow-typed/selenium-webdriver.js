// @flow

declare module 'selenium-webdriver' {
    declare export class WebDriver {
        constructor(): WebDriver,
        executeScript(evalCove: string): Promise<mixed>,
        findElement(cssSelector: CssSelectorType): Promise<WdHtmlElement>,
        manage(): WdManage,
        quit(): Promise<mixed>,
        get(url: string): Promise<mixed>,
    }

    declare export class Builder {
        constructor(): Builder,
        usingServer(serverUrl: string): Builder,
        withCapabilities(capabilities: mixed): Builder,
        build(): WebDriver,
    }

    declare class WdManage {
        window(): WdWindow,
    }

    declare class WdWindow {
        setSize(width: number, height: number): Promise<mixed>,
    }

    declare class WdHtmlElement {
        getLocation(): Promise<{x: number, y: number}>,
        getSize(): Promise<{width: number, height: number}>,
    }

    declare type CssSelectorType = {};

    declare type ByType = {
        css(cssSelector: string): CssSelectorType,
    };

    declare export var By: ByType;
}

declare module 'selenium-webdriver/remote' {
    declare export class SeleniumServer {
        constructor(pathToDriver: string, ServerArgType): SeleniumServer,
        start(): Promise<mixed>,
        stop(): Promise<mixed>,
    }

    declare export type ServerArgType = {|
        +port: number,
        +jvmArgs: [string] | null,
    |};
}
