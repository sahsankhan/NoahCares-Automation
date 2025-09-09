import { config as shared } from './wdio.shared.conf'
import { join } from 'path'

export const config: WebdriverIO.Config = {
  ...shared,
  specs: [join(process.cwd(), 'src/features/mobile_android/**/*.feature')],
 // Ensure this matches the feature file location
  services: ['appium'],
  port: 4723,
  capabilities: [{
  platformName: 'Android',
  'appium:deviceName': 'emulator-5554',
  'appium:platformVersion': '16',  // Confirm emulator runs Android 16; if not, change to match (e.g., '14')
  'appium:app': join(process.cwd(), 'apps/noahcare.apk'),  // Use absolute path
  'appium:appPackage': 'com.snowy_salad_38566',
  'appium:appActivity': 'com.snowy_salad_38566.MainActivity',
  'appium:automationName': 'UiAutomator2',
  'appium:newCommandTimeout': 240,
  'appium:autoGrantPermissions': true,
  'appium:noReset': false,  // Add this
}],
}

