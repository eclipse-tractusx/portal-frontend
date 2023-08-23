#!/bin/bash

###############################################################
# Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

custom_env_vars='{PORTAL_ASSETS_URL:"'$PORTAL_ASSETS_URL'",PORTAL_BACKEND_URL:"'$PORTAL_BACKEND_URL'",CENTRALIDP_URL:"'$CENTRALIDP_URL'",BPDM_API_URL:"'$BPDM_API_URL'",SEMANTICS_URL:"'$SEMANTICS_URL'",MANAGED_IDENTITY_WALLETS_NEW_URL:"'$MANAGED_IDENTITY_WALLETS_NEW_URL'"}'
custom_env_vars_anchor='{PORTAL_ASSETS_URL:"http://localhost:3000/assets",PORTAL_BACKEND_URL:"https://portal-backend.dev.demo.catena-x.net",CENTRALIDP_URL:"https://centralidp.dev.demo.catena-x.net/auth",BPDM_API_URL:"https://business-partners.dev.demo.catena-x.net/pool/api",SEMANTICS_URL:"https://semantics.dev.demo.catena-x.net",MANAGED_IDENTITY_WALLETS_NEW_URL:"https://managed-identity-wallets-new.dev.demo.catena-x.net"}'
index_html_reference=`cat /usr/share/nginx/html/index.html.reference`
index_html=${index_html_reference//$custom_env_vars_anchor/$custom_env_vars}
echo "$index_html" > /usr/share/nginx/html/index.html
