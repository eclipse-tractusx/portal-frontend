#!/bin/bash

export FRONTEND=catenax-ng/product-portal-frontend
export VERSION=$(cat package.json | jq -r .version)

ghcr-token() {
    IMAGE=${1:-$FRONTEND}
    curl -s https://ghcr.io/token\?scope\="repository:$IMAGE:pull" \
        | jq -r .token
}

export GHCR_TOKEN=$(ghcr-token)

ghcr-tags() {
    IMAGE=${1:-$FRONTEND}
    curl -s \
        -H "Authorization: Bearer $GHCR_TOKEN" \
        https://ghcr.io/v2/$IMAGE/tags/list
}

cx-docker-login() {
    echo '''
    az login
    export ACR_TOKEN=$(az acr login --name $ACR --expose-token --output tsv --query accessToken)
    echo $ACR_TOKEN | docker login $ACR.azurecr.io --username 00000000-0000-0000-0000-000000000000 --password-stdin
    echo $ACR_TOKEN | helm registry login $ACR.azurecr.io --username 00000000-0000-0000-0000-000000000000 --password-stdin
    '''
}

cx-docker-build() {
    docker build -t $IMAGE \
        --build-arg \"http_proxy=${http_proxy}\" \
        --build-arg \"https_proxy=${https_proxy}\" \
        --build-arg \"no_proxy=${no_proxy}\" .
    docker tag $IMAGE':latest' $IMAGE:$VERSION
}

cx-docker-publish() {
    docker push $IMAGE':latest'
    docker push $IMAGE:$VERSION
}

cx-docker-run() {
    docker run --rm -d -p 3000:8080 --name cx-portal $IMAGE
}

cx-acr-list() {
    az acr repository list --name $ACR
}

cx-acr-tags() {
    REPO=${1:-$FRONTEND}
    az acr repository show-tags --repository $REPO --name $ACR
}

cx-docker-dev() {
	docker run \
		-it \
		--rm \
		--name node \
		-p 3000:3000 \
		-v $(pwd):/portal \
		-e "http_proxy=$http_proxy" \
		-e "https_proxy=$https_proxy" \
		-e "no_proxy=$no_proxy" \
		node bash
}
