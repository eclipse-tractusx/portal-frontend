# Catena-X Portal Frontend

This repository contains the frontend code for the Catena-X Portal written in React and Typescript.

The Catena-X Portal application consists of

- [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
- [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
- [portal-shared-components](https://github.com/eclipse-tractusx/portal-shared-components),
- [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
- [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat) The helm chart for installing the Catena-X Portal is available in the [portal](https://github.com/eclipse-tractusx/portal) repository.

The Catena-X Portal is designed to work with the [Catena-X IAM](https://github.com/eclipse-tractusx/portal-iam).

## Run locally

Here are three ways to run the application locally on http://localhost:3001/

Note: if you'd like to run the complete frontend application, follow the 'Run frontend on localhost' guide available within the developer documentation of [portal-assets](https://github.com/eclipse-tractusx/portal-assets).

### Local build & run

    yarn
    yarn build
    yarn start

### Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker

### Running the image from GitHub container registry

    export IMAGE=tractusx/portal-frontend:latest
    docker pull $IMAGE
    docker run --rm -d -p 3001:8080 --name cx-portal-frontend $IMAGE

## Notice for Docker image

This application provides container images for demonstration purposes.

DockerHub: https://hub.docker.com/r/tractusx/portal-frontend

Base image: nginxinc/nginx-unprivileged:alpine

- Dockerfile: [nginxinc/nginx-unprivileged:alpine](https://github.com/nginxinc/docker-nginx-unprivileged/blob/main/Dockerfile-alpine.template)
- GitHub project: [https://github.com/nginxinc/docker-nginx-unprivileged](https://github.com/nginxinc/docker-nginx-unprivileged)
- DockerHub: [https://hub.docker.com/r/nginxinc/nginx-unprivileged](https://hub.docker.com/r/nginxinc/nginx-unprivileged)

## License

Distributed under the Apache 2.0 License.
See [LICENSE](./LICENSE) for more information.
