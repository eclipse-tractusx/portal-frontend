#!/bin/bash

###############################################################
# Copyright (c) 2024 Contributors to the Eclipse Foundation
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

src_file=/usr/share/nginx/html/index.html.reference
tgt_file=/tmp/index.html
# base sed command: output source file and remove javascript comments
sed_cmd="cat ${src_file} | sed -e \"s/^\\\s*\/\/.*//g\""

declare -a vars=(
  "REQUIRE_HTTPS_URL_PATTERN"
  "CENTRALIDP_URL"
  "PORTAL_ASSETS_URL"
  "PORTAL_BACKEND_URL"
  "SEMANTICS_URL"
  "BPDM_GATE_API_URL"
  "BPDM_POOL_API_URL"
  "SSI_CREDENTIAL_URL"
  "MANAGED_IDENTITY_WALLETS_NEW_URL"
  "REALM"
  "CLIENT_ID"
  "CLIENT_ID_REGISTRATION"
  "CLIENT_ID_SEMANTIC"
  "CLIENT_ID_BPDM"
  "CLIENT_ID_MIW"
  "CLIENT_ID_SSI_CREDENTIAL"
)

for var in "${vars[@]}"
do
  # add a replace expression for each variable
  sed_cmd="${sed_cmd} -e \"s/${var}:\s*\\\".*\\\"/${var}: \\\"\${${var}}\\\"/g\""
done

echo ${sed_cmd} | bash > ${tgt_file}
