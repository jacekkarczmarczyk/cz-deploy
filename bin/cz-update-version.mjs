#!/usr/bin/env node

import updateVersion from '../lib/updateVersion.mjs';
import getSettings from '../lib/getSettings.mjs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const yargv = yargs(hideBin(process.argv)).argv;
const { dryRun } = yargv;
const settings = await getSettings();

updateVersion('./package.json', settings.productionBranch, settings.developmentBranch, dryRun).then(({ commits, next, previous }) => {
  console.log(`[cz-deploy] ${commits.length} commit(s) since v${previous}:`);
  commits.forEach(line => console.log(`[cz-deploy] COMMIT ${line}`));
  console.log(`[cz-deploy] Updated ./package.json to v${next}.`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
