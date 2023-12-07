import { networkInterfaces } from 'node:os';

import { ethernetLogin } from './ethernet';
import { wifiLogin } from './wifi';

const interfaces = networkInterfaces();

if (interfaces['以太网']) ethernetLogin();
else if(interfaces['WLAN']) wifiLogin();

export {};
