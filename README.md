[![LeadingRepository](https://img.shields.io/badge/Leading_Repository-Portal-blue)](https://github.com/eclipse-tractusx/portal)

# Portal Frontend

This repository contains the frontend code for the Portal written in React and Typescript.

The Portal application consists of

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
- [portal-shared-components](https://github.com/eclipse-tractusx/portal-shared-components),
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

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

## Notice for Docker image

This application provides container images for demonstration purposes.

See [Docker notice](.conf/notice-portal.md) for more information.

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
