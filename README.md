# Catena-X Portal Frontend

Frontend web application and shared UI components for the Catena-X Portal written in React and Typescript.

* INT: https://portal.demo.catena-x.net/
* DEV: https://portal-dev.demo.catena-x.net/
* Components: https://portal.demo.catena-x.net/_storybook/


Here are three ways to run the application on your machine on http://localhost:3000/

### Local build & run

    yarn
    yarn build
    yarn start


### Local docker build & run & publish

    yarn build:docker
    yarn publish:docker
    yarn start:docker


### Running the image from GitHub container registry

    export IMAGE=ghcr.io/catenax-ng/product-portal-frontend:main
    docker pull $IMAGE
    docker run --rm -d -p 3000:8080 --name cx-portal $IMAGE

