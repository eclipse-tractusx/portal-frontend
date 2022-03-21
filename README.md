# product-portal-frontend

Catena-X frontend webapp and components

minimum steps to run on localhost

    # install dependencies and create license file
    yarn
    yarn build:licenses

    # build component library
    cd cx-portal-shared-components
    yarn build:lib

    # run portal on localhost
    cd cx-portal
    yarn start


docker build

    yarn build:docker
    yarn start:docker
    open http://localhost:3000/
    yarn publish:docker

