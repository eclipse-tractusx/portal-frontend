# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Cofinity-X Portal Frontend.

## Unreleased

- **Analytics**

  - Add Hotjar script through GTM
  - Load different GTM containers per environment

- **Notifications**

  - Fix notification card as per wirefame [PM2-1498](https://cofinity-x.atlassian.net/browse/PM2-1498)

- **OSP Management**

  - Fixed OSP managent refresh glitch [PM2-1793](https://cofinity-x.atlassian.net/browse/PM2-1793)

- **Company Data**

  - Remove any case of null in company address [PM2-1749](https://cofinity-x.atlassian.net/browse/PM2-1749)

- **Shared Component**

  - Version updated to 3.7.2

- **UI/UX**

  - Add button hover effect in sub navigation [PM2-137](https://cofinity-x.atlassian.net/browse/PM2-137)
  - Keep OSP Management on the Main Navigation [PM2-2175](https://cofinity-x.atlassian.net/browse/PM2-2175)
  - CFX - Improve Partners Network page copywriting [PM2-2414](https://cofinity-x.atlassian.net/browse/PM2-2414)

### Changes

- **BP Explorer**

  - Enable BPX data provisioning in your company page [PM2-2212](https://cofinity-x.atlassian.net/browse/PM2-2212)
  - BPX data provisioning feature add [PM2-2184](https://cofinity-x.atlassian.net/browse/PM2-2184)
  - BPX data add separate HouseNumber optional field and Country list as dropdown [PM2-2265](https://cofinity-x.atlassian.net/browse/PM2-2265)
  - BPX add missing de translation edit address modal [PM2-2395](https://cofinity-x.atlassian.net/browse/PM2-2395)
  - BPX site detail overlay close after edit [PM2-2428](https://cofinity-x.atlassian.net/browse/PM2-2428)
  - BPN font size updated [PM2-2425](https://cofinity-x.atlassian.net/browse/PM2-2425)
  - Removed Site Sub-heading as Text from detail overlay [PM2-2427](https://cofinity-x.atlassian.net/browse/PM2-2427)

- **Main Navigation**

  - New breakpoint added for the main navigation at 1699px [PM2-2072](https://cofinity-x.atlassian.net/browse/PM2-2072)
  - Applied Company role condition on the Mobile Sidebar [PM2-2114](https://cofinity-x.atlassian.net/browse/PM2-2114)

- **Identity Provider Configuration**
  - Reset the Add IDP form value on creation [PM2-2090](https://cofinity-x.atlassian.net/browse/PM2-2090)
- **User Menu**

  - Display the notification count on the user menu [PM2-2071](https://cofinity-x.atlassian.net/browse/PM2-2071)

- **Your account**
  - Remove non functioning certificate section [2187](https://cofinity-x.atlassian.net/browse/PM2-2187)

### Bugfixes

- **Identity Provider Configuration**

  - Disable button if any field is invalid [PM2-2213](https://cofinity-x.atlassian.net/browse/PM2-2213)

- **User management**

  - CHERRY PICK Filter out app permissions from portal roles list [#1392](https://github.com/eclipse-tractusx/portal-frontend/pull/1392)

- **IDP**
  - Input field password toggle for OSP and IDP overlay [PM2-2332](https://cofinity-x.atlassian.net/browse/PM2-2332)
- **Service detail page**
  - updated incorrect provider information table label [PM2-2191](https://cofinity-x.atlassian.net/browse/PM2-2191)
- **Delete overlay**

  - Fix inconsistent styling [PM2-1938](https://cofinity-x.atlassian.net/browse/PM2-1938)

- **App access management**

  - Added message for unauthorised non-admin users [PM2-1449](https://cofinity-x.atlassian.net/browse/PM2-1449)

- **Your account**

  - UI updates and translations [PM2-1099](https://cofinity-x.atlassian.net/browse/PM2-1099)
  - Fixed button hover effect according to CX design [PM2-141](https://cofinity-x.atlassian.net/browse/PM2-141)
  - Removed unwanted box shadows from the User details [PM2-141](https://cofinity-x.atlassian.net/browse/PM2-141)
  - Change rendering layout of admin email's [PM2-1103](https://cofinity-x.atlassian.net/browse/PM2-1103)

- **Usecase Participation**

  - Add filtered options to usecase participation list [PM2-1888](https://cofinity-x.atlassian.net/browse/PM2-1888)

- **Technical User Management**

  - Hide create technical user btn & description for unauthorised users [PM2-1866](https://cofinity-x.atlassian.net/browse/PM2-1866)
  - Make status tag color conditional [PM2-1866](https://cofinity-x.atlassian.net/browse/PM2-1866)
  - Masking client secret [PM2-113](https://cofinity-x.atlassian.net/browse/PM2-113)
  - Updated masking logic and added error handling [CS-2498] (https://cofinity-x.atlassian.net/browse/CS-2498)

- **Business Partner Explorer**

  - BP explorer table set to show for companies with correct roles [PM2-2143](https://cofinity-x.atlassian.net/browse/PM2-2143)
  - Enable Business Partner Explorer [PM2-2119](https://cofinity-x.atlassian.net/browse/PM2-2119)
  - Removed the edit button in Business Partner Explorer [PM2-2119](https://cofinity-x.atlassian.net/browse/PM2-2119)
  - Fix payload for the site in BP explorer [PM2-2155](https://cofinity-x.atlassian.net/browse/PM2-2155)

- **Notifications**

  - Fix update role notifications UI [PM2-938](https://cofinity-x.atlassian.net/browse/PM2-938)

- **Service Marketplace**

  - Fix borken listing card UI [PM2-2402](https://cofinity-x.atlassian.net/browse/PM2-2402)

- **Service Release Process**
  - Fix borken image preview on step of verify & submit [PM2-2404](https://cofinity-x.atlassian.net/browse/PM2-2404)

## 2.2.0-cfx-5

### Bugfixes

- **Table component**

  - Hide unnecessary row count in title [PM2-2043](https://cofinity-x.atlassian.net/browse/PM2-2043)

- **OSP Management**

  - Update osp mgmt table column name to alias [PM2-1921](https://cofinity-x.atlassian.net/browse/PM2-1921)
  - Hide osp mgmt navigation tab from non I.T.admins [PM2-2059](https://cofinity-x.atlassian.net/browse/PM2-2059)
  - Fixed routing issue for the Technical User Management [PM2-1472](https://cofinity-x.atlassian.net/browse/PM2-1472)
  - Add meta url https hint to cfx translation files [PM2-1903](https://cofinity-x.atlassian.net/browse/PM2-1903)

- **OSP consent**

  - Remove function causing empty download [PM2-1792](https://cofinity-x.atlassian.net/browse/PM2-1792)
  - CHERRY-PICK add missing short name field osp consent form [#1341](https://github.com/eclipse-tractusx/portal-frontend/pull/1341)
  - Added shortname translations en&de [PM2-2057](https://cofinity-x.atlassian.net/browse/PM2-2057)
  - Redirect user home if consent form is submitted [PM2-1846](https://cofinity-x.atlassian.net/browse/PM2-1846)

- **Cookie Policy**

  - Load cookie policy script after user login [PM2-1851](https://cofinity-x.atlassian.net/browse/PM2-1851)

- **User Management**

  - Update subtitle copywriting text in assigning Portal role Modal [PM2-1067](https://cofinity-x.atlassian.net/browse/PM2-1067)
  - Fixed over lapping issue on user management roles chips [PM2-242](https://cofinity-x.atlassian.net/browse/PM2-242)
  - Change status tag badge color to refelct cfx styles [PM2-1449](https://cofinity-x.atlassian.net/browse/PM2-1449)
  - Fixed added back button in User Detail Management [PM2-1049](https://cofinity-x.atlassian.net/browse/PM2-1049)
  - Fixed DE Translation of the title and subtitle in assigning Portal role Modal [PM2-1065](https://cofinity-x.atlassian.net/browse/PM2-1065)

- **Your Account**

  - Fixed authentication json issue on beta [PM2-2078](https://cofinity-x.atlassian.net/browse/PM2-2078)

- **Main Navigation**


  - Fixed onboarding wording issue on German [PM2-1648](https://cofinity-x.atlassian.net/browse/PM2-1648)

- **Technical User Management**
  - Hide create technical user btn & description for unauthorised users [PM2-1866](https://cofinity-x.atlassian.net/browse/PM2-1866)
  - Make status tag color conditional [PM2-1866](https://cofinity-x.atlassian.net/browse/PM2-1866)

## 2.2.0-cfx-4

### Changes

- **Cookie Policy**

  - Load cookie policy script after user login [PM2-140](https://cofinity-x.atlassian.net/browse/PM2-140)

- **IDP Management**

  - Fixed managed/own IDP generic error message, logic and translations [PM2-1760](https://cofinity-x.atlassian.net/browse/PM2-1760)

- **Credential Request Overview**

  - Temporarily hide search field [PM2-1586](https://cofinity-x.atlassian.net/browse/PM2-1586)

- **App Overview**

  - Fix lead image preview issue in apps overview [#1365](https://cofinity-x.atlassian.net/browse/PM2-1365)

- **CX-Operator**
  - Change Override instead of Overwrite [PM2-1064](https://cofinity-x.atlassian.net/browse/PM2-1064)

### Bugfixes

- **Company Subscriptions**

  - fix text hidden for disabled buttons in Company Subscriptions page [#1892](https://cofinity-x.atlassian.net/browse/PM2-1892)

- **Service Marketplace**

  - add providerUri in the provider details page in Service Marketplace [PM2-868](https://cofinity-x.atlassian.net/browse/PM2-868)

- **OSP Management**

  - Update translations logic for Consent OSP roles [PM2-1064](https://cofinity-x.atlassian.net/browse/PM2-1064)
  - Fixed osp idp config detail information on re-opening overlay [PM2-1847](https://cofinity-x.atlassian.net/browse/PM2-1847)
  - Fixed osp customer overview table incorrect unique id [PM2-1803]https://cofinity-x.atlassian.net/browse/PM2-1803
  - Fixed osp onboarding Management Header Title Transation [PM2-1647](https://cofinity-x.atlassian.net/browse/PM2-1647)
  - Fixed disabled submit button osp callback url form [PM2-1901](https://cofinity-x.atlassian.net/browse/PM2-1901)
  - Fixed osp managament customer overview table type error [PM2-1899](https://cofinity-x.atlassian.net/browse/PM2-1899)

- **Technical User Management**

  - Fixed Pagination and Added Variants for ServerSide, AutoLoadOnScroll and LoadMoreButton for Technical users Mangement page [PM2-1189](https://cofinity-x.atlassian.net/browse/PM2-1189)
  - Added Active, Inactive filters in technical user management
  - Fixed action on close in Delelte User in Technical User Deatils [PM2-1783](https://cofinity-x.atlassian.net/browse/PM2-1783)

- **App Card Details**

  - Copy text and translations update as per design for roles section [PM2-1715](https://cofinity-x.atlassian.net/browse/PM2-1715)
  - Text update and translations added for cover image section [PM2-1713](https://cofinity-x.atlassian.net/browse/PM2-1713)
  - Translations and copy update as per design for change documents section [PM2-1714](https://cofinity-x.atlassian.net/browse/PM2-1714)
  - Copy text and translations update as per design for change documents section[PM2-1716](https://cofinity-x.atlassian.net/browse/PM2-1716)

- **Connector Registration**

  - Technical users created through Connectors do not appear immediately and only show up after the page is refreshed. [PM2-1606](https://cofinity-x.atlassian.net/browse/PM2-1606)
  - Fixed Server Side Pagination logic and passed the variant [PM2-1829](https://cofinity-x.atlassian.net/browse/PM2-1829)

- **Added Missing Translations**

  - Added missing translations for idp [PM2-1603](https://cofinity-x.atlassian.net/browse/PM2-1603)

- **App Request**

  - Fixed UI issues in Registration Process pop up [PM2-833](https://cofinity-x.atlassian.net/browse/PM2-833)
- **App Release Process**


  - fix: increase image upload size app release process [PM2-347](https://cofinity-x.atlassian.net/browse/PM2-347)

- **Notifications**


  - Fixed notification rendering issues [PM2-369](https://cofinity-x.atlassian.net/browse/PM2-369)
  - Fixed notifications mark as read issue [PM2-1006](https://cofinity-x.atlassian.net/browse/PM2-1006)

- **App & Service Subscription**


  - Fixed missing description in service subscription request detail page [PM2-1753](https://cofinity-x.atlassian.net/browse/PM2-1753)
  - Remove help links from app & service subscription detail [PM2-802](https://cofinity-x.atlassian.net/browse/PM2-802)
  - Fixed searching issue [#PM2-1663](https://cofinity-x.atlassian.net/browse/PM2-1663)
  - Fixed technical users rendering issue in detail page [PM2-1755](https://cofinity-x.atlassian.net/browse/PM2-1755)
  - Disabled unsubscribe button if user does not have role [PM2-1508](https://cofinity-x.atlassian.net/browse/PM2-1508)

- **App Overview**

  - Replaced cofinity-x with catena-x as image overview text [PM2-1516](https://cofinity-x.atlassian.net/browse/PM2-1516)
  - Removed Incorrect Message Displayed on Update Add Apps [PM2-1820](https://cofinity-x.atlassian.net/browse/PM2-1820)
  - Fixed german translation in german version [PM2-1822](https://cofinity-x.atlassian.net/browse/PM2-1822)
  - Added missing translation for change description of success message [PM2-1821](https://cofinity-x.atlassian.net/browse/PM2-1821)
  - Added missing translation for cover image of success message [PM2-1819](https://cofinity-x.atlassian.net/browse/PM2-1819)
  - added missing german translation for add role success message [PM2-1810](https://cofinity-x.atlassian.net/browse/PM2-1810)
  - Fixed redirection issue after role updates in your apps [PM2-1806](https://cofinity-x.atlassian.net/browse/PM2-1806)
  - Fixed misaligned hover effect on Add Role page [PM2-1809](https://cofinity-x.atlassian.net/browse/PM2-1809)
  - Fixed misaligned hover effect on changes images and documents [PM2-1817](https://cofinity-x.atlassian.net/browse/PM2-1817)
  - Fixed allowed max image size [PM2-347](https://cofinity-x.atlassian.net/browse/PM2-347)
  - Fixed phone regex and error message for app registration [PM2-1855](https://cofinity-x.atlassian.net/browse/PM2-1855)

- **Search Translation for App and Service Subsciption**


  - fixed DE translation for search input in App and Service Subsciption [#162](https://cofinity-x.atlassian.net/browse/PM2-162?atlOrigin=eyJpIjoiYmY5NWJmODQwYWViNGM5NGIwODRiYzgwNDkxYjkyMGYiLCJwIjoiaiJ9)

- **Service Detail**

  - Fixed broken image ui (#PM2-1744)[https://cofinity-x.atlassian.net/browse/PM2-1744]
  - Fixed service detail status issue (#PM2-1745)[https://cofinity-x.atlassian.net/browse/PM2-1745]

- **Service Request Management**

  - Service Management | 400 Bad Request when Clicking 'Load More' Button [#1175](https://github.com/eclipse-tractusx/portal-frontend/pull/1175)

- **Service Marketplace**

  - Header menu overlapping with page content [#1688](https://cofinity-x.atlassian.net/browse/PM2-1688?atlOrigin=eyJpIjoiMDM4NjY0MDU5ZTExNDZlNTllZjNhN2JhMTZmMTZjYjIiLCJwIjoiaiJ9)

- **Sematic Hub**
  - Sematic Hub | Fixed search text issue (PM2-1709)[https://cofinity-x.atlassian.net/browse/PM2-1709]
- **OSP registartion callback URL**
  - Added Auth-Url field in Configure Idp MetaDatab Overlay (PM2-1788)[https://cofinity-x.atlassian.net/browse/PM2-1788]
- **Technical Setup | Connector Management**

  - Edit URL error message persists in connector configuration [#307](https://github.com/Cofinity-X/portal-frontend/pull/307)

- **App Marketplace Management**

  - Fixed document upload and delete success message on DE [PM2-1823](https://cofinity-x.atlassian.net/browse/PM2-1823)

- **Partner Network**

  - Fixed incorrect post api object keys and structure for company search [PM2-1841](https://cofinity-x.atlassian.net/browse/PM2-1841)

- **Service Marketplace**

- **Service Release | Overview Inreview filter**:

  - Introduced filter of in-review in service overview page [#411](https://cofinity-x.atlassian.net/browse/PM2-411)
  - **User Management**
  - Fixed: CHERRY-PICK Prevented admins from proceeding with role assignment without selecting a user. [#1270](https://github.com/eclipse-tractusx/portal-frontend/pull/1270)
  - Removed extra confirmation messages from the delete dialog. [#PM2-1580](https://cofinity-x.atlassian.net/browse/PM2-1580)
  - Fixed issue on bulk upload multiple role selection [PM2-1400](https://cofinity-x.atlassian.net/browse/PM2-1400)

  - **Your Account**
  - Fixed authentication json issue on prod [PM2-1750](https://cofinity-x.atlassian.net/browse/PM2-1750)

- **App Subscription**

  - Fixed activation app subscription button issue [PM2-1850](https://cofinity-x.atlassian.net/browse/PM2-1850)

- **App Roles**
  - Fixed DE & EN translation issue on app roles [PM2-1082](https://cofinity-x.atlassian.net/browse/PM2-1082)
  - Fixed Add roles for multiple User by row selection [PM2-1912](https://cofinity-x.atlassian.net/browse/PM2-1912)

## 2.2.0-cfx-3-hotfix3

### Bugfixes

- **Application Requests**

  - Updated the logic to display documents uploaded while registration [PM2-1759](https://cofinity-x.atlassian.net/browse/PM2-1759)

## 2.2.0-cfx-3-hotfix1

### Bugfixes

- **Company Subscriptions**
  - fixed wrong hyperlink and role requirement for technical user details in company subscription details [#1220](https://github.com/eclipse-tractusx/portal-frontend/pull/1220)

- **Technical User Management**

  - Technical User Management roles description rerendered on language switch [PM2-1144](https://cofinity-x.atlassian.net/browse/PM2-1144)

- **Connector Registration**
  - Error/Confirmation message, and other translations updated in the Connector Registration page [PM2-1138](https://cofinity-x.atlassian.net/browse/PM2-1138)

### Change

- **Connector Registration**
  - Added dynamic connector urls [PM2-1731](https://cofinity-x.atlassian.net/browse/PM2-1731)

## 2.2.0-cfx-2

### New Features

- **Managed connectors**

  - Enable Provided Connectors for App/Service Providers [#1683](https://cofinity-x.atlassian.net/browse/PM2-1683)

- **Business parter invite**

  - CHERRY-PICK allow all language characters symbols [#1189](https://github.com/eclipse-tractusx/portal-frontend/pull/1189)

- **Partner Network**
  - Modify partner network api to call backend api for firewall workaround [PM2-1612](https://cofinity-x.atlassian.net/browse/PM2-1612)

### Bug Fixes

- **App Management**

  - replaced hardcoded images in service marketplace and detail [#1195](https://github.com/eclipse-tractusx/portal-frontend/issues/1195)

- **Service Release Process**

  - CHERRY-PICK Fixed "None" selection issue in Technical Integration [#1161](https://github.com/eclipse-tractusx/portal-frontend/issues/1161)

- **User Management**

  - CHERRY-PICK Fixed special characters in user management email filters [#1128](https://github.com/eclipse-tractusx/portal-frontend/issues/1128)

### Change

- **Connector Registration**
  - Remove hardcoded connector urls [PO-397](https://cofinity-x.atlassian.net/browse/PO-397)

## 2.2.0-cfx-1

- **App subscription**

  - CHERRY-PICK add external service details in subscription management overlay [#1028](https://github.com/eclipse-tractusx/portal-frontend/pull/1028)

### Bug Fixes

- **Application Requests**

  - Adjusted the width of columns, added ellipsis and tooltip on column cells [#233](https://github.com/Cofinity-X/portal-frontend/pull/233)

- **User Management**

  - fixed logic for showing user_id for OWN configured IDP [PM2-1671](https://cofinity-x.atlassian.net/browse/PM2-1671)

- **Your Apps**

  - Updated UI styles in the Your Apps page [PM2-1450](https://cofinity-x.atlassian.net/browse/PM2-1450)

- **App subscription**

  - Updated translations and fixed UI styles [PM2-1451](https://cofinity-x.atlassian.net/browse/PM2-1451)
  - Updated translations for Technical User Name / Permission on the 'Provider View' pop-up [PM2-1476](https://cofinity-x.atlassian.net/browse/PM2-1476)
  - Added missing cfx translations external services app subscription overlay [PM2-1645](https://cofinity-x.atlassian.net/browse/PM2-1645)

- **App Marketplace**

  - Updated state of a button after app subscription so that it will work for every subscription

- **User Account**

  - Updated translation for error msg and styles for disabled checkbox

- **Post Merge UI fixes**

  - Manged identity wallet: fix page ui and card text color [PM2-1394](https://cofinity-x.atlassian.net/browse/PM2-1394)
  - App overview: Translations and styles added [PM2-1392](https://cofinity-x.atlassian.net/browse/PM2-1392)
  - Service marketplace: button alignment and search [PM2-1391](https://cofinity-x.atlassian.net/browse/PM2-1391)
  - OSP consent from UI update [PM2-1093](https://cofinity-x.atlassian.net/browse/PM2-1093)

- **OSP Consent form**

  - Display invited company name in OSP consent form (Previously hard coded with 'BMW') [#1083](https://github.com/eclipse-tractusx/portal-frontend/pull/1083)
  - Update translation files osp consent form [PM2-1093](https://cofinity-x.atlassian.net/browse/PM2-1093)
  - Update logic for multiple unique identifiers [PM2-1419](https://cofinity-x.atlassian.net/browse/PM2-1419)

- **Service Release Process**

  - CHERRY-PICK fix: de description field is not validating umlauts [#993](https://github.com/eclipse-tractusx/portal-frontend/pull/993)
  - CHERRY-PICK fix: service details de description limitation [#1043](https://github.com/eclipse-tractusx/portal-frontend/pull/1043)

- **App Subscription**
  - Fixed close icon button in Success App subscription screen [PM2-863](https://cofinity-x.atlassian.net/browse/PM2-863)

- **App Release Process**

  - CHERRY-PICK Retain "None" Option in Technical User Setup After Submission [#1039](https://github.com/eclipse-tractusx/portal-frontend/pull/1039)
  - Fixed Maximum images upload issue in Dropzone [#PM2-1090](https://cofinity-x.atlassian.net/browse/PM2-1090)
  - Regex updated to allow line breaks for short description EN&DE [#PM2-354](https://cofinity-x.atlassian.net/browse/PM2-354)

- **Connector Registration**

  - Fixed click on new technical user button [PM2-1504](https://cofinity-x.atlassian.net/browse/PM2-1504)

- **Notification Card Text Link translation**

  - Notifications card fixed translations [#1039](https://cofinity-x.atlassian.net/browse/PM2-1447?atlOrigin=eyJpIjoiOWI0ZDZhYTJjYjc3NGQxNjg3MjQ5YTJhYzY4NzA3YjEiLCJwIjoiaiJ9)
  - Fixed service release notification rendering issue [PM2-937](https://cofinity-x.atlassian.net/browse/PM2-937)

- **Service Subscription Header headline translation**

  - Fixed translations for Deutsch and english in servicerelease.json translation [#1039](https://github.com/Cofinity-X/portal-frontend/pull/186)

- **Compliance Footer links updated**

  - Replaced old footer links with new link [#189](https://cofinity-x.atlassian.net/browse/PM2-1583?atlOrigin=eyJpIjoiOGNkNzlkZTAxN2VhNGYwODk0OTExZWFjNTIwMjg0Y2UiLCJwIjoiaiJ9)

- **Your Apps**
  - Fixed UI as per the design [#PM2-1459](https://cofinity-x.atlassian.net/browse/PM2-1459)
  - Make it consistent with app details wording [#PM2-1092](https://cofinity-x.atlassian.net/browse/PM2-1092)
  - Fixed Conformity document rendering issue in App Details [PM2-848](https://cofinity-x.atlassian.net/browse/PM2-848)
- **Placeholder text for App and Service Subscription**


  - Replaced relevent text for search for app and service in company subscription [#191](https://cofinity-x.atlassian.net/browse/PM2-1535?atlOrigin=eyJpIjoiN2VhNzc5ZWE0YzE0NDIwZjliZjBmMDZkMTk3YWE5ZjgiLCJwIjoiaiJ9)

- **Your Services**

  - Add new services title make it center [PM2-1459](https://cofinity-x.atlassian.net/browse/PM2-1459)

- **Service Release**

  - regex and error message updated to allow more characters [#416](https://github.com/eclipse-tractusx/portal-frontend/pull/416)
  - regex updated to allow line breaks for long and short description [#1462](https://github.com/eclipse-tractusx/portal-frontend/pull/1462)

- **Service Request Management**

  - Back button make it outlined in Service Request Management [PM2-1143](https://cofinity-x.atlassian.net/browse/PM2-1143)
  - Fixed Sorting & Filtering issue [PM2-801](https://cofinity-x.atlassian.net/browse/PM2-801)

- **Partner Network**

  - Modify partner network api to call backend api for firewall workaround [PM2-1612](https://cofinity-x.atlassian.net/browse/PM2-1612)

- **App & Service Subscription**
- Fixed service subscription detail issue as per service detail [PM2-1669](https://cofinity-x.atlassian.net/browse/PM2-1669)

- **Your Services**

  - Add new services title make it center [PM2-1459](https://cofinity-x.atlassian.net/browse/PM2-1459)

- **Service Release**

  - regex and error message updated to allow more characters [#416](https://github.com/eclipse-tractusx/portal-frontend/pull/416)
  - regex updated to allow line breaks for long and short description [#1462](https://github.com/eclipse-tractusx/portal-frontend/pull/1462)

- **Service Request Management**

  - Back button make it outlined in Service Request Management [PM2-1143](https://cofinity-x.atlassian.net/browse/PM2-1143)

- **Partner Network**

  - Modify partner network api to call backend api for firewall workaround [PM2-1612](https://cofinity-x.atlassian.net/browse/PM2-1612)

- **App & Service Subscription**
- Fixed service subscription detail issue as per service detail [PM2-1669](https://cofinity-x.atlassian.net/browse/PM2-1669)

### Change

- **Release Process apps/services**

  - remove Remove Data Sovereignty Guidelines checkbox and link [PM2-1695](https://cofinity-x.atlassian.net/browse/PM2-1695)

- **Your apps**

  - Translations updated for the menu items and on the menu detail pages. [PM2-1066](https://cofinity-x.atlassian.net/browse/PM2-1066)

- **Service Marketplace**

  - Service Marketplace details page missing translations service detail page and UX updates. [PM2-1460](https://cofinity-x.atlassian.net/browse/PM2-1460)
  - Fixed filter sort dropdown menu in Service Marketplace. [PM2-1543](https://cofinity-x.atlassian.net/browse/PM2-1453)

- **Dataspace Participation**

  - Use case participation & Partner Network UI/UX and translation changes. [PM2-824](https://cofinity-x.atlassian.net/browse/PM2-824)

- **Technical Setup**

  - Technical Setup Pages: Technical User Management, Identity Provider, Connector registrsation and Semantic Hub UI/UX and translation changes. [PM2-825](https://cofinity-x.atlassian.net/browse/PM2-825)

- **App & Service Subscription**

  - Fix filter labels [PM2-508](https://cofinity-x.atlassian.net/browse/PM2-508)
  - App & Service Subscription detail page updated with translations [PM2-1536](https://cofinity-x.atlassian.net/browse/PM2-1536)

- **User Management**

  - Header, Translation and Sub-navigation styles updates [PM2-1035](https://cofinity-x.atlassian.net/browse/PM2-1035)
  - Restrict non OSP companies and unauthorised users [PM2-1487](https://cofinity-x.atlassian.net/browse/PM2-1487)

- **OSP Management**

  - Activate OSP management page [PM2-1399s](https://cofinity-x.atlassian.net/browse/PM2-1399)

## 2.0.0-cfx-2

### Bug Fixes

- **User Account**

  - CHERRY-PICK fix: block user from removing own admin roles [#987] (https://github.com/eclipse-tractusx/portal-frontend/pull/987)

- **App Marketplace**
  - CHERRY-PICK fix: update the onButtonClick logic to avoid clicks after subscribed [#1042](https://github.com/eclipse-tractusx/portal-frontend/pull/1042)
- **Service Marketplace**
  - CHERRY-PICK fix(service detail): add missing header image implementation [#992](fix(service detail): add missing header image implementation #992)
- **Search UI Adjustment in Your Service**
  - Adjusted spaces around the searchbar in Your Service [#222]https://github.com/Cofinity-X/portal-frontend/pull/222)

### Change

- **File Link Text**

  - Updated color of the Link text for files download [PM2-506](https://github.com/Cofinity-X/portal-frontend/pull/155)

- **Main Header Component**

  - To allow the text in MainHeader to be in 3 lines with fixed header height and heading postions [#118](https://github.com/Cofinity-X/portal-frontend/pull/118)
  - CHERRY-PICK Overview My App button not working on App Release Process page [#1023](https://github.com/eclipse-tractusx/portal-frontend/pull/1023)

- **App Subscription**

  - CHERRY-PICK remove subscribe_service requirement for app subscription [#1013](https://github.com/eclipse-tractusx/portal-frontend/pull/1013)
  - CHERRY-PICK Overview My App button not working on App Release Process page [#1023](https://github.com/eclipse-tractusx/portal-frontend/pull/1023)

  **App Technical Intergration**

  - CHERRY-PICK Fixed role upload does not work using Firefox Windows [#1003](https://github.com/eclipse-tractusx/portal-frontend/pull/1003)

- **Dataspace Participation**

  - Partner Network & Dataspace Participation wording changes [PM2-824](https://cofinity-x.atlassian.net/browse/PM2-824)

- **Connector Registration**

  - Remaining Wording & Copywriting changes of Connector Registration page [PM2-811](https://cofinity-x.atlassian.net/browse/PM2-811)
  - Delete Modal copy writing changes [PM2-811](https://cofinity-x.atlassian.net/browse/PM2-811)

- **App Access Management**

  - CHERRY-PICK Fix 400 Bad Request error in App Access Management -> Add Role search filter [#1057](https://github.com/eclipse-tractusx/portal-frontend/issues/1057)

- **Technical User Management**

  - Fixed UI/Translation issues. [PM2-1145](https://cofinity-x.atlassian.net/browse/PM2-1145)

- **App Release Process**

  - Fixed UI/UX issues. [PM2-509](https://cofinity-x.atlassian.net/browse/PM2-509)
  - Fixed back button issue on first step [PM2-1458](https://cofinity-x.atlassian.net/browse/PM2-1458)

- **App Details**
- Removed dummy text from the App Detail. [PM2-1024](https://cofinity-x.atlassian.net/browse/PM2-1024)

- **App Overview**
- Increased search delay to improve performance. [PM2-959](https://cofinity-x.atlassian.net/browse/PM2-959)

- Make a consistent back button on entire website [PM2-1142](https://cofinity-x.atlassian.net/browse/PM2-1142)

## 2.0.0-cfx-1

## Change