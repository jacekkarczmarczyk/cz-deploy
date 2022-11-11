#!/usr/bin/env node

import getLastTagCommits from '../lib/getLastTagCommits.mjs';

getLastTagCommits().then(commits => console.log(commits.join('\n')));
