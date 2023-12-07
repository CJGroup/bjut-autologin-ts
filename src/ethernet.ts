import * as cheerio from 'cheerio';
import axios from 'axios';
import qs from 'qs';
import { GBKtoUTF8 } from './utils';

async function v4BasicLogin() {
    const htmlText = await (await fetch('https://lgn.bjut.edu.cn')).text();
    const $ = cheerio.load(htmlText);
    let v4serip: string = '';
    $('script').each((index, element) => {
        const scriptContent = $(element).html();
        const variableValueMatch = scriptContent?.match(/v4serip\s*=\s*["']([^"']+)["']/);
        if (variableValueMatch) {
            v4serip = variableValueMatch[1];
        }
    });
    const data = {
        DDDDD: 23371226,
        upass: 'pv#b8f635k7^Wf2J',
        v46s: 1,
        v6ip: '',
        f4serip: v4serip,
        '0MKKey': ''
    };
    let nf = true;
    let time = 0;
    while (nf) {
        const res = await axios.post('https://lgn.bjut.edu.cn', qs.stringify(data), {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (res.status === 200 && ((res.data as string).match('successfully logged'))?.length) {
            console.log('IPv4验证成功！');
            nf = false;
            break;
        } else {
            time++;
            if (time > 5) {
                console.log('IPv4验证失败！');
                nf = false;
                break;
            }
        }
    }
}

async function v6DualLogin() {
    const htmlText = await (await fetch('https://lgn6.bjut.edu.cn')).text();
    let $ = cheerio.load(htmlText);
    let v4serip: string = '';
    $('script').each((index, element) => {
        const scriptContent = $(element).html();
        const variableValueMatch = scriptContent?.match(/v4serip\s*=\s*["']([^"']+)["']/);
        if (variableValueMatch) {
            v4serip = variableValueMatch[1];
        }
    });
    const data = {
        DDDDD: 23371226,
        upass: 'pv#b8f635k7^Wf2J',
        v46s: 0,
        v6ip: '',
        f4serip: v4serip,
        '0MKKey': ''
    };
    const res1 = await axios.post(
        'https://lgn6.bjut.edu.cn/V6?https://lgn.bjut.edu.cn',
        qs.stringify(data),
        {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    if (res1.status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        $ = cheerio.load(res1.data);
        const data = {
            DDDDD: $('input[name=DDDDD]').val(),
            upass: $('input[name=upass]').val(),
            '0MKKey': $('input[name=0MKKey]').val(),
            v6ip: $('input[name=v6ip]').val()
        };
        let nf = true;
        let time = 0;
        while (nf) {
            const res2 = await axios.post('https://lgn.bjut.edu.cn', qs.stringify(data), {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Origin: 'https://lgn6.bjut.edu.cn',
                    Referer: 'https://lgn6.bjut.edu.cn/'
                }
            });
            if (res2.status === 200 && ((res2.data as string).match('successfully logged'))?.length) {
                console.log('IPv4和IPv6统一验证成功！');
                nf=false;
                break;
            } else {
                time++;
                if (time > 5) {
                    console.log('IPv4和IPv6统一验证失败！');
                    nf = false;
                    break;
                }
            }
        }
    } else {
        console.log('IPv6验证失败！');
    }
}

async function ethernetLogin() {
    let flag4 = false;
    while (!flag4) {
        const status = (await axios.get('https://lgn.bjut.edu.cn')).status;
        if (status === 200) {
            flag4 = true;
            break;
        }
    }
    await v4BasicLogin();
    let flag6 = false;
    while (!flag6) {
        const status = (await axios.get('https://lgn6.bjut.edu.cn')).status;
        if (status === 200) {
            flag6 = true;
            break;
        }
    }
    await v6DualLogin();
}

export { ethernetLogin };
