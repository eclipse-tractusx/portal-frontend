[![LeadingRepository](https://img.shields.io/badge/Leading_Repository-Portal-blue)](https://github.com/eclipse-tractusx/portal)

# Portal Frontend

This repository contains the frontend code for the Portal written in React and Typescript.

The Portal application consists of

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

The Portal maintains and uses the [portal-shared-components library](https://github.com/eclipse-tractusx/portal-shared-components).

The helm chart for installing the Portal is available in the [portal](https://github.com/eclipse-tractusx/portal) repository.

Please refer to the `docs` directory of the [portal-assets](https://github.com/eclipse-tractusx/portal-assets) repository for the overarching user and developer documentation of the Portal application.

The Portal is designed to work with the [IAM](https://github.com/eclipse-tractusx/portal-iam).

## Local build and run

Steps for running the application on your machine on http://localhost:3001/

1. Install dependencies

```
yarn
```

2. Build

```
yarn build
```

3. Run

```
yarn start
```

Note: if you'd like to run the complete frontend application, follow the `Run frontend on localhost.md` guide available within the technical documentation of [portal-assets](https://github.com/eclipse-tractusx/portal-assets).

## Coding guidelines

### Naming conventions for custom components

Folder, File and component name to be in Camel Case\
Scss files to be in Camel Case\
RTK folders and files to be in small case

### Import Components

Always use components from [portal-shared-components library](https://github.com/eclipse-tractusx/portal-shared-components)\
Do not import components directly from mui

### Allowed imports from mui

Box, useMediaQuery

### Guidelines for consistent styling and theming

Do not use useTheme from mui\
Use theme from the [portal-shared-components library](https://github.com/eclipse-tractusx/portal-shared-components)\
Use custom class names to override default or mui styles\
Use appropriate `Typography` for the text and do not override font family of it

### Create new text locale file

Create a new file in the respective `language` folder with the module name in `assets/locales`\
Use small cases for the `json` file\

ex: notifications.json

### Add new text values in locale file

Keys inside `json` file should be in Camel Case\

ex: notificationTitle

### Read text values from locale file

Import `useTranslation` from `react-i18next`\
Declare translation object using the specific module\

```
const { t } = useTranslation('notification')
```

Empty in the usetransation() will pull the data from `main.json` file

```
const { t } = useTranslation()
```

Usage ex:

```
t('header.title')
```

### Code formatting and linting

Before committing your changes,

s1. Remove all the disabled linter rules from `.eslintrc.json` and run `yarn lint` on your newly created file or folder to see the results 2. Disable linter rules is allowd only for the exceptional cases. Code comments with proper reason is mandatory

### Handling of API responses and error states

1. All the api call has to be addressed with a throbber in the UI
2. Empty response to be shown with a proper message to the user
3. API error has to be shown in a component with appropriate action\
   a. Error code 4xx needs to show error component with message\
   b. Error code 5xx should allow user to refetch the api once again.

### State Managment

URL path names to be in Camel Case

## Known Issues and Limitations

See [Known Knowns](/CHANGELOG.md#known-knowns).

## Notice for Docker image

This application provides container images for demonstration purposes.

See [Docker notice](.conf/docker-notice-portal.md) for more information.

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
