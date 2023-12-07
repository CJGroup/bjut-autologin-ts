import { networkInterfaces } from 'node:os';

import { ethernetLogin } from './ethernet';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const interfaces = networkInterfaces();

if (interfaces['以太网']) ethernetLogin();

export {};
