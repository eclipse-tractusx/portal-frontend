# product-portal-frontend

Catena-X frontend webapp and components

steps

	# install dependencies
	yarn

	# build component library and storybook
	cd cx-portal-shared-components
	yarn build:lib
	yarn build-storybook

	# build portal
	cd cx-portal
	yarn build
	yarn dist
	yarn deploy

	# formatting and testing
	yarn pretty
	yarn test
	yarn lint --fix

	# running a local webserver
	yarn start
	open http://localhost:3000/

