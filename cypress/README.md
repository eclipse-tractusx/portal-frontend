# Running Cypress Locally and Updating Environment Variables

This document provides step-by-step instructions for running Cypress tests locally, updating environment variables, and executing the `cy:open` script.

## Steps to Run Cypress Locally

### 1. Install Dependencies

First, install all necessary dependencies for the project:

```bash
yarn install
```

### 2. Update Environment Variables

To update environment variables in the `cypress.config` file:

1. Open the `cypress.config.ts` file in your preferred code editor.
2. Locate the `env` property or the section where environment variables are defined.
3. Add or update the necessary environment variables.
4. Save the file.

### 3. Execute the Cypress Open Command

To open the Cypress Test Runner, use the following command:

```bash
yarn cy:open
```

This command will launch the Cypress Test Runner UI, where you can select and run individual test files.

### 4. Running Specific Tests

Within the Cypress Test Runner:

1. Select the desired testing browser (e.g., Chrome, Electron).
2. Click on the specific test file to execute it.

## Troubleshooting

- For any issues with environment variables:
  - Confirm the variables are properly defined in the `env` section of `cypress.config`.
  - Use `Cypress.env('VARIABLE_NAME')` in test files to access environment variables.

## NOTICE

This work is licensed under the [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0).

- SPDX-License-Identifier: Apache-2.0
- SPDX-FileCopyrightText: 2024 Contributors to the Eclipse Foundation
- Source URL: https://github.com/eclipse-tractusx/portal-frontend
