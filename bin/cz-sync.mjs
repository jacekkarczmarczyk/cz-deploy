#!/usr/bin/env node

import mergeBranches from '../lib/syncBranches.mjs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import getSettings from '../lib/getSettings.mjs';

const yargv = yargs(hideBin(process.argv)).argv;
const settings = await getSettings();
const { push, pushTags } = yargv;

mergeBranches(settings.developmentBranch, settings.productionBranch, push, pushTags).then(() => {
  console.log(`[cz-deploy] Synced${push ? ' and pushed ' : ' '}${settings.developmentBranch} (development) and ${settings.productionBranch} (production) branches`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
