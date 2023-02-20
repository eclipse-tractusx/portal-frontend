# Catena-X Portal Frontend

This repository contains the frontend code and shared UI components for the Catena-X Portal written in React and Typescript.

* INT: https://portal.int.demo.catena-x.net/
* DEV: https://portal.dev.demo.catena-x.net/
* Components: https://portal.dev.demo.catena-x.net/_storybook/

The Catena-X Portal application consists of

* [portal-frontend](https://github.com/eclipse-tractusx/portal-frontend),
* [portal-frontend-registration](https://github.com/eclipse-tractusx/portal-frontend-registration),
* [portal-assets](https://github.com/eclipse-tractusx/portal-assets) and
* [portal-backend](https://github.com/eclipse-tractusx/portal-backend).

![Tag](https://img.shields.io/static/v1?label=&message=LeadingRepository&color=green&style=flat) The helm chart for installing the Catena-X Portal is available in [portal-cd](https://github.com/eclipse-tractusx/portal-cd).

The Catena-X Portal is designed to work with the [Catena-X IAM](https://github.com/eclipse-tractusx/portal-iam).

## Local build & run

Here are three ways to run the application locally on http://localhost:3000/

    yarn
    yarn build
    yarn start

## Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker

## Running the image from GitHub container registry

    export IMAGE=ghcr.io/catenax-ng/tx-portal-frontend:latest
    docker pull $IMAGE
    docker run --rm -d -p 3000:8080 --name cx-portal $IMAGE
