#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import commit from '../lib/commit.mjs';
import mergeBranches from '../lib/syncBranches.mjs';
import getSettings from '../lib/getSettings.mjs';

const yargv = yargs(hideBin(process.argv)).argv;
const { push, pushTags } = yargv;
const settings = await getSettings();
const { version } = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

commit(version, settings.choreName).then(async ({ commitMessage, tag }) => {
  if (push || pushTags) {
    await mergeBranches(settings.developmentBranch, settings.productionBranch, push, pushTags);
    console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${settings.developmentBranch} (development) and ${settings.productionBranch} (production) branches`);
  }
  console.log(`[cz-deploy] Committed "${commitMessage}", added tag "${tag}".`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
