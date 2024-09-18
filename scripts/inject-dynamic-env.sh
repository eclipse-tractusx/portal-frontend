#!/bin/bash

###############################################################
# Copyright (c) 2022 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
###############################################################

# Define custom variable
custom_env_vars='{REQUIRE_HTTPS_URL_PATTERN:"'$REQUIRE_HTTPS_URL_PATTERN'",PORTAL_ASSETS_URL:"'$PORTAL_ASSETS_URL'",PORTAL_BACKEND_URL:"'$PORTAL_BACKEND_URL'",CENTRALIDP_URL:"'$CENTRALIDP_URL'",SSI_CREDENTIAL_URL:"'$SSI_CREDENTIAL_URL'",BPDM_POOL_API_URL:"'$BPDM_POOL_API_URL'",BPDM_GATE_API_URL:"'$BPDM_GATE_API_URL'",SEMANTICS_URL:"'$SEMANTICS_URL'",MANAGED_IDENTITY_WALLETS_NEW_URL:"'$MANAGED_IDENTITY_WALLETS_NEW_URL'",REALM:"'$REALM'",CLIENT_ID:"'$CLIENT_ID'",CLIENT_ID_REGISTRATION:"'$CLIENT_ID_REGISTRATION'",CLIENT_ID_SEMANTIC:"'$CLIENT_ID_SEMANTIC'",CLIENT_ID_BPDM:"'$CLIENT_ID_BPDM'",CLIENT_ID_MIW:"'$CLIENT_ID_MIW'",CLIENT_ID_SSI_CREDENTIAL:"'$CLIENT_ID_SSI_CREDENTIAL'"}'
# Define anchor variable
custom_env_vars_anchor='{REQUIRE_HTTPS_URL_PATTERN:"true",PORTAL_ASSETS_URL:"http://localhost:3000/assets",PORTAL_BACKEND_URL:"https://portal-backend.example.org",CENTRALIDP_URL:"https://centralidp.example.org/auth",SSI_CREDENTIAL_URL:"https://ssi-credential-issuer.example.org",BPDM_POOL_API_URL:"https://business-partners.example.org/pool/v6",BPDM_GATE_API_URL:"https://business-partners.example.org/companies/test-company/v6",SEMANTICS_URL:"https://semantics.example.org",MANAGED_IDENTITY_WALLETS_NEW_URL:"https://managed-identity-wallets-new.example.org",REALM:"CX-Central",CLIENT_ID:"Cl2-CX-Portal",CLIENT_ID_REGISTRATION:"Cl1-CX-Registration",CLIENT_ID_SEMANTIC:"Cl3-CX-Semantic",CLIENT_ID_BPDM:"Cl7-CX-BPDM",CLIENT_ID_MIW:"Cl5-CX-Custodian",CLIENT_ID_SSI_CREDENTIAL:"Cl24-CX-SSI-CredentialIssuer"}'
# Read content of the reference index.html file into the index_html_reference variable
index_html_reference=`cat /usr/share/nginx/html/index.html.reference`
# Replace the anchor variable with the custom variable in the index.html file 
index_html=${index_html_reference//$custom_env_vars_anchor/$custom_env_vars}
# Write the modified index.html to tmp (to enable readOnlyRootFilesystem)
echo "$index_html" > /tmp/index.html
