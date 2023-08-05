#!/usr/bin/env node

import fs from 'fs';
import addTag from '../lib/addTag.mjs';

const { version } = JSON.parse(fs.readFileSync('./package.json', {
  encoding: 'utf-8',
}));

addTag(version).then(tag => {
  console.log(`[cz-deploy] Added tag "${tag}".`);
}).catch(e => {
  console.error('[cz-deploy]', e);
  process.exit(1);
});
