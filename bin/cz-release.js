#!/usr/bin/env node

const release = require('../lib/index');

// noinspection JSIgnoredPromiseFromCall
release(process.argv[2] || './package.json').catch(e => {
  console.error(`[cz-release] ${e.message}`);
  throw e;
});
