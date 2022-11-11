#!/usr/bin/env node

import getLastTagCommits from '../lib/getLastTagCommits';

getLastTagCommits().then(commits => console.log(commits.join('\n')));
