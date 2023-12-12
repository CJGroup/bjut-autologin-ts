import * as cheerio from 'cheerio';

import { getCurrentWifiSSID } from "./utils";
import axios from 'axios';
import qs from 'qs';

async function susheLogin(){
    const htmlText = await (await fetch('http://10.21.221.98/a79.htm')).text();
    const $ = cheerio.load(htmlText);
    let v46ip: string = '';
    $('script').each((index, element) => {
        const scriptContent = $(element).html();
        const variableValueMatch = scriptContent?.match(/v46ip\s*=\s*["']([^"']+)["']/);
        if (variableValueMatch) {
            v46ip = variableValueMatch[1];
        }
    });
    const data = {
        callback: 'dr1003',
        'login_method': 1,
        user_account: '23371226',
        user_password: 'pv#b8f635k7^Wf2J',
        wlan_user_ip: v46ip,
        wlan_user_ipv6: '',
        wlan_user_mac: '000000000000',
        wlan_ac_ip: '',
        wlan_ac_name: '',
        jsVersion: '4.2.1',
        terminal_type: '1',
        lang: 'zh-cn',
        'v': Math.random()*9000+1000,
    }
    const res = await axios.get(`http://10.21.221.98:801/eportal/portal/login?${qs.stringify(data)}`);
    if(res.status === 200 && res.data.result === 1) {
        console.log('宿舍网验证成功！');
    } else console.log(`宿舍网验证失败！`);
}

async function campusLogin() {

}

async function wifiLogin() {
    // get current ssid that your computer 
    const ssid = await getCurrentWifiSSID() as string;
    if(ssid.match('bjut_sushe')) {
        await susheLogin();
    } else if(ssid.match('bjut_wifi')) {
        await campusLogin();
    } else return;
}

export { wifiLogin }