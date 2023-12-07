import { networkInterfaces } from 'node:os';

import * as cheerio from 'cheerio';
import axios from 'axios';
import qs from 'qs';

const interfaces = networkInterfaces();

//
if (interfaces['以太网']) {
    const htmlText = await (await fetch('https://lgn.bjut.edu.cn')).text();
    const $ = cheerio.load(htmlText);
    let v4serip: string = '';
    $('script').each((index, element) => {
        const scriptContent = $(element).html();
        const variableValueMatch = scriptContent?.match(/v4serip\s*=\s*["']([^"']+)["']/);
        if (variableValueMatch) {
            v4serip = variableValueMatch[1];
            console.log(v4serip);
        }
    });
    const data = {
        'DDDDD': 23371226,
        'upass': 'pv#b8f635k7^Wf2J',
        'v46s': 1,
        'v6ip': '',
        'f4serip': v4serip,
        '0MKKey': ''
    };
    const res = await axios.post(
        'https://lgn.bjut.edu.cn',
        qs.stringify(data),
        {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
                'Content-Type':
                    'application/x-www-form-urlencoded'
            }
        }
    );
    if (res.status == 200) {
        console.log('登录成功');
    } else {
        console.log('登录失败');
        console.log(res.status);
        console.log(res.data);
    }
}

export {};
