import { networkInterfaces } from 'node:os';

import { ethernetLogin } from './ethernet';
import { wifiLogin } from './wifi';

async function main(){
    while (true) {
        const interfaces = networkInterfaces();
        if (interfaces['以太网']) await ethernetLogin();
        else if (interfaces['WLAN']) await wifiLogin();
        await new Promise((resolve) => setTimeout(resolve, 1000*60*5));
    }
}

main();

export {};
