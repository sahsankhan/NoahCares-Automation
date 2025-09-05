import { config as shared } from './wdio.shared.conf'
import { join } from 'path'

export const config: WebdriverIO.Config = {
  ...shared,
  specs: ['src/features/mobile_iOS/**/*.feature'],
  services: ['appium'],
  port: 4723,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': process.env.IOS_DEVICE || 'iPhone 14',
      'appium:platformVersion': process.env.IOS_VERSION || '16.4',
      'appium:automationName': 'XCUITest',
      'appium:app': join(process.cwd(), 'apps/ride-hailing.ipa'),
      'appium:newCommandTimeout': 240
    }
  ]
}
