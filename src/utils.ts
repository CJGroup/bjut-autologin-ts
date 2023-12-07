import { exec } from 'node:child_process'

import { decode } from 'iconv-lite'

export function GBKtoUTF8(str: string) {
  return decode(Buffer.from(str, 'binary'), 'gb2312');
}

export function getCurrentWifiSSID() {
  return new Promise((resolve, reject) => {
    exec('netsh wlan show interfaces', (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      const lines = stdout.split('\n');
      let ssid = '';

      for (const line of lines) {
        const match = line.match(/^\s*SSID\s*:\s*(.*)/i);
        if (match) {
          ssid = match[1].trim();
          break;
        }
      }

      resolve(ssid);
    });
  });
}