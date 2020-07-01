# cz-deploy

Bunch of opinionated tools for releasing packages workflow

## Installation

```bash
yarn add -D cz-deploy
```

## Usage
- `yarn cz-update-version` - updates version in package.json. If there are commits starting with `breaking` it will release a new major version, if there are commits starting with `feat` it will release a new minor version, otherwise a new patch
- `yarn cz-commit [--chore=NAME]` - adds `v${version}` tag and commits current changes with `chore(NAME): v${version}` message
- `yarn cz-sync [--push] [--push-tags]` - synchronizes and pushes `dev` and `master` branches
- `yarn cz-add-tag` - adds a `v${version}` tag (ex. `v1.0.5`, version take from package.json file)
- `yarn cz-lag-tag-commits` - prints the commits since the last tag

### Example workflow - simple project

##### 1. Add the following script to your package.json

```json
{
  "scripts": {
    "release": "yarn cz-update-version && yarn cz-commit && yarn cz-sync --push --push-tags"
  }
}
```

##### 2. Be sure you're on `dev` branch, commit all your changes, run `yarn release`


### Example workflow - advances usage with testing/building stages and publishing to npm

##### 1. Add the following script to your package.json

```json
{
  "scripts": {
    "release": "git diff --name-status --exit-code HEAD && yarn test && yarn bin/cz-update-version && yarn build && git add . && yarn cz-commit --chore=build+release && yarn cz-sync --push --push-tags && npm publish",
    "test": "YOUR_TEST_SCRIPT",
    "build": "YOUR_BUILD_SCRIPT"
  }
}
```

##### 2. Be sure you're on `dev` branch, commit all your changes, run `yarn release`


