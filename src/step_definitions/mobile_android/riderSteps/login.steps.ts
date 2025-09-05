import { Given, When } from '@wdio/cucumber-framework';
import { driver, browser } from '@wdio/globals'

Given('I have launched the NoahCare Android app', async () => {
    // 1️⃣ Get the APK path Appium is using from your WDIO config
    const apkPath = (driver.capabilities as any)['appium:app']
    console.log(`APK path from config: ${apkPath}`)

    // 2️⃣ Get the package name of the currently running app
    const currentPackage = await (driver as any).getCurrentPackage()
    console.log(`App started with package: ${currentPackage}`)

    // 3️⃣ Define which package name you expect (from .env or fallback)
    const expectedPackage = process.env.ANDROID_APP_PACKAGE || 'com.noahcare'

    // 4️⃣ Compare actual vs expected package names
    if (!currentPackage.toLowerCase().includes(expectedPackage.toLowerCase())) {
        throw new Error(`Wrong app launched! Expected: ${expectedPackage}, Got: ${currentPackage}`)
    }
})

When('I enter the valid rider credentials', async () => {
  // step code
});
