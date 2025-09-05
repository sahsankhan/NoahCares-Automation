import { config as shared } from './wdio.shared.conf'
import { join } from 'path'

export const config: WebdriverIO.Config = {
  ...shared,

  // Use an array of globs instead of {a,b,c} to avoid Windows/minimatch quirks
specs: [
  'src/features/mobile_android/**/*.feature',
  'src/features/mobile_iOS/**/*.feature',
  'src/features/web/**/*.feature'
],

  services: ['appium'], // don't add selenium-standalone here
  port: 4723,
  maxInstances: 2,

  capabilities: [
    // Web
    { browserName: 'chrome' },

    // Android
    {
      platformName: 'Android',
      'appium:deviceName': 'Android Emulator',
      'appium:automationName': 'UiAutomator2',
      'appium:app': join(process.cwd(), 'apps/noahcare.apk'), // 👈 correct
      'appium:newCommandTimeout': 240,
      'appium:autoGrantPermissions': true
    },

    // iOS
    {
      platformName: 'iOS',
      'appium:deviceName': process.env.IOS_DEVICE || 'iPhone 14',
      'appium:platformVersion': process.env.IOS_VERSION || '16.4',
      'appium:automationName': 'XCUITest',
      'appium:app': join(process.cwd(), 'apps/noahcare.ipa'), // 👈 correct
      'appium:newCommandTimeout': 240
    }
  ]
}
