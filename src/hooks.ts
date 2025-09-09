import { BeforeAll, AfterAll, Before, After } from '@wdio/cucumber-framework';
import path from 'path';
import fs from 'fs';

BeforeAll(async function () {});

Before(async function () {
  // ensure screenshots dir exists for After hook if used
  const dir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

After(async function () {});

AfterAll(async function () {});
