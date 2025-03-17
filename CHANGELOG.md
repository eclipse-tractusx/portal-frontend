# Changelog

## 2.4.0

### Feature

- **Unsubscribe overlay**
  - updated the legal disclaimer text as well as copywriting and design as per UX requirements [#1498](https://github.com/eclipse-tractusx/portal-frontend/pull/1498)
- **Technical User Management**
  - updated technical user management to reflect the latest changes regarding technical integration roles [#1495](https://github.com/eclipse-tractusx/portal-frontend/pull/1495)
- **Technical Integration**
  - improved the technical user profile setup of apps/services https://github.com/eclipse-tractusx/portal-frontend/pull/1475
  - added a visibility icon to the technical user profile selection [#1467](https://github.com/eclipse-tractusx/portal-frontend/pull/1467)
- **Service Release**:
  - introduced a filter for "in-review" status on the service overview page [#1218](https://github.com/eclipse-tractusx/portal-frontend/pull/1218)
- **Company Roles**
  - introduced a company service to enforce page access based on the available company roles in the API response [#1361](https://github.com/eclipse-tractusx/portal-frontend/pull/1361)
- **File Upload**:
  - increased the size limit for uploaded documents to 5 MB [#1187](https://github.com/eclipse-tractusx/portal-frontend/pull/1187)
- **Service Marketplace**
  - allowed special characters and digits in the search services field [#1242](https://github.com/eclipse-tractusx/portal-frontend/pull/1242)
- **Locales**
  - removed unused translations from locale files and added missing translations [#1421](https://github.com/eclipse-tractusx/portal-frontend/pull/1421)
  - improved the copywriting on the partner network page [#1433](https://github.com/eclipse-tractusx/portal-frontend/pull/1433)
- **App & Service Release Process**:
  - enabled resuming to the last edited page during the App/Service release process [#1376](https://github.com/eclipse-tractusx/portal-frontend/pull/1376)

### Bugfixes

- **Technical Integration**
  - enhanced user visibility experience [#1464](https://github.com/eclipse-tractusx/portal-frontend/pull/1464)
  - fixed the checkbox select/deselect issue for internal roles [#1480](https://github.com/eclipse-tractusx/portal-frontend/pull/1480)
  - added a visibility icon to the internal/external section [#1485](https://github.com/eclipse-tractusx/portal-frontend/pull/1485)
  - aligned text and icons vertically and horizontally to the center [#1489](https://github.com/eclipse-tractusx/portal-frontend/pull/1489)
  - updated the technical user info component in the app/service details page, accessible from the marketplace section [#1493](https://github.com/eclipse-tractusx/portal-frontend/pull/1493)
  - fixed the validation of the continue button to enable/disable correctly while adding a technical user profile. [#1513](https://github.com/eclipse-tractusx/portal-frontend/pull/1513)
  - enabled multiple technical user creation in the technical integration step of the app and service release process [#1441](https://github.com/eclipse-tractusx/portal-frontend/pull/1441)
- **App Details Overlay**
  - fixed an issue where the app agreement data API was being called with an empty ID. If the prop value passed to the component is empty, user app info is now used to retrieve the ID. [#1490](https://github.com/eclipse-tractusx/portal-frontend/pull/1490)
- **Partner Network**
  - disabled the search feature execution for empty strings [#1507](https://github.com/eclipse-tractusx/portal-frontend/pull/1507)
- **Company Data**
  - added a check for the sharing state data to resolve the empty page issue [#1511](https://github.com/eclipse-tractusx/portal-frontend/pull/1511)
  - fixed the display of error messages in the company data edit overlay screen [#1385](https://github.com/eclipse-tractusx/portal-frontend/pull/1385)
- **Service overview**:
  - fixed the service details page to correctly display technical user setup [#1508](https://github.com/eclipse-tractusx/portal-frontend/pull/1508)
- **Identity Provider Configuration**:
  - fixed the display of full names with tooltips on hover and updated validation for "Display Name" as per API response [#1502](https://github.com/eclipse-tractusx/portal-frontend/pull/1502)
- **Registration process**
  - addressed error handling in the company service initialization method to prevent blank screen issues [#1492](https://github.com/eclipse-tractusx/portal-frontend/pull/1492)
- **App Release process**:
  - fixed an unexpected redirection to the last page after uploading app roles [#1515](https://github.com/eclipse-tractusx/portal-frontend/pull/1515)
  - fixed wrong api calling to download documents [#1386](https://github.com/eclipse-tractusx/portal-frontend/pull/1386)
- **Company Wallet**
  - enabled (Company, Business, and IT Admin roles) to revoke their own company credentials [#1522](https://github.com/eclipse-tractusx/portal-frontend/pull/1522)
- **Company Subscriptions**:
  - fixed company subscriptions filter search functionality [#1523](https://github.com/eclipse-tractusx/portal-frontend/pull/1523)
- **User Management**
  - prevented admins from proceeding further without user [#1270](https://github.com/eclipse-tractusx/portal-frontend/pull/1270)
  - remove non portal roles from user list [#1392](https://github.com/eclipse-tractusx/portal-frontend/pull/1392)
- **Service Marketplace**:
  - added providerUri in the provider details page [#1327](https://github.com/eclipse-tractusx/portal-frontend/issues/1267)
  - fixed service filtering for DE language [#1209](https://github.com/eclipse-tractusx/portal-frontend/pull/1209)
  - fixed filters when the language is set to german and also updated german translation for `Dataspace Services` [#1531](https://github.com/eclipse-tractusx/portal-frontend/pull/1531)
- **Consent OSP**
  - added missing identifier field in the OSP consent form is the company details information [#1325](https://github.com/eclipse-tractusx/portal-frontend/pull/1325)
- **Certificate Credentials**
  - text message not shown when no data is available [#1333](https://github.com/eclipse-tractusx/portal-frontend/pull/1333)
- **Onboarding Service Provider**
  - added missing short name field osp consent form [#1341](https://github.com/eclipse-tractusx/portal-frontend/pull/1341)
- **App Marketplace**
  - fixed updating of favorites in app marketplace [#1345](https://github.com/eclipse-tractusx/portal-frontend/pull/1345)
  - fixed truncated images in the "My Favorites" section [#1396](https://github.com/eclipse-tractusx/portal-frontend/pull/1396)
  - fixed translations for the App Overview "Behavior Twin" category view [#1527](https://github.com/eclipse-tractusx/portal-frontend/pull/1527)
- **IdP Management**
  - fixed shared IdP to remove 'configure' option as its not viable [#1356](https://github.com/eclipse-tractusx/portal-frontend/pull/1356)
  - fixed IdP table status filter to sort by alphabetical order [#1443](https://github.com/eclipse-tractusx/portal-frontend/pull/1443)
  - added hint for invalid input of display name [#1264](https://github.com/eclipse-tractusx/portal-frontend/issues/1264)
- **Connector Management**
  - fixed URL update in connector details [#1373](https://github.com/eclipse-tractusx/portal-frontend/pull/1373)
  - fixed confirm button is enabled mandatory fields not being entered [#1389](https://github.com/eclipse-tractusx/portal-frontend/pull/1389)
  - fixed table connector URL update after updating and closing the overlay [#1420](https://github.com/eclipse-tractusx/portal-frontend/pull/1420)
  - fixed connector URL alignment in connector management page [#1461](https://github.com/eclipse-tractusx/portal-frontend/pull/1461)
- **User Management Details**
  - fixed truncated chip button issue in the app permissions section [#1372](https://github.com/eclipse-tractusx/portal-frontend/pull/1372)
- **App & Service Subscription**:
  - fixed the status is showing incorrect [#1402](https://github.com/eclipse-tractusx/portal-frontend/pull/1402)
  - fixed closing of overlay on click of close icon [#1413](https://github.com/eclipse-tractusx/portal-frontend/pull/1413)
  - remove search string on clean search method [#1293](https://github.com/eclipse-tractusx/portal-frontend/pull/1293)
- **Service Release Process**:
  - fixed wrong api calling to download documents for all steps [#1384](https://github.com/eclipse-tractusx/portal-frontend/pull/1384)
- **App Access Management**
  - added support to fetch German language translation from CSV file template for app User role [#1288](https://github.com/eclipse-tractusx/portal-frontend/issues/1288)
- **Technical User**
  - introduced masking for sensitive information in technical user detail section [#1399](https://github.com/eclipse-tractusx/portal-frontend/issues/1399)
  - enhance user experience by providing table and overlay in add technical user flow. list current users in the table. allow user to edit the list in an overlay implementation [#1401](https://github.com/eclipse-tractusx/portal-frontend/pull/1401)
- **React**
  - fixed DOM nesting issues [#1435](https://github.com/eclipse-tractusx/portal-frontend/pull/1435)
  - removed React warnings [#1434](https://github.com/eclipse-tractusx/portal-frontend/pull/1434)
- **Credential Management**
  - disabled the document download button for unavailable documents [#1439](https://github.com/eclipse-tractusx/portal-frontend/pull/1439)

### Technical Support

- **Refactoring**
  - renamed files to common naming style [#1339](https://github.com/eclipse-tractusx/portal-frontend/pull/1339)
  - renamed files in src/components directory to common naming style [#1351](https://github.com/eclipse-tractusx/portal-frontend/pull/1351)
  - removed customised logic to check company role info in osp page and header component. use company role check in config file to allow user to navigate to osp page[#1390](https://github.com/eclipse-tractusx/portal-frontend/pull/1390)
- **Cypress E2E Tests**
  - added cypress setup [#1357](https://github.com/eclipse-tractusx/portal-frontend/pull/1357)
- **Dependencies**
  - updated app dependencies [#1308](https://github.com/eclipse-tractusx/portal-frontend/pull/1308), [#1307](https://github.com/eclipse-tractusx/portal-frontend/pull/1307), [#1362](https://github.com/eclipse-tractusx/portal-frontend/pull/1362), [#1416](https://github.com/eclipse-tractusx/portal-frontend/pull/1416), [#1424](https://github.com/eclipse-tractusx/portal-frontend/pull/1424), [#1405](https://github.com/eclipse-tractusx/portal-frontend/pull/1405), [#1437](https://github.com/eclipse-tractusx/portal-frontend/pull/1437)
  - updated axios dependency [#372](https://github.com/eclipse-tractusx/portal-frontend/pull/1536)
  - upgraded portal-shared-components to 3.7.6 [#1476](https://github.com/eclipse-tractusx/portal-frontend/pull/1476)

## 2.3.0

### Feature

- **Customer Detail Data Overlay**
  - implemented new UI design for customer detail data overlay [#976](https://github.com/eclipse-tractusx/portal-frontend/pull/976)
- **Company Subscription Management**
  - extended the subscription detail page for customer to include more app-related information [#1051](https://github.com/eclipse-tractusx/portal-frontend/pull/1051)
- **Business Partner Invitation**
  - allowed longer company names [#1007](https://github.com/eclipse-tractusx/portal-frontend/pull/1007)
- **App Subscription**
  - added external service detail in subscription management detail overlay [#1028](https://github.com/eclipse-tractusx/portal-frontend/pull/1028)
- **Technical User Management**
  - enhanced technical user details [#1030](https://github.com/eclipse-tractusx/portal-frontend/pull/1030), [#1093](https://github.com/eclipse-tractusx/portal-frontend/pull/1093)
  - added user type column to technical user management list [#1090](https://github.com/eclipse-tractusx/portal-frontend/pull/1090)
- **Clearinghouse Self-Description**
  - added admin UI for managing SD Document retriggering [#1141](https://github.com/eclipse-tractusx/portal-frontend/pull/1141)

### Change

- **Roles and Permissions**
  - enabled more fine grained permission checks by client id and roles [#873](https://github.com/eclipse-tractusx/portal-frontend/pull/873)
- **App Subscription**
  - removed subscribe_service requirement for app subscription [#1013](https://github.com/eclipse-tractusx/portal-frontend/pull/1013)
  - changed enum value to start app activation [#1013](https://github.com/eclipse-tractusx/portal-frontend/pull/1013)
- **App & Service Subscription Management**
  - updated search place holder text - showing only available offer names at the top - and implemented hover information on the status icon of service subscription [#1130](https://github.com/eclipse-tractusx/portal-frontend/pull/1130)
- **Service Subscriptions**
  - renamed 'Configure' button to 'Activate' button [#1344](https://github.com/eclipse-tractusx/portal-frontend/pull/1344)
- **Company Subscriptions**
  - updated and bound API with filter options [#1062](https://github.com/eclipse-tractusx/portal-frontend/pull/1062)
  - added a tabular section to show up both app and service subscription data [#1101](https://github.com/eclipse-tractusx/portal-frontend/pull/1101)
  - update API query parameters and fix tab UI scroll [#1131](https://github.com/eclipse-tractusx/portal-frontend/pull/1131)
- **User Management**
  - blocked user from removing own admin roles [#987](https://github.com/eclipse-tractusx/portal-frontend/pull/987)
- **Technical User Management**
  - enhanced UI of technical user management creation page [#1322](https://github.com/eclipse-tractusx/portal-frontend/pull/1322)
  - enhanced technical user management creation page by role type [#1303](https://github.com/eclipse-tractusx/portal-frontend/pull/1303)
- **Technical User Details**
  - updated technical user details with user type and service endpoint fields. Also, updated copy icon color for better view and made copy icon available only when value is available [#1137](https://github.com/eclipse-tractusx/portal-frontend/pull/1137)
- **Company Data**
  - re-enabled CSV upload [#1144](https://github.com/eclipse-tractusx/portal-frontend/pull/1144)
  - reverted manual intervention with ready state api [#1144](https://github.com/eclipse-tractusx/portal-frontend/pull/1144)
- **Onboarding Service Provider**
  - enhanced permission and company role validation for Onboarding Service Provider [#1176](https://github.com/eclipse-tractusx/portal-frontend/pull/1176)
  - removed "User List" from table header, added search to onboarding service provider management table, adjusted design to be identical with customer overview table and fixed action 'disable/enable' status not being updated issue [#1132](https://github.com/eclipse-tractusx/portal-frontend/pull/1132)
  - removed deprecated page onboardingServiceProvider and every related link [#1261](https://github.com/eclipse-tractusx/portal-frontend/pull/1261)
- **Business Partner Invitation**
  - enabled support for all language characters for company names [#1189](https://github.com/eclipse-tractusx/portal-frontend/pull/1189)
- **Application Request**
  - aligned endurl mapping keys with backend for retriggerable processes [#1268](https://github.com/eclipse-tractusx/portal-frontend/pull/1268)
- **CX-Operator Application**
  - enabled to not show overlay for submitted application to CX-Operator [#1204](https://github.com/eclipse-tractusx/portal-frontend/pull/1204)
- **Clearinghouse Self-Description**
  - enhanced admin UI for managing SD document retriggering [#1292](https://github.com/eclipse-tractusx/portal-frontend/pull/1292)
- **Keycloak**
  - upgraded keycloak-js library to version 25 to align with Keycloak server version [#1262](https://github.com/eclipse-tractusx/portal-frontend/pull/1262)
- **Header**
  - moved company roles into enum [#1213](https://github.com/eclipse-tractusx/portal-frontend/pull/1213)

### Technical Support

- **Injection of environment variables to Docker image**
  - refactored to a more readable and typo resistant implementation using sh - bash and jq are no longer required in image [#914](https://github.com/eclipse-tractusx/portal-frontend/pull/914)
- **Notifications**
  - harmonized notification translation keys with constants [#1192](https://github.com/eclipse-tractusx/portal-frontend/pull/1192)
- **Dependencies**
  - upgraded app dependencies [#1181](https://github.com/eclipse-tractusx/portal-frontend/pull/1181)
  - upgraded shared components [#1316](https://github.com/eclipse-tractusx/portal-frontend/pull/1316)

### Bugfixes

- **Identity Provider Management**
  - fixed statusTag color in status column [#978](https://github.com/eclipse-tractusx/portal-frontend/pull/978)
  - fixed IDP management page title and description [#1086](https://github.com/eclipse-tractusx/portal-frontend/pull/1086)
- **Connector Management**
  - fixed technical user selection [#1085](https://github.com/eclipse-tractusx/portal-frontend/issues/1085)
  - updated inconsistent wording during connector deletion [#1098](https://github.com/eclipse-tractusx/portal-frontend/pull/1098)
  - updated SD document download API to fix downloading SD document issue [#1038](https://github.com/eclipse-tractusx/portal-frontend/pull/1038)
  - fixed overlay enabling on click of managed connectors(details) [#1142](https://github.com/eclipse-tractusx/portal-frontend/pull/1142)
  - fixed customer link selection and fixed resetting values [#1119](https://github.com/eclipse-tractusx/portal-frontend/pull/1119)
  - changed to not showing regular overlay when error detail is shown; refetch connector details to fix cache issue in the details overlay [#1251](https://github.com/eclipse-tractusx/portal-frontend/pull/1251)
  - updated tooltip and placeholder text [#1315](https://github.com/eclipse-tractusx/portal-frontend/pull/1315)
  - fixed editing URL error message [#1314](https://github.com/eclipse-tractusx/portal-frontend/pull/1314)
- **Partner Network**
  - changed role to access page [#1234](https://github.com/eclipse-tractusx/portal-frontend/pull/1234)
- **Company Data**
  - fixed empty sharing state response issue; update the condition to handle the same [#1300](https://github.com/eclipse-tractusx/portal-frontend/pull/1300)
- **Application Requests**
  - fixed 'activeTab' conditions to load data for Tab-2(Registration Process) [#1050](https://github.com/eclipse-tractusx/portal-frontend/pull/1050)
  - fixed retrigger for DIM wallet creation [#997](https://github.com/eclipse-tractusx/portal-frontend/issues/997)
  - fixed documents not getting displayed [#1223](https://github.com/eclipse-tractusx/portal-frontend/pull/1223)
  - added separate endpoints for downloading company credential document and registration document [#1229](https://github.com/eclipse-tractusx/portal-frontend/pull/1229)
- **Technical User Management**
  - enabled displaying of appropriate error message [#1069](https://github.com/eclipse-tractusx/portal-frontend/pull/1069)
  - fixed closing page notification bar issue [#1069](https://github.com/eclipse-tractusx/portal-frontend/pull/1069)
  - displayed technicalUserManagement button based on role validation [#1073](https://github.com/eclipse-tractusx/portal-frontend/pull/1073)
  - fixed error message scenario post technical user deletion action [#1164](https://github.com/eclipse-tractusx/portal-frontend/pull/1164)
  - fixed user type column to display data from API [#1253](https://github.com/eclipse-tractusx/portal-frontend/pull/1253)
- **Technical User Details**
  - added notification on copy action [#1188](https://github.com/eclipse-tractusx/portal-frontend/issues/1188)
- **Technical User Table**
  - prevent overlap between text and sort icon [#1160](https://github.com/eclipse-tractusx/portal-frontend/issues/1160)
- **Onboarding Service Provider**
  - displayed invited company name in OSP consent form (previously hard coded with 'BMW') [#1083](https://github.com/eclipse-tractusx/portal-frontend/pull/1083)
  - fixed missing street number in form [#1081](https://github.com/eclipse-tractusx/portal-frontend/issues/1081)
  - filtered out roles not defined by OSP [#1114](https://github.com/eclipse-tractusx/portal-frontend/pull/1114)
  - fixed OSP consent form 400 submission error [#1102](https://github.com/eclipse-tractusx/portal-frontend/pull/1102/files)
  - fixed blank page issue in customer overview tab [#1232](https://github.com/eclipse-tractusx/portal-frontend/pull/1232)
  - fixed hardcoded OSP callback url [#1201](https://github.com/eclipse-tractusx/portal-frontend/pull/1201)
  - added new field of auth URL in IdP config creation [#1280](https://github.com/eclipse-tractusx/portal-frontend/pull/1280)
- **User Management**
  - fixed displaying of user management navigation button based on role validation [#1073](https://github.com/eclipse-tractusx/portal-frontend/pull/1073)
  - fixed special characters in user management email filters [#1128](https://github.com/eclipse-tractusx/portal-frontend/issues/1128)
  - allowed user to scroll horizontally in roles column to view all the added information in user table [#1260](https://github.com/eclipse-tractusx/portal-frontend/pull/1260)
- **Use Case participation**
  - removed use cases without verified credentials from the "Use Case Participation" list [#1088](https://github.com/eclipse-tractusx/portal-frontend/pull/1088)
  - fixed columns alignment UI issue [#1247](https://github.com/eclipse-tractusx/portal-frontend/pull/1247)
- **App Release Process**:
  - fixed role upload not work using Firefox [#1003](https://github.com/eclipse-tractusx/portal-frontend/pull/1003)
  - fixed "None" selection issue in technical integration [#1036](https://github.com/eclipse-tractusx/portal-frontend/issues/1036)
  - fixed onClick of "Overview My Apps" button not working in App Release Process screen [#1023](https://github.com/eclipse-tractusx/portal-frontend/pull/1023)
  - fixed wrong api call to download documents [#1299](https://github.com/eclipse-tractusx/portal-frontend/pull/1299)
- **App Marketplace**
  - unified card design in marketplace to list view style [#1194](https://github.com/eclipse-tractusx/portal-frontend/issues/1194)
- **App Overview**
  - updated the regex for search validation for numeric and special characters [#1179] (https://github.com/eclipse-tractusx/portal-frontend/pull/1179)
  - fixed lead image preview issue [#1255](https://github.com/eclipse-tractusx/portal-frontend/pull/1255)
- **App Overview Details**
  - fixed displaying of conformity document in separate section and all other available documents in the documents section [#1235](https://github.com/eclipse-tractusx/portal-frontend/pull/1235)
- **App Details Overlay**
  - enhanced condition to view conformity documents in details overlay [#1304](https://github.com/eclipse-tractusx/portal-frontend/pull/1304)
- **App Subscription Management**
  - fixed 'read more' link by adding link [#1200](https://github.com/eclipse-tractusx/portal-frontend/pull/1200)
- **App Management**
  - fixed 400 Bad Request error due to search filter [#1057](https://github.com/eclipse-tractusx/portal-frontend/pull/1058)
  - added load more button app overview [#1009](https://github.com/eclipse-tractusx/portal-frontend/pull/1009)
- **Service Marketplace**
  - fixed displaying of all active available services [#1143](https://github.com/eclipse-tractusx/portal-frontend/issues/1143)
- **Service Management**
  - fixed 400 bad request error when clicking 'Load More' button [#1168](https://github.com/eclipse-tractusx/portal-frontend/pull/1168)
- **Service Release Process**
  - fixed back button navigation to service management instead of navigating to home page[#1038](https://github.com/eclipse-tractusx/portal-frontend/pull/1038)
  - updated description regex and validation error message to prevent only spaces in short and long description [#993](https://github.com/eclipse-tractusx/portal-frontend/pull/993), [#1043](https://github.com/eclipse-tractusx/portal-frontend/pull/1043), [#1092](https://github.com/eclipse-tractusx/portal-frontend/pull/1092)
  - added missing header image implementation in service details [#992](https://github.com/eclipse-tractusx/portal-frontend/pull/992)
  - fixed wrong api calling to download documents [#1318](https://github.com/eclipse-tractusx/portal-frontend/pull/1318)
  - fixed "None" selection issue in Technical Integration [#1212](https://github.com/eclipse-tractusx/portal-frontend/pull/1212)
- **App and Service Subscription Management**
  - updated search placeholder text [#1111](https://github.com/eclipse-tractusx/portal-frontend/pull/1111)
  - enabled displaying of only available offer names at the top [#1111](https://github.com/eclipse-tractusx/portal-frontend/pull/1111)
  - resolved blank page issue after activating service subscription request [#1005](https://github.com/eclipse-tractusx/portal-frontend/pull/1005)
  - updated the onButtonClick logic to avoid clicks after subscribed [#1042](https://github.com/eclipse-tractusx/portal-frontend/pull/1042)
  - update service subscription management page role [#1047](https://github.com/eclipse-tractusx/portal-frontend/pull/1047)
  - fixed subscription if user goes back to listing and subscribes to another app [#1095](https://github.com/eclipse-tractusx/portal-frontend/pull/1095)
  - fixed showing of all available active apps/services in the filter section [#1246](https://github.com/eclipse-tractusx/portal-frontend/pull/1246)
  - added heading in each section for the better user experience [#1246](https://github.com/eclipse-tractusx/portal-frontend/pull/1246)
  - fixed showing of all subscriptions including inactive one in the list [#1246](https://github.com/eclipse-tractusx/portal-frontend/pull/1246)
- **App and Service Admin board**
  - fixed data disappearing issue on re-clicking active tab/filter in app/service admin board [#1100](https://github.com/eclipse-tractusx/portal-frontend/pull/1100)
  - resolved service title overlap and improved responsiveness on the admin service detail page [#1112](https://github.com/eclipse-tractusx/portal-frontend/pull/1112)
  - changed app adminBoard and adminBoardDetail route [#1049](https://github.com/eclipse-tractusx/portal-frontend/pull/1049)
- **Company Subscriptions**
  - fixed incorrect data display in service company subscriptions [#1191](https://github.com/eclipse-tractusx/portal-frontend/pull/1191)
  - fixed wrong hyperlink and role requirement for technical user details in company subscription details [#1220](https://github.com/eclipse-tractusx/portal-frontend/pull/1220)
  - fixed error message scenario post technical user deletion action [#1164](https://github.com/eclipse-tractusx/portal-frontend/pull/1164)
  - fixed duplicate api records on load [#1206](https://github.com/eclipse-tractusx/portal-frontend/pull/1206), [#1207](https://github.com/eclipse-tractusx/portal-frontend/pull/1207)
  - fixed DE translation for search input in App and Service Subscription [#1211](https://github.com/eclipse-tractusx/portal-frontend/pull/1211)
- **My Company**
  - fixed text overlap issue at company roles [#1180](https://github.com/eclipse-tractusx/portal-frontend/issues/1180)
- **Notifications**
  - rename translation key from 'appsubscription' to 'appSubscription' [#1054](https://github.com/eclipse-tractusx/portal-frontend/pull/1054)
  - aligned notification page search field color with other pages [#1178](https://github.com/eclipse-tractusx/portal-frontend/issues/1178)
- **Semantic Hub**
  - fixed error on click of filters and on click on refresh icon [#1273](https://github.com/eclipse-tractusx/portal-frontend/pull/1273)
- **Hamburger Menu**
  - fixed hamburger menu to display all pages [#1240](https://github.com/eclipse-tractusx/portal-frontend/pull/1240)
- **Home Page**
  - disabled My Apps button for users without permission [#1165](https://github.com/eclipse-tractusx/portal-frontend/issues/1165)
  - fixed clicking on apps in home page URL navigation failing [#1285](https://github.com/eclipse-tractusx/portal-frontend/pull/1285)
- **File Upload**:
  - changed error text of uploaded file from Byte to MB [#866](https://github.com/eclipse-tractusx/portal-frontend/pull/1185)

### Known Knowns

- Please refer to the [list of open bugs](https://github.com/eclipse-tractusx/portal-frontend/issues?q=is%3Aopen+is%3Aissue+label%3Abug)
- Feature Support and Development for auto-setup Process Worker: there is no frontend support for the extended auto-setup process worker, specifically in terms of error handling and status transparency.
- During end-to-end testing, some minor issues and in regards to system internal notifications as well as the UI were detected.

## 2.2.0

### Change

- **Company Data Management**
  - integrated /ready api to trigger once the new record is created [#958](https://github.com/eclipse-tractusx/portal-frontend/pull/958)
  - enabled displaying of sharing state error details in the company overlay details page [#958](https://github.com/eclipse-tractusx/portal-frontend/pull/958)
- **Technical User Management**
  - removed 'Inactive' filter in technical user management [#1067](https://github.com/eclipse-tractusx/portal-frontend/pull/1067)
  - updated filters view and logic [#1087](https://github.com/eclipse-tractusx/portal-frontend/pull/1087)
- **Skipping of GX compliance service interface**
  - updated the status (skipped) in application requests and changed checkbox in connector management [#1074](https://github.com/eclipse-tractusx/portal-frontend/pull/1074)
- **Connector Management**
  - updated delete connector confirmation logic with technical user [#1076](https://github.com/eclipse-tractusx/portal-frontend/pull/1076)
- **Page headers**
  - harmonized and standardized page headers: added consistent headers and removed unused code [#864](https://github.com/eclipse-tractusx/portal-frontend/pull/864)

### Feature

- **Subscription Overlay**
  - implemented loading state for provider subscription detail overlay [#959](https://github.com/eclipse-tractusx/portal-frontend/pull/959)
- **Technical User Management**
  - enhanced technical user table by adding StatusTag to the status column [#967](https://github.com/eclipse-tractusx/portal-frontend/pull/967)
  - enhanced technical user table status column by adding new status 'pending deletion' [#967](https://github.com/eclipse-tractusx/portal-frontend/pull/967)
- **Onboarding Service Provider Management**:
  - created new page for onboarding service provider management [#1052](https://github.com/eclipse-tractusx/portal-frontend/pull/1052)
- **Company Data Management**
  - added new csv bulk upload BUT it is currently not enabled: further enhancements will follow [#1056](https://github.com/eclipse-tractusx/portal-frontend/pull/1056), [#1091](https://github.com/eclipse-tractusx/portal-frontend/pull/1091)
  - disabled confirm button if input value is not matching with the regular expression [#1056](https://github.com/eclipse-tractusx/portal-frontend/pull/1056)
- **Service Subscription**
  - updated auto setup api response data in the service subscription response overlay

### Technical Support

- fixed incorrect usage of pre-commit hook [#874](https://github.com/eclipse-tractusx/portal-frontend/pull/874)
- changed licensing and legal docs [#881](https://github.com/eclipse-tractusx/portal-frontend/pull/881)
- dev-flow: maintain latest changes in main branch [#882](https://github.com/eclipse-tractusx/portal-frontend/pull/882)
- enhanced readme file and added coding guidelines [#916](https://github.com/eclipse-tractusx/portal-frontend/pull/916)

### Bugfixes

- **Partner Network**
  - changed BPDM interface integration so that partners are listed in the Partner Network: added /members to the POST api and updated the business logic accordingly [#1002](https://github.com/eclipse-tractusx/portal-frontend/pull/1002)
- **Company Data Management**
  - fixed infinite loop issue in add new address modal [#1048](https://github.com/eclipse-tractusx/portal-frontend/pull/1048)
  - fixed broken title and description in modal [#1070](https://github.com/eclipse-tractusx/portal-frontend/pull/1070)
  - fixed translation error [#1070](https://github.com/eclipse-tractusx/portal-frontend/pull/1070)
- **Business Partner Invitation**
  - updated first name and last name pattern to allow 2 characters in application form [#1025](https://github.com/eclipse-tractusx/portal-frontend/pull/1025)
  - fixed person name regex pattern [#1040](https://github.com/eclipse-tractusx/portal-frontend/pull/1040)
- fixed usage of scroll to top button from shared components [#868](https://github.com/eclipse-tractusx/portal-frontend/pull/868)
- fixed naming consistency of constants: used camel case for all page paths and update corresponding usage in other files [#895](https://github.com/eclipse-tractusx/portal-frontend/pull/895)
- removed unnecessary condition in semantic hub page's table [#979](https://github.com/eclipse-tractusx/portal-frontend/pull/979)
- fixed unchanged text of button when user requests subscription [#985](https://github.com/eclipse-tractusx/portal-frontend/pull/985)
- fixed height for "Admin Service Detail" page content [#1001](https://github.com/eclipse-tractusx/portal-frontend/pull/1001)

### Known Knowns

- Technical Issues and Limitations
  - Technical User Accounts
    - There is an issue where attempting to display details for inactive technical users results in a blank page due to a lack of necessary backend support.
  - Long Description field in German (de) does not accept German special characters [#965](https://github.com/eclipse-tractusx/portal-frontend/pull/965).
  - Role Upload does not work during App Release Process when using Firefox [#961](https://github.com/eclipse-tractusx/portal-frontend/pull/961).
- Feature Support and Development
  - Auto-setup Process Worker
    - There is no frontend support for the extended auto-setup process worker, specifically in terms of error handling and status transparency.
  - Registration Approval Process
    - The frontend provides limited support for the registration approval process, particularly concerning the retriggering of jobs.

## 2.1.0

### Change

- **Scroll Integration**:
  - integrated now scroll-to-top component from shared components for all pages [#872](https://github.com/eclipse-tractusx/portal-frontend/pull/872)
- **Credential Request**:
  - UI improvements such as table headers, joint table columns, type updates, etc. [#866](https://github.com/eclipse-tractusx/portal-frontend/pull/866)

### Feature

- **Company Role**:
  - added support for optional terms [#879](https://github.com/eclipse-tractusx/portal-frontend/pull/879)
- **Company Data Management**:
  - released Company data management page for Legal Entity, Sites and Addresses incl. simple status management [#731](https://github.com/eclipse-tractusx/portal-frontend/pull/731)
- **Connector Management**:
  - released connector detail view including change connector url, view SD document, etc. Add details overlay [#848](https://github.com/eclipse-tractusx/portal-frontend/pull/848)
- **Imprint**:
  - updated imprint page with anonymized data [#906](https://github.com/eclipse-tractusx/portal-frontend/pull/906)

### Technical Support

- **Dependencies**:
  - upgraded shared components [#957](https://github.com/eclipse-tractusx/portal-frontend/pull/957)
  - bumped braces from 3.0.2 to 3.0.3 [#927](https://github.com/eclipse-tractusx/portal-frontend/pull/927)
  - bumped ws from 8.16.0 to 8.18.0 [#928](https://github.com/eclipse-tractusx/portal-frontend/pull/928)
  - bumped GitHub actions [#846](https://github.com/eclipse-tractusx/portal-frontend/pull/846)
- **Refactoring**:
  - removed direct imports from MUI [#855](https://github.com/eclipse-tractusx/portal-frontend/pull/855)

### Bugfixes

- **PartnerNetwork Registration OSP**:
  - fixed access to customer registration consent UI for OSP customers [#913](https://github.com/eclipse-tractusx/portal-frontend/pull/913)
- **App Subscription**:
  - allowed empty URL in register URL overlay [#842](https://github.com/eclipse-tractusx/portal-frontend/pull/842)
- **Registration Detail**:
  - fixed translation of registration process flow technical keys – Credential and BPNL Credential [#862](https://github.com/eclipse-tractusx/portal-frontend/pull/862)
- **App Release Process**:
  - integrated missing app release process `app role deletion` function with BE API response [#850](https://github.com/eclipse-tractusx/portal-frontend/pull/850)
- **Company Wallet**:
  - fixed transaction logo path [#845](https://github.com/eclipse-tractusx/portal-frontend/pull/845)
- **Overlays**:
  - fixed consistency for form input fields across the application [#843](https://github.com/eclipse-tractusx/portal-frontend/pull/843)
- **My Organization View**:
  - fixed permission validation for `my organization` view [#857](https://github.com/eclipse-tractusx/portal-frontend/pull/857)
- **App Marketplace**:
  - fixed app category view more and collapse button function [#805](https://github.com/eclipse-tractusx/portal-frontend/pull/805)
  - enabled showing of appropriate error information to the user along with refetch button [#910](https://github.com/eclipse-tractusx/portal-frontend/pull/910)
- **Service Marketplace**:
  - enabled showing of appropriate error information to the user along with refetch button [#910](https://github.com/eclipse-tractusx/portal-frontend/pull/910)
- **Connector Management**:
  - fixed blank page issue on clicking on details [#925](https://github.com/eclipse-tractusx/portal-frontend/pull/925)
  - updated GET endpoint for 'Connect Company Connector' to consider technical user status [#938](https://github.com/eclipse-tractusx/portal-frontend/pull/938)
  - enabled showing of appropriate error information to the user along with refetch button [#923](https://github.com/eclipse-tractusx/portal-frontend/issues/923)
  - fixed typo in overlay [#947](https://github.com/eclipse-tractusx/portal-frontend/pull/947)
- **Company Data Management**:
  - removed unwanted input forms [#887](https://github.com/eclipse-tractusx/portal-frontend/issues/887)
  - fixed crash issue in details page
  - added error handling component in table [#888](https://github.com/eclipse-tractusx/portal-frontend/issues/888)
  - updated company data input patterns [#946](https://github.com/eclipse-tractusx/portal-frontend/pull/946)
- **User Management**:
  - fixed disable button state when deselect all checkboxes [#923](https://github.com/eclipse-tractusx/portal-frontend/pull/923)
- **UI Language**:
  - updated translations in locale files [#935](https://github.com/eclipse-tractusx/portal-frontend/pull/935)
- **Application Requests**:
  - made UI improvements [#911](https://github.com/eclipse-tractusx/portal-frontend/pull/911)
- **Semantic Hub**:
  - enabled showing of appropriate error information to the user along with refetch button [#917](https://github.com/eclipse-tractusx/portal-frontend/pull/917)
- **Admin Board**:
  - fixed role to hide admin board page for service manager [#937](https://github.com/eclipse-tractusx/portal-frontend/pull/937)

### Known Knowns

- Technical Issues and Limitations
  - Technical User Accounts
    - There is an issue where attempting to display details for inactive technical users results in a blank page due to a lack of necessary backend support.
  - Long Description field in German (de) does not accept German special characters [#965](https://github.com/eclipse-tractusx/portal-frontend/pull/965).
  - Role Upload does not work during App Release Process when using Firefox [#961](https://github.com/eclipse-tractusx/portal-frontend/pull/961).
- Feature Support and Development
  - Auto-setup Process Worker
    - There is no frontend support for the extended auto-setup process worker, specifically in terms of error handling and status transparency.
  - Registration Approval Process
    - The frontend provides limited support for the registration approval process, particularly concerning the retriggering of jobs.
  - Technical User Details
    - The status of technical users is not displayed on the technical user detail page.
- UI Development Needs
  - Onboarding Service Provider Management Board
    - The user interface for the Onboarding Service Provider management board is not yet developed.

## 2.0.0

### Change

- **Identity Provider Configuration**
  - updated the IdP Config Overlay to include additional metadata properties for comprehensive configuration:
    - clientId: string
    - hasClientSecret?: boolean
    - logoutUrl?: string
    - metadataUrl: string
- **Responsive Design Updates**
  - improved the navigation menu for reduced screen sizes with an expanded full display height for better visibility and access
  - refined the sub-navigation header styling for a more consistent appearance with reduced custom styles
- **Onboarding and Service Provider Registration UI & IdPs**
  - overhauled the UI design of the screen, enhancing the user experience during customer registration:
    - customer Consent & Company Data Page
    - error Overlay & Page
    - success Page
  - introduced support for mobile devices, ensuring a seamless onboarding process across different screen sizes
  - added delete option for newly created/not yet configured "Managed IdPs"
- **Wallet UI**
  - reimagined the main active wallet card style to align with the new design philosophy
  - implemented a visual differentiation for wallet cards based on their status - active, inactive, or unknown
- **Marketplace and App Enhancements**
  - modernized the app marketplace card with updated styling and new design elements
  - enabled navigation for inactive app sub-menus and refreshed the overlay content for "in progress" applications
- **Shared Component Improvements**
  - upgraded the props for quick links to enhance component versatility
- **Credential Management**
  - adjusted document data handling and sorting for more efficient credential management
- **BPDM Interfaces**
  - upgraded the Partner Network integration to align with the new BPDM endpoints and schema ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
  - updated the Partner Network Business Partner Detail Overlay to accommodate the updated BPDM endpoints and schema ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
- **Others**
  - disabled unwanted console logs
  - removed home page warning
  - App Release Process "Technical Integration" - updated frontend service for retrieving roles via the apps service API GET /api/apps/AppReleaseProcess/{appId}/roles
  - Partner Network - improved overlay of Company Data

### Feature

- **Self-Sovereign-Identity Next**
  - **Company Wallet (due to new Issue Component)**
    - migrated wallet-related API endpoints to the new Issuer Component, resulting in a change in the response schema ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
    - enhanced error handling in the UI for invalid or non-existing membership credentials
- **Credential Management - UseCaseParticipation (due to new Issue Component)**
  - transitioned API endpoints from MIW wallet to the Issuer Component ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
  - added functionality to expand details showing the current status of useCaseParticipation and the history of credential requests along with their statuses
- **Credential Management Board**
  - updated the board to utilize Issuer Component endpoints for managing credential requests, including approvals and declines
  - switched from the document download API endpoint of the portal to the Issuer Component ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
- **Revoke Credentials**
  - implemented new features to revoke credentials, available to operators through the Credential Management board
  - implemented new features to revoke credentials, available to customers through the Wallet UI
- **Multi-Technical-User-Provider**
  - enhanced several overlays to support the management of multiple technical users, including those for app and service subscription management, activation, and technical user creation
- **Company Certificates (enhancement)**
  - added company certificates inside the partner network company details overlay (incl. download function)
  - enabled certificate deletion
  - added success message for certificate upload function
  - implementation of New UI Design for Company Certificates
  - enabled error icon on certificate deletion error scenario
  - updated API Endpoint for fetching Certificate Document
  - changed listing page api to fetch certificates in details page
- **Company Subscription Management**
  - rolled out comprehensive management of company subscriptions
  - enabled unsubscribe function of subscriptions
  - enabled customer subscription detail view with linked objects such as technical user, connector, etc.
- **Technical User Accounts**
  - introduced a new view for managing "Inactive" technical user accounts
- **App Release Process**
  - enhanced the technical integration configuration form by adding the technical user option "none" and updating frontend logic to manage api payloads
  - enabled agreement handling by adding frontend logic and UI handling of optional agreements
- **Service Release Process**
  - enhanced the technical integration configuration form (for type dataspace services) by adding the technical user option "none" and updating frontend logic to manage api payloads
  - enabled agreement handling by adding frontend logic and UI handling of optional agreements
- **Company Data/Organization**
  - redesigned the company data section
  - added a "Company Delete" button in an inactive state
  - added a own section for owned and active company certificates (linked to certificate feature)
- **Company Registration Management Board**
  - updated the design to support additional registration processes
  - added a process status element
  - removed details on management page (e.g. documents) and moved them into the detail overlay
  - implemented expandable status details inside the business partner registration detail overlay
- **Connector Management**
  - updated the UI styling and user experience for connector management
  - updated connector registration flow and enhanced self-service support with technical user linkage

### Technical Support

- introduced CodeQL scan
- removed Veracode workflow
- renamed docker notice file
- CONTRIBUTING.md: linked to contribution details
- updated eclipse dash tool for dependencies check
- added dependabot.yml file and introduced grouping of pull request for version updates
- upgraded gh actions and change to pinned actions full length commit sha
- removed warnings from log and dev server
- added support of unavailable backend by redirecting the user to an error page
- migrate from create react app to vite framework
  - switched from deprecated create react app to a new framework for build scripts and development server
  - upgraded to Portal Shared Components 3.x based on Vite
  - upgraded dependencies
- upgraded keycloak-js dependency to v23.0.7
- URL Pattern validation
  - made HTTPS in URL patterns configurable: enabled by default, HTTP can be configured by setting the introduced environment variable to false
- code clean-ups
  - removed unused overlays
  - remove duplicate api endpoints
- removed appendchild from the code and replaced it with alternative code

### Bugfix

- resolved code smells related to the "certificateTypes" length check, ensuring the logic correctly handles all scenarios
- Page Scroll Behavior: removed unintended page upscrolling on various sections to enhance user experience
  - Partner Network
  - Application Request page
  - Company Subscriptions
  - Invite Business Partner
  - Semantic Hub
  - Technical User Management
- User Management: fixed the display of user roles within chip cards in User Management
- App Release Process form: fixed the display of user roles within chip cards
- Local & Wording Updates: updated locale file content to clarify company role change overlay descriptions and revised wording in multiple sections for better clarity
- Help Link Correction
  - addressed and fixed broken help links on:
    - Notification page
    - App Subscription Activation Overlay
    - App release process
    - Service release process
- App Change: corrected the logic for displaying descriptions in the App Change section
- Semantic Hub: rectified overlay issues for displaying semantic model diagrams in the Semantic Hub
- General Styling Enhancements
  - applied background hover effects to improve visual feedback
  - fixed notifications sorting dropdown closing issue
  - synchronized button styling across different pages
- Company Certificates: fixed inactive company certificate not being displayed
- Application Requests: corrected the display of company roles for requester companies with the "Onboarding Service Provider" role in the Application Requests section
- Use Case Participation: implemented a loader to provide feedback while waiting for a response in Use Case Participation
- Sonar finding(s): adding an initial value to the reduce function, preventing potential errors
- Connectors: Enhanced the connectors feature to improve the retrieval and display of service accounts in the autocomplete list, thereby improving user experience
- App Role Management: Streamlined role-based access control by updating the required role to `modify_user_account` in the App User Role Management feature for the "edit" and "Add Role" button as well as for the overlay
- Side menu: Fixed the absence of the "My company" section in the mobile version of the side menu
- Company Role Change: Enhanced the company role change flow by adding logic to handle scenarios where the role change does not impact company rights or features

### Known Knowns

- Technical Issues and Limitations
  - Technical User Accounts
    - There is an issue where attempting to display details for inactive technical users results in a blank page due to a lack of necessary backend support.
  - Partner Registration Prototype
    - The prototype is not yet functional for production use and fails to capture data entered through browser autofill.
  - App Release Process
    - The delete function for App Roles in the App Release Process is currently non-operational.
  - Credential Revocation
    - The administrator's Credential Revocation Overlay does not automatically close after a successful revocation request submission.
- Feature Support and Development
  - Auto-setup Process Worker
    - There is no frontend support for the extended auto-setup process worker, specifically in terms of error handling and status transparency.
  - Registration Approval Process
    - The frontend provides limited support for the registration approval process, particularly concerning the retriggering of jobs.
  - Technical User Details
    - The status of technical users is not displayed on the technical user detail page.
  - App Subscription URL Management
    - Users are currently unable to delete URLs in the "Register URL for Autosetup" function on the App Subscription Page due to missing user experience updates and API integration.
- UI Development Needs
  - Onboarding Service Provider Management Board
    - The user interface for the Onboarding Service Provider management board is not yet developed.
  - Company Data Management
    - The user interface development for company data management is not included at this stage.

## 1.8.0

### Change

- Notifications
  - search functionality enabled, with an extension that allows for in-content match results
  - implemented automatic page loading and sorting capabilities for managing notifications
- App Subscription Management
  - enabled company search feature based on company name patterns
- Service Subscription Management
  - enabled company search feature based on company name patterns
- Invite Business Partner
  - enabled company search feature based on company name patterns
- Application Request Management
  - enabled company search feature based on company name patterns
- User Management
  - improved user deletion success info messages by adding details of the deletion action process
  - reworked the user role assignment process to enhance accessibility for users
  - updated API structure (note: this is a breaking change by the backend) to integrate the identity management table within the user management interface.
- Information Pages - Company Roles Introduction Pages:
  - updated the "Conformity Body" content to provide a more accurate description.
  - improved the OSP page by fetching standard library data from standards.json and displaying it using a new table component
- Information Pages - Dataspace:
  - updated dataspace provider links to include quick access links.
- Login Navigation ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
  - user navigation on login managed based on the users company application status. FE logic uses the applicationType and applicationStatus
- UseCase Participation UI
  - enhanced the handling of elements; if the backend does not provide a document template URL, the link will be disabled.
- Others
  - renamed the action button in multiple overlays from "Cancel" to "Close" to accurately reflect the action when users can only close the overlay, not cancel an operation.
  - removed all references to consortia environments
  - updated all documentation and help links to reflect the new directory structure in portal-assets.

### Feature

- User Login Redirection
  - Enhanced user experience for incomplete registrations: users attempting to log in are seamlessly redirected to complete the registration process
  - Introduced an informative screen on the portal for registrations awaiting validation, complete with a notification bar
- Service Release Process
  - Integrated a service conformity check within the service release workflow, enriching the service summary pages with compliance verification
- Company Certificate Management
  - added a convenient link in the user menu for direct access to the company certificate page
  - developed UI components to facilitate filtering, sorting, and viewing of company certificates
  - implemented a detailed overlay for viewing company certificate specifics
  - created an overlay for uploading new company certificates
  - established a connection between the listing page, certificate upload, and details page with the backend API for streamlined operations
- Registration Decline Feature
  - released a new function allowing the decline of registration invitations for companies, enhancing administrative control
- OSP Function - Managed IdP Management
  - expanded the Identity Management capabilities within OSP Function by adding sub-menus for enabling, disabling, and deleting managed Identity Providers (IdPs)
- Company Wallet UI
  - established the wallet user interface; displaying owned credentials, status, expiry date and authority
- Multi Device Support
  - refined navigation elements to support multiple device sizes, incorporating a responsive burger menu that adapts to content width and browser dimensions
  - updated the sub-navigation design to ensure compatibility across various device sizes, impacting the user interface on the Company Roles, Use Case, and Data Space pages

### Technical Support

- upgraded shared component versions
- implemented code quality & style improvements based on ESLINT rules
  - enable require-await rule
  - enable return-await rule
  - enable prefer-reduce-type-parameter rule
  - enable prefer-read-only rule
  - enable no-inferable-types rule
  - enable dot-notation rule
  - enable triple-slash-reference rule
- upgraded dependencies for vulnerabilities in axios, follow-redirects and @adobe/css-tools
- added build check at pull request
- updated file header template
- added additional image tags of type semver to release workflows
- Removed env specific urls from test files
- Updated shared components package dependency
- upgraded portal-shared-components package due to CVE-2023-42282 in node-ip package
- Changed portal-cd references to portal due to repository renaming
- Updated README.md
  - mentioned `docs` folder in portal-assets repository
  - referenced docker notice files in notice section instead of duplicating the content

### Bugfix

- App Overview
  - api failing component appears with "no data available" and with error bar
- App Release Process
  - fixed automatic upscrolling in form pages
  - fixed help link, funky character displayed and the success message in user role upload
  - upload app role template file encoding updated
  - fixed incorrectly displayed information message "no {object} available" getting displayed while content is available
- App Management
  - template file encoding updated for 'technical integration' and 'add roles overlay' and deleted previous template
- Service Overview
  - add missing translations, fix duplicate error
  - fixed incorrectly displayed information message "no {object} available" getting displayed while content is available
- Service Release Process
  - fixed automatic up scrolling in form pages
  - fixed conformity document deletion issue after uploading document
- User Management
  - create user account(s) - added api error handling component (snackbar) for the FE flow when calling GET /company/identityproviders
  - technical user - removed quotation marks from technical user details
- Business Partner Invite
  - fixed loading button issue to invite multiple companies in succession
- Credential Request Overview
  - fixed document icon hover design used
- IdP Management
  - fixed IdP workflow/UI flow inside the overlay "Create IdP" depending on selected IdP type (managed vs own)
  - Network Registration mock UI - fixed extId input field pattern to allow 6-36 alphanumeric characters
  - user migration overlay - fixed csv file upload; uploaded user file triggers the backend API to update existing user accounts with the new IdP connection and loads the providerID/userID into Keycloak for each included user
- App Marketplace
  - reduce image flickering on user interaction by using cache option
- Application Requests Management Board
  - fixed filter behavior when filtering for 'closed' or 'in review' registrations
  - reset search list after clearing input text

### Known Knowns

- Registration Decline Feature - missing backend API connection for actual trigger of the decline
- Company Certificate - delete function missing; backend integration outstanding
- Semantic Models - overlay diagram cannot get displayed due to semantic model backend external dependency error - function temporarily deactivated
- Partner Network - automatic upscrolling when clicking on "more" button
- Admin Board Application Requests - automatic upscrolling when clicking at any button on the page
- Own IdP Config Flow - incorrect text values and user email are displayed on the last overlay screen (confirmation screen of own user id connection and suggestion of running a test login)
- Broken chip card element
- App User View - not showing assigned roles
- App Release Process - selected use cases not displayed
- App Change Process 'Change App Role(s)' - roles not showing
- App Subscription Request Configuration Overlay - _Help_ hyperlink incorrectly configured
- App Change Process 'Change App Description' - description change displays the new description in the incorrect language field
- App Release Process - entering a use case value in the input field results in a blank/white page

## 1.7.0

### Change

- App Subscription and Service Subscription
  - extended ui support on app/service subscription configuration and activation
- Locale files enhanced with new feature "Onboarding Service Provider"
- Technical User Management
  - overview page: enabled search & filter for technical user accounts
  - user detail page: enhanced technical user detail page with connected object information (edc, connector, etc.)
  - user detail page: enhanced responsiveness of the page
- Invite Business Partner Form
  - disable invite button when loader is visible
- Component/Design element changes
  - Sub-Navigation label content changed to left aligned
- Service Subscription Mgt page
  - styling aligned to the app subscription Mgt page
  - service filter added
- Identity Provider Config
  - ui enhancements to support user flow
  - extended error handling implemented based on backend implementation with error details per object
- Service Management/Overview
  - manage service sub-menu for active services added (deactivate service function)
  - offer image added to service card based on backend response
- App Marketplace
  - role permission validation updated to sync permission validation for subscription with backend endpoints used
- App Release Process
  - Step "Verify" image load styling updated to support multiple images with carousel function
- Connector Deletion
  - added a information/confirmation overlay for connector deletion in case the connector has an technical user and/or subscription linked
- My User Account
  - support user response action 'success' on click of copy to clip board (only Dev/INT relevant)
- Page Loading and Error Component
  - released new page load and error component element for service overview, app overview and subscription management pages
- Notifications
  - app subscription request notification content update
- Enhanced /StaticTemplateResponsive/Cards/TextImageCenterAligned.tsx to support multiple images
- Admin Credential Management Board
  - support the load element for "decline" and "approve" button
  - document icons updated to support hover to show that the document can get clicked
- Legal information for distributions [TRG 7.05](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-05/)
  - add legal info at build

### Feature

- Technical User Details
  - credential reset enabled via action button
- Usermanagement
  - bulk upload function released
  - extended error handling implemented based on backend implementation with error details per object
- Search Element
  - implemented full width search overlay for mobile version
- Overlay styling updated to sync used overlay styles across the portal overlays (header, description sizing and color)
- App Management/Overview
  - added function to support 'Change Documents' for active apps
  - added function to support 'Add Roles' for active apps
- My Organization
  - added app unsubscribe subscription function to inactive active app subscriptions
- Onboarding Service Provider - Prototype
  - enabled identity provider creation "MANAGED"
  - 3rd party company registration
  - approve consent osp registration company

### Technical Support

- Technical User Management
  - multi device support added for technical user detail screen
- Code quality & style improvements implemented based on ESLINT rules
  - import/no-duplicates
  - prefer-const
  - object shorthand
  - add type for imports
  - Prefer-nullish-coalescing
  - No confusing void expression fixes
  - ban-types
  - removed extra semicolons to avoid warnings
  - no-empty-function
  - prefer-optional-chain
- Digital Twin content (pages, overlays, translation content, etc.) removed due to dDTR release and decommissioning of the central DTR
- Build images also for arm64, in addition to amd64
- Updated data grid table props to the new prop value
- Upgraded dependencies to latest version
- Trivy scan: changed to no failure on high findings, as it should only fail if there is an error/misconfiguration
- Pull request linting added

### Bugfix

- "Dataspace" Introduction page background color of last section changed
- App Release Process
  - fixed double loading of images for app page
  - fixed validation for contact in app page
  - fixed salesManagerId(null) error
  - fixed error message deletion upon deleting of csv file in technical integration
  - fixed consent check removal issue on save
- Service Release Process
  - fixed consent check removal issue on save
- App Overview
  - fixed image display in app overview cards
- IDP Configuration
  - added load element for IDP list display function
- Home
  - Fixed image display for 'my business applications'
  - Fixed white screen due to 'my business applications'
- Partner Network - update search query parameter name to legalName
- Technical User Management
  - technical user creation overlay: type subheading typo fixed
  - overview page: displaying duplicates after adding/creating new technical users fixed
  - user detail page: removed copy icon from connector link
- Admin Business Partner Registration Request Screen - Detail Overlay country fixed to display country code received via backend api
- Invite Business Partner
  - fixed auto page refresh/update when inviting via the invite overlay a new company
  - fix invite overlay loader position
- Service Subscription
  - activation overlay field names updated
  - field value mapping to backend api response properties updated/changed
  - copy feature/icon added for the technical user secret
  - header description updated
  - sorting element behavior fixed in case the user sorts multiple times with the same sorting option
- Vulnerability from dependency
  - upgrade axios dependency to v1.6.1
  - Set resolution for @babel/traverse (CVE-2023-45133)
- Legal-notice for about page
  - Re-introduce placeholder values to be replaced during the build process
- Others
  - Fixed broken KeyValueView/index.tsx for undefined object attributes

### Known Knowns

- App Release Process
  - help link for app role upload incorrectly set
  - mutated vowel/umlaut of uploaded app roles are incorrectly displayed
- Semantic Models
  - semantic model overlay diagram can not get displayed due to semantic model backend external dependency error - function temporarily deactivated
- Technical User Creation Overlay
  - Role description overlapping in case of long text value or if screen width is limited
- Service Subscription Activation Overlay
  - incorrect value displayed in the field "User Id", expected property is 'technicalClientId' but 'technicalUserId' is actually displayed

## 1.6.0

### Change

- Connector Technical Integration
  - connector configuration details added
- App Subscription Management
  - subscription activation overlay enhanced by customer name, bpn, technical user permission, appId
- Technical User Management
  - added "Offer Link"/"Name" inside the technical user overview user table
- Connector Registration
  - registration of "Managed Connectors" limited to company with the role app/service provider & info multi lingual message added for inactive select scenario(s)
- App Release Process
  - changed 'Privacy Policy' selection to mandatory
  - updated "mandatory"/"required" icon (asterisk) color from black to red
  - design/styling of the app release step "validate and publish" updated
  - GET /languages endpoint structure updated inside the FE business logic
  - Phone number pattern updated
- Service Release Process
  - logic added to skip technical integration tab for serviceTypeId "consultancy"
  - updated "mandatory"/"required" icon (asterisk) color from black to red
- Static Pages Updated
  - Data Space
  - Catena-X Participant

### Feature

- Removed all daps related code - frontend implementation, business logic and locales
- New Notification messages released:
  - credential approval
  - credential rejection and
  - subscription url change
- User Management
  - technical user role description & help link added inside the technical user creation overlay. Incl. multi language support
- Connector Registration - Managed
  - added subscriptionID linkage inside the registration page as well as the business logic to submit the connector connected subscriptionID
- Search
  - new search element enabled/activated for all portal pages
  - search result style newly introduced
  - added search close function whenever the user clicks on the background/outside the search component
- Company Role Management
  - enabled company role unselecting
- App Subscription
  - Add "Detail Data" Button and Overlay
  - Refracting Activate Subscription Page
  - Add App Filter Search Functionality
  - enabled app tenant url change for active apps
- App Change Function enabled
  - 'Change Image' enabled for app owners if app is active (App Management -> App Overview)
  - 'Change Description' enabled for app owners if app is active (App Management -> App Overview)
- User Account & My User Account
  - Add Admin Info
- Multi Device Function
  - mobile friendly header and stage navigation enabled
  - slider stage header implemented and activated
  - Home - Carousel - Responsiveness - when switching the portal width screens get rendering issues
- Usecase Participation
  - Created New page under User profile
  - Add edit Overlay UI
  - Fetch usecase via API
  - Add Business Logic to upload document
- Notification
  - Show done state
  - Provide icon for marking a notification as read/unread
  - New Header and Filter UI
- SSI Certificate Request Credential Adminboard released
  - new page for credential request management released incl management filters and search
  - GET /certificate request api endpoint connected
  - certificate request approval function enabled (with backend connection PUT /credentials/{credentialId}/approval)
  - certificate request decline/reject function enabled (with backend connection PUT /credentials/{credentialId}/reject)
  - download useCase participation document enabled

### Technical Support

- Changed license notice for images
- Sonar findings fixed (Code smells and bugs)
- Dependabot findings fixed (Upgrading dependencies to the latest versions)
- Excluded locales from duplication sonar checks
- Project Structure
  - Moved out shared components and source folders to root level
- app access management component (app cards element) endpoint path updated/changed due to new endpoint path provided by apps services

### Bugfix

- fixed missing URL and Email data after re-opening a service under the service release process
- fixed app release process process handling (Step 3 - Consent) button "save"
- app detail page "back" button fixed
- Application card favorite button click (separation from the rest of the card where the click results into opening the app card)
- Admin Credential Board - views/filter function fixed
- Service Release Form - fixed erase of entered data on deleting uploaded image
- Service Detail - header UI fix of rendering issues
- Permission validation 'Credential Mgmt' page updated to 'decision_ssicredential'
- App description change - fixed page break issue in case of api response without language tag for each FE supported language
- Notification message link - 'UseCases' welcome message fixed
- handle empty customer link section in managed connectors
- Overlay fix of activation response
- App Management page access permission changed to add_apps
- Permission validation 'Credential Mgmt' page activated
- Managed connector registration api call - technicalUserID string empty instead of submitting the subscriptionID
- App Release Process - consent conformity check upon upload of the conformity certificate, previous selected consents got deleted
- Data Space Information page - style fix stage sub navigation header and fixed responsive issues
- App Detail
  - Subscribe Button state management updated
- Service Marketplace
  - Subscription Button cross service highlighted

### Known Knowns

- Tenant URL inside the app subscription detail overlay (provider view) is displayed as changeable even though the app is not even activated yet. The request is getting rejected from the backend as expected, but frontend should ideally not even allow the user to trigger the function via the UI
- App Subscription Activation overlay: pattern for input field "Tenant URL" allows "#" character while backend will correctly reject the input if the user adds an url containing "#"
- UseCase Framework upload (SSI request flow): limitation of the file size missing
- Company Certificate upload (SSI request flow): limitation of the file size missing
- Service image, uploaded by Service Provider, is not displayed inside the service provider service overview
- App Release Process form: image load running on fail within the "Verify" step
- "Offer Release Approval" e-mail for offer provider currently not supported
- If the connector deletion is running into an error with the portal backend, the user receives an error information but without any specific error message of the actual reason for failure
- Missing user information about automatic technical user deactivation for technical user linked to an connector which is getting deleted/inactivated

## 1.5.0

### Change

- User Management
  - app access management - api used to display app cards inside the user management 'App Access Management' reduced to single api call

### Feature

- App Release Process
  - technical integration enhanced by technical user profile configuration
  - technical user profile section added inside 'Validate and Publish' step
- App Marketplace
  - app detail page - sticky app detail sub-navigation added
  - app detail page - technical user profile section added
- App Admin Board
  - app detail page - technical user profile section added
- App Management Board
  - app detail page - technical user profile section added
- Service Release Process
  - technical integration added incl. technical user profile configuration
  - SERVICE_LEADIMAGE upload integrated
  - delete document notification/toast message added
- Service Marketplace
  - service detail page - technical user profile section added
- Service Admin Board
  - service detail page - technical user profile section added
- Service Management Board
  - service detail page - technical user profile section added
- Service subscription
  - Subscription Activation api integration
  - Subscription flow UI update
- Shared Components
  - about card for legal notice added
- About page for legal notice
  - About card added to Shared Components
  - About page added and linked in footer component
  - card component integrated in About page
- Third-party-licenses page removed (replaced by About page)

### Technical Support

- About page
  - enabled build and release workflows to provide content

### Bugfix

- App Release Process
  - conformity document deletion missing error message in failure case
- Registration Process
  - 'add bpn overlay' - manually entering a bpn to an application did result into a load element on the 'add bpn overlay' of the next application (without page reload)
- My Organization
  - missing subscription details fetch from api fixed
- Connectors
  - Previously added data on 'add connector' overlay got not cleared in case of a success scenario
- Service Release Process
  - display previous uploaded lead service image in "validate and publish" step

## 1.4.0

### Change

- IdP Configuration
  - ui styling and messages updated
  - load element added for create/submit/next buttons
  - implemented success & error messages depending on the error scenario while creating/configuring a new idp
- Shared UI Components
  - added typography for static table to update headline sizing
- Notification
  - Service_Release_Request customer message content updated
  - App_Release_Request customer message content updated
- Static Templates - UseCases & CompanyRole
  - new templates released
  - real time language switch for static pages enabled where content is fetched from another repository (see features/language)
  - support scroll-up icon on each sub-title
  - enabled page sub-menu to stick on the screen top when scrolling down
  - support hover tooltip in-text component

### Feature

- App Release Process
  - added privacy policies section to "validate and publish" application form
  - added app roles section to "validate and publish" application form
  - added role description information inside the ui for "Technical Integration" step
  - "help" button enabled along the app release process (form bottom)
  - extended ui error handling for 500 backend error responses
- Service Release Process
  - enabled SERVICE_LEADIMAGE document upload
  - "help" button enabled along the app release process (form bottom)
  - extended ui error handling for 500 backend error responses
- Service Subscription Management released (pre-version)
- Service Release Admin Board released (pre-version)
  - enabled search for services
  - enabled filters
  - displayed all services waiting for review and active inside the admin board
  - enabled view service details
  - enabled approve and decline service
- App Marketplace
  - added company subscription status information on the app overview (inside the card component)
  - app detail page, new order status component implemented for subscription process
- Notification
  - Role_Update_Core_Offer notification enabled
  - Role_Update_App_Offer notification enabled
- Connector Registration
  - added new section for connector providers to view and managed 3rd party/managed connectors
  - added enhanced error handling for connector tables in case of service/server error
- Company Configuration - Company Role Change
  - released company config page for company admins to update CX company participation role (switch between Participant, App Provider, Service Provider) incl. backend connection for agreement consent, document download and business logic to display company role change impact

### Technical Support

- moved all portal repo images to asset repo
- removed existing in code "disable eslinter" statements inside the app release process and fixed eslinter issues
- service release endpoint path updated/changed due to an endpoint path cleanup on backend side ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)
- app release process - app card language switch fixed to only switch the language inside the app card
- changed release workflow to retrieve tag from github.ref_name (set-output command deprecated)
- added release workflow for release-candidates
- react player package added to supported multiple formats of in-page videos
- changed container registry to Docker Hub
- added pull request template

### Bugfix

- App Management Board (Provider)
  - app endpoint path updated due to an controller change on the backend side - new path /api/apps/appChange/${appId}/deactivateApp
- Others
  - top right user profile icon hover function enabled
  - image zoom height fixed

### Known Knowns

- Company Configuration - Company Role Change
  - Overlay top summary section displays non-changed company roles as "added" instead of ignoring those roles since those are already assigned
  - Role/Feature change description not correctly fetched from the config file
- Service Release Process
  - Technical user profile configuration displayed for "Consultance_Services" even though its not relevant for services with this service type - error appears if user selects roles and wants to proceed
- Service Release & App Release Process
  - Issue on displaying given consent after using the "back" button inside the release process. Issue appears in an inconsistent manner.

## 1.3.0

### Change

- updated document section styling for app and service detail pages
- Shared Components
  - StaticTemplate: TextAndImage template spacing/element location updated
- User Account screen permission validation to access the page updated
- App Marketplace
  - enabled search “no result found” response
  - enabled responsiveness of the app cards to rearrange displayed app cards based on the users screen width
- User Management - app access management app cards backend api connection updated due to new endpoint business logic
- App Release Process
  - updated endpoint to post and get agreement consent
  - switched endpoint to retrieve cx frame documents from portal backend for consent section
  - document upload error message customization activated and new error message for file size set
- Service Release Process
  - updated GET and POST endpoint handling to store and fetch service details from the backend and display them inside the service release form
  - switched endpoint to retrieve cx frame documents from portal backend
  - updated endpoint to post agreement consent
  - translations enhanced/added
- Switch IdP
  - additional user support and new style added for easier process handling

### Feature

- Service Release Process
  - implement service type function with backend connection
  - added load button function for service release form - button "submit" and "confirm"/"proceed"
- App Release Process
  - added app privacy policy select function inside the app release process form
- Service Management (Service Provider)
  - implemented service overview for app provider to display all owned services in all states (incl. search, filter and sort)
  - implemented service detail page

### Technical Support

- added temp fix for CVE-2023-0464
- added build workflow for v1.3.0 release candidate phase
- updated actions workflows

### Bugfix

- Company Role Intro Page - updated zoomed image style by removing grey bottom line
- Service Marketplace - Service Detail Page
  - updated business logic to consume use case data due to updated api response body style
- Service Release Process
  - chapter "Supporting Material" deletion function fixed
  - "Save" button on "Offer Page Details" fixed
  - update long description pattern to support multiline (as app release process)
  - reset active step back to 1 in service overview page when re-opening a service in "draft" state
- Connector Registration - input pattern for connector name updated to support special characters and customer input related error messages
- Organization data - ignore "null" values provided by backend components/apis
- Dropzone - error message customized to support multiple error scenarios with different error codes/messages
- Service Detail Page (Marketplace and Service Management) - document download fixed
- User Management
  - recorded log errors fixed
  - payload fixed to portal roles only when updating user assigned portal roles
  - create new user account first and last name pattern updated to alow double names
- User Account - fixed page load for users without portal roles
- App Access Management - "Edit" button in user table fixed
- App Release Process
  - fixed condition for 'documents' section in 'validate and publish' step to display only relevant document types
  - removed placeholder section 'data security information' and 'connected data' from 'validate and publish' step
  - long description input field pattern
- App Release Process
  - update input field validation for longDescription input field
  - fixed provider input field validation; allowed numbers
- App Release Admin Page - App Detail Page
  - updated business logic to consume use case data due to updated api response body style

## Known Knowns

- Eslinter checks disabled in several code sections related to the app release process
- Sorting component behavior - preselected selects are not visible and active, hover, inactive state missing
- App Release Process - step "Verify & Submit" - the app card language switch is impacting the language of the whole party instead of only updating the app card
- Image zoom in results in the useCase/company introduction page is breaking in the background when user opens the zoom in function
- User account creation success overlay is displayed. When closing the success overlay, for a millisecond an error overlay is displayed
- App Management (Provider) sub-menu broken
- App and Service Marketplace - app cards display width responsiveness missing
- Service Subscription Management not yet released, only available via API endpoints
- Service Release Admin Board not yet released, only available via API endpoints

## 1.2.0

### Change

- Dropzone costum error support implemented

### Feature

- UserManagement
  - add role description details into the user account creation overlay and linking the description with the new developed/released role description detail page
- App Marketplace
  - app detail page got enhanced by "Privacy Policies"
- App Approval Admin Board
  - app detail page endpoint switched to /inReview/{appId}
  - app detail page "App Roles" added
  - app detail page "Privacy Policy" added
  - removes placeholder sections and implemented UI changes
- User Account Screen
  - add section with user assigned portal roles
  - add action button and overlay to update user assigned portal roles
- Service Release Process
  - implement service release process form and connected backend services /createService, /serviceStatus, /and Update service apis added
- App Release Process
  - enabled document download in contract and consent
  - enabled document deletion inside the app release form
  - changed additional document uploads from mandatory to optional and changed dropzone parameter size

### Technical Support

- Improved page loading in several places (such as app overview)
- Change local port to run behind reverse proxy
- Improved responsiveness of use case introduction page and company role page

### Bugfix

- Image import via api image/document endpoint implemented for organization/myCompanySubscription section
- Fixed display documents feature. Only first document got displayed (Admin App Approval Board - App Detail page, App Marketplace App Detail Page)
- App Release Process - when opening a previously saved app - "save & proceed" is disabled is fixed
- Home - Recommended section images not loading fix
- Application Request Board styling of the application status bar for application fully "DONE" but activation outstanding
- App Release Process - updated long description input validation
- App Release Process - updated business logic to retrieve app use case in new api response format

## 1.1.0

### Change

- Service Marketplace
  - documents displayed on service detail page connected to backend call (view and download documents)
  - updated styling of multiple subscription display section
  - service marketplace service card enhanced by short description
- SharedUIComponents
  - modal image behavior for different devices updated

### Feature

- App Conformity Document handling enabled
  - enhanced app release process with conformity upload section
  - enhance app release process "verify data" with conformity document view and download option
  - app admin board - app detail page enhanced by adding conformity document view and download
- SharedUIComponents
  - image gallery - added grid layout & parameter to display images in 16:9 ratio
- Service Release Management
  - implemented new top navigation section und sub-menu
  - implemented service release process intro page
  - implemented service release form (initial)

### Technical Support

- added a new smart image component to handle all kinds of images, display placeholder while loading and error image on failure
- fix(cve-2023-23916): add package upgrade as temp fix
- chore (gh-org-checks): rename file for stable trivy scan
- chore enable multi branch: add latest tag to released images
- created new component to reduce code duplications between app release process & service release process intro pages

### Bugfix

- Notification - App Subscription Activation - linked URL updated to 'User Management'
- Connector - DAPS registration retriggering allowed upload document types restricted
- Application Request - Approve/Decline/Retrigger/Cancel Process actions will clear button section and update the checklist/process status inside the overlay as well as the application list

## 1.0.0-RC10

### Change

- Get App Image backend connection updated for (AppMarketplace, AppDetails, App Overview & AdminBoard)

### Feature

- "No Items Found" page/section implemented for (AppMarketplace, ServiceMarketplace, AppOverview, AppSubscription & AdminBoard)
- Application Registration Validation Process - enabled retrigger process of application checklist steps in the overlay screens if applicable
- App Release Process - added delete document function

### Technical Support

n/a

### Bugfix

- Update styling App Management Board
- Invite Business Partner Screen - disabled "detail" button in invitees table
- Semantic Hub & Digital Twin overlays close icon fixed
- Digital Twin overlay sizing of content fixed to stay in given frame/overlay size
- App Release Process - fixed save and edit data handling to display available/saved app data to the user

## 1.0.0-RC9

### Change

- App Release Approval Board
  - Enabled overlay for decline scenario with customer message
- Notification message content updated and incl. links
- Several help connections implemented (connector, app release, etc.)
- Application Registration
  - Retrigger process apis added

### Feature

- Connector Registration
  - new design with additional information such as host, self-description and status released

### Technical Support

n/a

### Bugfix

- Back navigation issue resolved from notifications to any specific page and back

## 1.0.0-RC8

### Change

- App Release Process:
  - Technical integration - role upload ui changes to ease the usability
  - Added new attribute "privacyPolicies" to app creation
- New 'Help Center' connected with the portal help button

### Feature

- Application Approval Board - Checklist overlay
  - enabled checklist details with comments and status via backend api connection
  - enabled approval and decline interfaces for the manual data validation

### Technical Support

- resolve dependabot findings
- temp fix for cve-2023-0286
- add missing '--no-cache': apk update && apk add

### Bugfix

- User Management: App role assignment - cache issue resolved

## 1.0.0-RC7

### Change

- Admin App Approval Board - app detail page released when clicking on app card

### Feature

n/a

### Technical Support

n/a

### Bugfix

- Notification delete mechanism updated - auto page reload

## 1.0.0-RC6

### Change

- App Release Process
  - Set 'UseCase selection' and 'app supported language' to mandatory
  - app role upload further refined with better user support

### Feature

- Company Registration Approval Board
  - implemented and backend connected the application cancel process flow
  - checklist-worker fully implemented for not finalized/closed applications

### Technical Support

n/a

### Bugfix

n/a

## 1.0.0-RC5

### Change

- Application company detail overlay updated to manage unique ids based on the backend response
- App Release Process
  - Technical Integration - roles upload & deletion functionality

### Feature

- Application approval checklist implementation with checklist worker; status and overlay (ongoing)
- Shared Components
  - Dropzone file deletion overlay for deletion confirmation released

### Technical Support

- Static Template handling updated to fetch content from asset repo for more flexibility and code separation from content & support of multi-language activated

### Bugfix

- App details page fixed
- Add/Create user account field validations re-activated
- App release process - Changed regex validation for 'Provider Homepage' field
- App release process - Document upload in 'technical guide' field
- Refetch updated notification list on delete action
- Connector file type/size error updated

## 1.0.0-RC4

### Change

n/a

### Feature

n/a

### Technical Support

- Static Template handling updated to fetch content from asset repo for more flexibility and code separation from content & support of multi-language activated

### Bugfix

- App release process bugs fixed such as multiple document upload, fetch uploaded roles from backend
- App release management board - views tabs fixed
- Notification URLs for notification messages updated
- Connector registration overlay overlapping tooltip icon fixed

## 1.0.0-RC3

### Change

### Feature

- User Management
  - create single user account support of company idp
- Released App Management Board for Operator to managed app publishing requests

### Technical Support

n/a

### Bugfix

- Translations and couple of text messages updated
- My business apllication area fixed by removing cache relation for app card images
- App release process bugs fixed such as incorrect mandatory fields; file upload handling, etc.

## 1.0.0-RC2

### Change

- Dialog Header
  - Update Dialog header font size to 24px
- Admin Board - App Release (Page)
  - Created Admin Board Page
  - Connect with API's
  - BL&API Approve app release
  - BL&API Decline app release
- Bugfix
  - Change Email Pattern Regex to fix Hostspot
- User Management main page
  - update dialog header & font style/size
- Apps
  - removed asset repo dependency and connect backend apis to fetch lead images
- App Release Process
  - step 4 "role management" connected with apis to support GET / POST and DELETE
  - Company role introduction page styling sizes updated
  - Added content for company role introduction & use case introduction pages

### Feature

n/a

### Technical Support

- Email pattern / regular expression updated

### Bugfix

- App access management - carousel style updated & card height fixed

## 1.0.0-RC1

### Change

- User management
  - app Access placeholder component implemented which is getting used in case no active app subscription does exist
  - user table headlines updated
  - updated page header size and image
- Updates - Connector
  - overlays updated (dropzone headline added; changed "Cancel" to "Back" Button, add top right cancel icon inside the overlay)
  - tooltips added for connector table to explain status icons
- Registration Request Approval Board
  - page layout updated
  - filter feature enabled
  - company data details overlay extended with company role and documents
- Notification
  - Badge count added inside the user icon sub-navigation
  - notification message title and content updated by supporting new technical keys

### Feature

- Use case introduction page released
- Shared Components
  - created "Side List" component
  - created "Draggable Chip" component
  - created "Static Page" templates for introduction pages
  - created "Image Item" with zoom and hover function as well as update of "Image Gallery"
- App Release Process
  - step 4 limited to role upload/handling only
  - step 5 Beta Test page updated with preview content for future releases
  - app card component of step 1 connected with the leadimage load element to display the leadimage inside the card in realtime
- App Change Process released
  - created deactivate sub-menu component in App Provider Overview Page
  - created app deactivate page and connected the app/deactivation api
- App Subscription Management Board for app providers got newly released
  - overview of active app subscriptions and new requests
  - filter & search function on subscriptions
  - subscription activation function implemented with direct user response such es technical user creation
  - autosetup url storage for the app provider enabled via user interface
- Identity Provider Management released
  - connect company OIDC idps enabled via portal user workflow
  - user migration function enabled to support migration of users from one idp to another

### Technical Support

Portal asset repo image drag disabled for all transactional images (such as app images) ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)

### Bugfix

- User Management: assign multiple users to an role got fixed
- Connector:
  - fixed issue on clicking info icon trigger delete action
  - show tooltip message on hover of info icon
  - enable authentication flow
- Technical User: overlay static user data now getting fetched from the user token
- AppOverview: navigation to app release process screen with auto filled app data got fixed for apps in status "In PROGRESS"

## 0.10.0

### Change

- Shared Components
  - "load more" button component released with new design
  - page snackbar component released with new design
  - page snackbar auto closure implemented (as variant)
  - page snackbar positioning updated
  - tooltip enhanced by adding light color variant
- Partner Network
  - Stop throbber in case of error and show No rows present message
  - Empty details overlay issue fix

### Feature

- Service Marketplace
  - new UI released
  - enabled different views by service category
  - enabled sorting and in-page search
- Connector Registration
  - style updated and connector details enhanced inside the "my connectors" table
  - added DAPS logic and file upload inside the connector registration ui and business logic
- Notifications Service
  - enabled sorting and filtering
  - pagination enabled by adding "load more" function and receiving pagination details via api

### Technical Support

- n/a

### Bugfix

- Technical User creation: Removed multi overlay layering and corrected response style
- Notification Service:
  - modal for message deletion page positioning fixed
  - sort icon behavior on click/mouse over fixed
  - notification api trigger logic fixed
- App user management: user role deletion fixed

## 0.9.0

### Change

- Shared Components
  - SelectList component - property/parameter added to clear the select list input
- App Release Process
  - Sales Manager Get, Select and drop down enabled for app creation
  - "Save" Button enabling with update PUT api call

### Feature

- Marketplace
  - App subscription consent agreement included inside the user flow with api triggering
- Identity Provider
  - Create, update and enable new idp integration for ownIdP usage (companyIdP)
- Notifications Service
  - Release of new notification design with filtering, viewing & pagination
  - Highlight of unread messages
  - Delete notification function enabled
- Registration Approval Board
  - Enable handling of registrations without bpn by adding a bpn input field with api connection
- User management
  - Auto navigation to Identity Management section after deleting an user
  - App User tables - content api call filtering activated to reduce response to needed result
- Company Role Introduction
  - Active Participant introduction page
  - App Provider introduction page
  - Service Provider introduction page

### Technical Support

- n/a

### Bugfix

- n/a

## 0.8.0

### Change

- Connector Registration
  - Enable "Company as a Service" connector registration via modal; connected to portal backend and SD Factory
  - Input field pattern validation established
  - Updated delete connector integration

### Feature

- User Management - user account creation for portal connected to company role validation to reduce and validate available portal roles which the member company can assign (related to the company signed company role agreements)
- User Account
  - Enabled my user account deletion flow and backend integration
  - Error and success overlay added for password reset button/logic
  - Disabled "Suspend" user button

### Technical Support

- n/a

### Bugfix

- User Invite - error pattern validation integrated
- Shared Components
  - Image components updated & svg file loaded
  - Drop-Down list

## 0.7.0

### Change

- App Release Process
  - Added headline and subtext
  - Removed input field placeholders where not necessary
  - Activated app card always on viewport function inside the app card creation of the app release process
  - Updated app card sizing
- Service Marketplace
  - Service subscription detail section - added subscription status

### Feature

- App Marketplace
  - Subscription data submission to third party and enablement of terms & condition agreement/consent
- User Management
  - App role assignment for multiple users implemented

### Technical Support

- n/a

### Bugfix

- App Release Process - Page sizing fixed
- My Organization - BPN data field allocation aligned
- User Management - User table auto-refresh enabled after new user invite; business logic of user status inside the user table updated to display correct status
- Central Search - Result list gave an issue on app title value

## 0.6.0

### Change

- n/a

### Feature

- Application Management Board: Manage application request (by viewing company details and documents) and approve or cancel company applications.
- User Management: View own company users, invite new users and assign app roles for subscribed apps. Additionally, the technical user self-service got released and supports now the creation of technical users as part of the user company account.
- App Marketplace: Enables user to search for apps, display app details and subscribe for an app. Also app favorites tags are added.
- App Overview: App overview supports the app provider to see own published apps, check the status, progress unfinished app releases and start the registration of a new app.
- UiComponents: SharedUiComponent library got released and is usable for other projects with a number of ui react components

### Technical Support

- n/a

### Bugfix

- n/a

## 0.5.5

- Feature - App Overview page
- Feature - Add and edit Identity Provider details
- Feature - BPN add/delete flow in User Account Screen
- Feature - User Management - Success/Fail Message
- Feature - Expand on hover feature added to CardHorizontal component.
- Feature - Add download document in application request page
- Feature - Add User Role Overlay (refactoring)
- Feature - Assign user role (refactoring)
- Feature - Show subscription box after subscribed immediately
- Feature - App Release Process - upload functionality
- Feature - App Detail - Fetch Documents
- Feature - Shared Components - Transmission Chip button
- Feature - App Release Process - Business Logic & API - Submit App for review
- Feature - Transition button added to Registration table
- Feature - Expand on hover feature added to CardHorizontal component.
- Feature - Add download document in application request page
- Feature - Add User Role Overlay (refactoring)
- Feature - App Release Process - upload functionality
- Bugfix - Connect Partner Network to BPDM
- Bugfix - UI updates in UltimateToolbar component
- Bugfix - Registration table UI fixes
- Bugfix - App Release Process - Fixed browser back button issue
- Bugfix - User Management Main Page Style fix
- Bugfix - App Release Process - Fixed user directing to bottom of the page
- Bugfix - Services Card Responsive UI Fix
- Bugfix - Partner network search issue fix
- Bugfix - CardHorizontal - Height issue fix
- Bugfix - Bind app subscribe status in my organization page
- Bugfix - App Marketplace - Subscription Button update needed
- Bugfix - Service Marketplace - Page Padding Margin UI Fix and Provider Table Border Fix
- Bugfix - User Experience - delete request id from registration admin board

## 0.5.4

- Feature - Service Marketplace
- Feature - Identity Providers
- Feature - My Organization page
- Feature - App Release Process Steps 2 with business logic, 3 with api binding, 6 with UI, 4 with UI
- Feature - Search functionality added in Register Request table
- Feature - Add "CX Membership" flag in Partner Network
- Bugfix - Show loader on clicking decline or confirm from application request screen
- Bugfix - Show error popup on failure of approve or decline request
- Bugfix - Text updates on company data overlay
- Bugfix - Fixed modal width, subscribe refetch and services loading effect
- Bugfix - User Management - AddUser Roles missing

## 0.5.3

- Feature - App Release Process Step 1 implementation with api binding
- Feature - Show app roles in user details
- Feature - Connect Notifications API
- Feature - App Release Process Step 5 - Beta Test
- Feature - Search functionality added in Invite Business Partner page
- Feature - Identity provider list and detail view

## 0.5.2

- Feature - Added Release Notes ;)
- Feature - Technical User details page
- Feature - Technical User role selection dropdown
- Feature - User Management App Access Carousel
- Feature - App Release Process Step 1
- Feature - Digital Twin Table component exchange and deletion of faulty filters
- Feature - Partner Network single search for multiple endpoints & UI update
- Feature - Search in User and App User table
- Feature - New components date picker, table style, lightweight dropzone, in screen navigation, single dropdown, load button
- Bugfix - Business Apps displayed correctly and links working
- Bugfix - Restrict supported languages to 'en' and 'de' without local variants
- Bugfix - Removed empty 'Organization' option from user menu
- Bugfix - Footer fixed to bottom of window
- Bugfix - Some alignment and content fixes

### Older

- Defect - Page reloads when the auth token is renewed
- Defect - Latest apps are static
- Defect - Some footer pages and menu items are empty
