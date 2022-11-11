#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';
import addTag from '../lib/addTag.mjs';

const packageJsonPath = yargs.argv._[0] || './package.json';
const { version } = JSON.parse(fs.readFileSync(packageJsonPath, {
  encoding: 'utf-8',
}));

addTag(version).then(tag => {
  console.log(`[cz-deploy] Added tag "${tag}".`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
