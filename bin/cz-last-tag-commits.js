#!/usr/bin/env node

const getLastTagCommits = require('../lib/getLastTagCommits');

getLastTagCommits().then(commits => console.log(commits.join('\n')));
