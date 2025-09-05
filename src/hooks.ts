import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber'
import { driver, browser } from '@wdio/globals'
import fs from 'fs'
import path from 'path'


BeforeAll(async () => {
  console.log('Starting test execution...')
})

Before(async function (scenario) {
  console.log(`Starting scenario: ${scenario.pickle.name}`)

  if (browser.isMobile) {
    console.log('Running on mobile device...')
    await driver.execute('mobile: activateApp', {
      appId: process.env.ANDROID_APP_PACKAGE || process.env.IOS_APP_PACKAGE,
    })
  } else {
    console.log('Running on web browser...')
    await browser.url(process.env.WEB_BASE_URL || 'https://example.com')
  }
})

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    console.log(`Scenario failed: ${scenario.pickle.name}`)

    const screenshot = browser.isMobile
      ? await driver.takeScreenshot()
      : await browser.takeScreenshot()

    const screenshotPath = path.join(
      process.cwd(),
      'screenshots',
      `${Date.now()}.png`
    )

    fs.writeFileSync(screenshotPath, screenshot, 'base64')
    console.log(`Screenshot saved at: ${screenshotPath}`)
  } else {
    console.log(`Scenario passed: ${scenario.pickle.name}`)
  }
})

AfterAll(async () => {
  console.log('Test execution finished. Cleaning up...')

  if (browser.isMobile) {
    try {
      await driver.execute('mobile: terminateApp', {
        appId: process.env.ANDROID_APP_PACKAGE || process.env.IOS_APP_PACKAGE,
      })
    } catch (err) {
      console.warn('Could not terminate mobile app:', err)
    }
  } else {
    await browser.deleteSession()
  }
})
