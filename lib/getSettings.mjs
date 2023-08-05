import fs from 'fs';

const defaults = {
  developmentBranch: 'dev',
  productionBranch: 'main',
  choreName: 'release',
};

export default async function getSettings (settingsFile = '.czrc.json') {
  if (!fs.existsSync(settingsFile)) return { ...defaults };

  const settings = JSON.parse(fs.readFileSync(settingsFile, {
    encoding: 'utf-8',
  }));

  return Object.assign({}, defaults, settings);
}
