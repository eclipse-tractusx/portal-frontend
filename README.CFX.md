# Portal Frontend - Cofinity-X Readme

Readme information specific to Cofinity-X repositories.

## Package Registry

To access Cofinity-X packages hosted on GitHub, please configure a GitHub access token.

1. Create Token via [GitHub Tokens](https://github.com/settings/tokens) page. Following roles are required:
   - read:org
   - read:packages
2. Configure npm to use token for **@cofinity-x/shared-components** package. Options:
   1.Option: Run the following command to configure registry:

   ```Bash
   npm login --scope=@cofinity-x --auth-type=legacy --registry=<https://npm.pkg.github.com>
   ```

   - username = your github user name
   - password = your github personal access token (load spinner is confusing here)

     2.Option: Create global ~/.npmrc file with the following content:

   ```text
      @cofinity-x:registry=https://npm.pkg.github.com/
      //npm.pkg.github.com/:_authToken=***
   ```

   Replace \*\*\* with your GitHub personal access token
