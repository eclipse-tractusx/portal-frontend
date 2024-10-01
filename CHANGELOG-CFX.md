# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Cofinity-X Portal Frontend.

## 2.2.0-cfx-1

### Bug Fixes

- **Your Apps**

  - Updated UI styles in the Your Apps page [PM2-1450](https://cofinity-x.atlassian.net/browse/PM2-1450)

- **App Marketplace**

  - Updated state of a button after app subscription so that it will work for every subscription

- **User Account**

  - Updated translation for error msg and styles for disabled checkbox

- **Post Merge UI fixes**

  - Manged identity wallet: fix page ui and card text color [PM2-1394](https://cofinity-x.atlassian.net/browse/PM2-1394)
  - App overview: Translations and styles added [PM2-1392](https://cofinity-x.atlassian.net/browse/PM2-1392)
  - Service marketplace: button alignment and search [PM2-1391](https://cofinity-x.atlassian.net/browse/PM2-1391)

- **OSP Consent form**

  - Display invited company name in OSP consent form (Previously hard coded with 'BMW') [#1083](https://github.com/eclipse-tractusx/portal-frontend/pull/1083)

- **Service Release Process**

  - CHERRY-PICK fix: de description field is not validating umlauts [#993](https://github.com/eclipse-tractusx/portal-frontend/pull/993)
  - CHERRY-PICK fix: service details de description limitation [#1043](https://github.com/eclipse-tractusx/portal-frontend/pull/1043)

- **App Subscription**
  - Fixed close icon button in Success App subscription screen [PM2-863](https://cofinity-x.atlassian.net/browse/PM2-863)

- **App Release Process**

  - CHERRY-PICK Retain "None" Option in Technical User Setup After Submission [#1039](https://github.com/eclipse-tractusx/portal-frontend/pull/1039)

- **Connector Registration**

  - Fixed click on new technical user button [PM2-1504](https://cofinity-x.atlassian.net/browse/PM2-1504)

- **Notification Card Text Link translation**
  - Notifications card fixed translations [#1039](https://cofinity-x.atlassian.net/browse/PM2-1447?atlOrigin=eyJpIjoiOWI0ZDZhYTJjYjc3NGQxNjg3MjQ5YTJhYzY4NzA3YjEiLCJwIjoiaiJ9)

### Change

- **Service Marketplace**

  - Service Marketplace details page missing translations service detail page and UX updates. [PM2-1460](https://cofinity-x.atlassian.net/browse/PM2-1460)
  - Fixed filter sort dropdown menu in Service Marketplace. [PM2-1543](https://cofinity-x.atlassian.net/browse/PM2-1453)

- **Dataspace Participation**

  - Use case participation & Partner Network UI/UX and translation changes. [PM2-824](https://cofinity-x.atlassian.net/browse/PM2-824)

- **Technical Setup**

  - Technical Ssetup Pages: Technical User Management, Identity Provider, Connector registrsation and Semantic Hub UI/UX and translation changes. [PM2-825](https://cofinity-x.atlassian.net/browse/PM2-825)

- **App & Service Subscription**

  - Fix filter labels [PM2-508](https://cofinity-x.atlassian.net/browse/PM2-508)

- **User Management**

  - Header, Translation and Sub-navigation styles updates [PM2-1035](https://cofinity-x.atlassian.net/browse/PM2-1035)

- **OSP Management**

  - Activate OSP management page [PM2-1399s](https://cofinity-x.atlassian.net/browse/PM2-1399)

## 2.0.0-cfx-2

### Bug Fixes

- **User Account**

  - CHERRY-PICK fix: block user from removing own admin roles [#987] (https://github.com/eclipse-tractusx/portal-frontend/pull/987)

- **App Marketplace**
  - CHERRY-PICK fix: update the onButtonClick logic to avoid clicks after subscribed [#1042](https://github.com/eclipse-tractusx/portal-frontend/pull/1042)

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

- Make a consistent back button on entire website [PM2-1142](https://cofinity-x.atlassian.net/browse/PM2-1142)

## 2.0.0-cfx-1

## Change