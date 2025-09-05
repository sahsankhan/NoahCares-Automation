import { config as shared } from './wdio.shared.conf'
import { join } from 'path'

export const config: WebdriverIO.Config = {
  ...shared,
  specs: [join(process.cwd(), 'src/features/mobile_android/**/*.feature')],
 // Ensure this matches the feature file location
  services: ['appium'],
  port: 4723,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': process.env.ANDROID_DEVICE || 'Android Emulator',
      'appium:automationName': 'UiAutomator2',
      'appium:app': join(process.cwd(), 'apps/noahcare.apk'),
      'appium:newCommandTimeout': 240,
      'appium:autoGrantPermissions': true
    }
  ]
}

