import { cosmiconfigSync } from 'cosmiconfig';

const defaults = {
  developmentBranch: 'dev',
  productionBranch: 'main',
  choreName: 'release',
};

export default async function getSettings () {
  const explorerSync = cosmiconfigSync('cz');
  const searchedFor = explorerSync.search();
  const loaded = searchedFor?.config ?? {};

  return Object.assign({}, defaults, loaded);
}
