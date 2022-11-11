#!/usr/bin/env node

import updateVersion from '../lib/updateVersion.mjs';
import yargs from 'yargs';

const packageJsonPath = yargs().argv._[0] || './package.json';

updateVersion(packageJsonPath).then(({ commits, next, previous }) => {
  console.log(`[cz-deploy] ${commits.length} commit(s) since v${previous}:`);
  commits.forEach(line => console.log(`[cz-deploy] COMMIT ${line}`));
  console.log(`[cz-deploy] Updated ${packageJsonPath} to v${next}.`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
