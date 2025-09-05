import { config as shared } from './wdio.shared.conf'
import type { Options, Capabilities } from '@wdio/types'

export const config: WebdriverIO.Config = {
  ...shared,
  specs: ['./src/features/web/**/*.feature'],
  baseUrl: process.env.WEB_BASE_URL || 'https://example.com',
  services: [],

capabilities: [
  {
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      // args: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage']
    }
  } as any
]
}
