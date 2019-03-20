#!/usr/bin/env node

const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';
const addTag = require('../lib/addTag');

addTag(packageJsonPath).then(tag => {
  console.log(`[cz-deploy] Added tag "${tag}".`);
}).catch(e => {
  console.error(`[cz-deploy] ${e.message}`);
  throw e;
});
