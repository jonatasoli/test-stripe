import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.simbioseventures',
  appName: 'fastcrud',
  webDir: 'dist',
  bundledWebRuntime: false,
  "server": {
    // "url": "http://192.168.1.180:3000",
    "cleartext": true
  }
};

export default config;
