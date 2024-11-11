# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Cofinity-X Portal Frontend.

## Unreleased

### Changes

- **CX-Operator**
  - Change Override instead of Overwrite [PM2-1064](https://cofinity-x.atlassian.net/browse/PM2-1064)

### Bugfixes

- **OSP Management**

  - Update translations logic for Consent OSP roles [PM2-1064](https://cofinity-x.atlassian.net/browse/PM2-1064)
  - Fixed osp idp config detail information on re-opening overlay [PM2-1847](https://cofinity-x.atlassian.net/browse/PM2-1847)

- **Technical User Management**

  - Fixed Pagination and Added Variants for ServerSide, AutoLoadOnScroll and LoadMoreButton for Technical users Mangement page [PM2-1189](https://cofinity-x.atlassian.net/browse/PM2-1189)
  - Added Active, Inactive filters in technical user management

- **App Card Details**

  - Copy text and translations update as per design for roles section [PM2-1715](https://cofinity-x.atlassian.net/browse/PM2-1715)
  - Text update and translations added for cover image section [PM2-1713](https://cofinity-x.atlassian.net/browse/PM2-1713)
  - Translations and copy update as per design for change documents section [PM2-1714](https://cofinity-x.atlassian.net/browse/PM2-1714)
  - Copy text and translations update as per design for change documents section[PM2-1716](https://cofinity-x.atlassian.net/browse/PM2-1716)

- **Connector Registration**

  - Technical users created through Connectors do not appear immediately and only show up after the page is refreshed. [PM2-1606](https://cofinity-x.atlassian.net/browse/PM2-1606)

- **Added Missing Translations**

  - Added missing translations for idp [PM2-1603](https://cofinity-x.atlassian.net/browse/PM2-1603)

- **App Request**

  - Fixed UI issues in Registration Process pop up [PM2-833](https://cofinity-x.atlassian.net/browse/PM2-833)
- **App Release Process**


  - fix: increase image upload size app release process [PM2-347](https://cofinity-x.atlassian.net/browse/PM2-347)

- **Notifications**


  - Fixed notification rendering issues [PM2-369](https://cofinity-x.atlassian.net/browse/PM2-369)

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