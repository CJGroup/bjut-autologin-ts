import { networkInterfaces } from 'node:os';

import { ethernetLogin } from './ethernet';

const interfaces = networkInterfaces();

if (interfaces['以太网']) ethernetLogin();

export {};
