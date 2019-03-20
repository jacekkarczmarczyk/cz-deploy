#!/usr/bin/env node

const release = require('../lib/czRelease');
const yargv = require('yargs').argv;
const packageJsonPath = yargv._[0] || './package.json';
const noCommit = yargv['noCommit'];

// noinspection JSIgnoredPromiseFromCall
release(packageJsonPath, noCommit).catch(e => {
  console.error(`[cz-release] ${e.message}`);
  throw e;
});
