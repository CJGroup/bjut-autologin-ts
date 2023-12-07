declare module 'wifi-name' {
    declare function wifiName(): Promise<string>;
    declare namespace wifiName { 
        export function sync(): string;
    }
    export = wifiName;
}