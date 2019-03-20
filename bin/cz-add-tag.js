#!/usr/bin/env node

const addTag = require('../lib/czAddTag');

// noinspection JSIgnoredPromiseFromCall
addTag(process.argv[2] || './package.json').catch(e => {
  console.error(`[cz-release] ${e.message}`);
  throw e;
});
