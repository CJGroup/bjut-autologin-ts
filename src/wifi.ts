import { getCurrentWifiSSID } from "./utils";

async function wifiLogin() {
    // get current ssid that your computer 
    const ssid = await getCurrentWifiSSID();
    console.log(ssid);
}

export { wifiLogin }