import type { Options } from '@wdio/types';
import dotenv from 'dotenv';

dotenv.config();

export const config: Options.Testrunner = {
  runner: 'local',
  framework: 'cucumber',

  specs: [
    'src/features/mobile_android/**/*.feature',
    'src/features/mobile_iOS/**/*.feature',
    'src/features/web/**/*.feature'
  ],

  maxInstances: 1,
  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  cucumberOpts: {
    require: [
      './src/hooks.ts',
      './src/step_definitions/mobile_android/**/*.ts',
      './src/step_definitions/mobile_iOS/**/*.ts',
      './src/step_definitions/web/**/*.ts',
    ],
    // Removed requireModule: ['ts-node/register'] - Use tsx for native TS support
    timeout: 120000,
  },
};