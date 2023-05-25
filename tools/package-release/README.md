# Releasing Javascript packages

When a package contains sufficient changes to justify a release to [NPM](https://www.npmjs.com/), follow these instructions to create a new release from the monorepo.

## Release packages using Github Workflows (recommended)

### Prepare packages

In order to prepare a package for release, a changelog will need to be compiled along with an appropriate version bump.

1. Visit the monorepo Action [Prepare Package Release workflow](https://github.com/woocommerce/woocommerce/actions/workflows/prepare-package-release.yml). Click the "Run workflow" button.

![image](https://user-images.githubusercontent.com/1922453/179434424-f08af974-5597-4c6f-955b-43faf062c7a7.png)

2. Select the branch you'd like to release from. Typically, this would be `trunk`. You can also choose which packages to prepare for release by supplying them as comma separated values in the input box. To loop through all packages, simply leave the `-a` flag. Packages that don't have any changes will be skipped and left as is.

![image](https://user-images.githubusercontent.com/1922453/179434508-8f44fcca-0f01-47f2-8b9e-f5ef5ff3a577.png)

3. Once the action has finished, check [open pull requests](https://github.com/woocommerce/woocommerce/pulls) for a pull request generated by Github Actions Bot. This pull request should include version bumps and changelog changes for applicable packages. Approve and merge the pull request once checks pass.

### Release Packages

1. Release the packages to NPM by kicking off another workflow. The [Packages Release workflow](https://github.com/woocommerce/woocommerce/actions/workflows/package-release.yml) has the same inputs as the prepare workflow. Be sure to release from the same branch and select the same packages to release.

![image](https://user-images.githubusercontent.com/1922453/179435048-ad2cd168-55b1-471a-b05f-3aed4a9e499b.png)

2. Confirm the package has been updated by visiting NPM. For example see https://www.npmjs.com/package/@woocommerce/components.

## Release packages using the command line

### Prepare packages

1. At monorepo root, run the following command to prepare all packages. Instead of the `-a` flag, you can pass in a list of packages separated by commas.

```
./tools/package-release/bin/dev prepare -a
```

When making an initial release for a new package, pass the `--initialRelease` flag to signify a new release for a new package.

2. Create a pull request with the resulting changes and merge it.

See more about the prepare script using `./tools/package-release/bin/dev publish --help`.

### Release Packages

1. Pull down the latest commits from Github.

2. Run the release script from monorepo root, first as a dry run.

```
./tools/package-release/bin/dev publish -a --dry-run
```

3. Run the release for real this time.

```
./tools/package-release/bin/dev publish -a
```

See more about the publish script using `./tools/package-release/bin/dev publish --help`.