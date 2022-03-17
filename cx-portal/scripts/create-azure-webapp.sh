#!/bin/bash
#
# will create a new webapp for cx portal development.
# workaround because BMW web filter seems to block the site after a while.
#
export CX_ENV=${CX_ENV:-dev003}
portal-current-version() {
  az webapp list --query "[].name" -o table \
    | grep app-portal- \
    | cut -d'-' -f5 \
    | sort -V \
    | tail -1
}
export CX_PORTAL_CURRENT_VERSION=$(portal-current-version)
export CX_PORTAL_NEXT_VERSION=${1:-$((CX_PORTAL_CURRENT_VERSION+1))}
#export VERSION=${NEXT_VERSION}}
echo az webapp up \
  --resource-group catenax-${CX_ENV}-rg \
  --name catenax-${CX_ENV}-app-portal-${CX_PORTAL_NEXT_VERSION} \
  --plan ASP-catenax-${CX_ENV}-app-onboarding-aa9d \
  --sku S1 \
  --os-type Windows \
  --runtime "node|14-lts"
