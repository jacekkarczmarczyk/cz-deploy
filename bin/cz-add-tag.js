#!/usr/bin/env node

const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';
const addTag = require('../lib/addTag');
const version = JSON.parse(fs.readFileSync(packageJsonPath, {
  encoding: 'utf-8',
})).version;

addTag(version).then(tag => {
  console.log(`[cz-deploy] Added tag "${tag}".`);
}).catch(e => {
  console.error(`[cz-deploy] ${e.message}`);
  throw e;
});
