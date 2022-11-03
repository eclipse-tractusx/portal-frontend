# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend.


### Unreleased

* ...
* ...


## 0.7.0

### Change
* App Release Process
   * Added headline and subtext
   * Removed input field placeholders where not necessary
   * Activated app card always on viewport function inside the app card creation of the app release process
   * Updated app card sizing
* Service Marketplace
   * Service subscription detail section - added subscription status

### Feature
* App Marketplace
   * Subscription data submission to third party and enablement of terms & condition agreement/consent
* User Management
   * App role assignment for multiple users implemented

### Technical Support
* n/a

### Bugfix
* App Release Process - Page sizing fixed
* My Organization - BPN data field allocation aligned
* User Management - User table auto-refresh enabled after new user invite; business logic of user status inside the user table updated to display correct status
* Central Search - Result list gave an issue on app title value


## 0.6.0

### Change
* n/a

### Feature
* Application Management Board: Manage application request (by viewing company details and documents) and approve or cancel company applications.
* User Management: View own company users, invite new users and assign app roles for subscribed apps. Additionally the technical user self-service got released and supports now the creation of technical users as part of the user company account.
* App Marketplace: Enables user to search for apps, display app details and subscribe for an app. Also app favorites tags are added.
* App Overview: App overview supports the app provider to see own published apps, check the status, progress unfinished app releases and start the registration of a new app.
* UiComponents: SharedUiComponent library got released and is usable for other projects with a number of ui react components

### Technical Support
* n/a

### Bugfix
* n/a


## 0.5.5

* Feature - App Overview page
* Feature - Add and edit Identity Provider details
* Feature - BPN add/delete flow in User Account Screen
* Feature - User Management - Success/Fail Message
* Feature - Expand on hover feature added to  CardHorizontal component.
* Feature - Add download document in application request page
* Feature - Add User Role Overlay (refactoring)
* Feature - Assign user role (refactoring)
* Feature - Show subscription box after subscribed immediately
* Feature - App Release Process - upload functionality
* Feature - App Detail - Fetch Documents
* Feature - Shared Components - Transmission Chip button
* Feature - App Release Process - Business Logic & API - Submit App for review
* Feature - Transition button added to Registration table
* Feature - Expand on hover feature added to  CardHorizontal component.
* Feature - Add download document in application request page
* Feature - Add User Role Overlay (refactoring)
* Feature - App Release Process - upload functionality
* Bugfix - Connect Partner Network to BPDM
* Bugfix - UI updates in UltimateToolbar component
* Bugfix - Registration table UI fixes
* Bugfix - App Release Process - Fixed browser back button issue
* Bugfix - User Management Main Page Style fix
* Bugfix - App Release Process - Fixed user directing to bottom of the page
* Bugfix - Services Card Responsive UI Fix
* Bugfix - Partner network search issue fix
* Bugfix - CardHorizontal - Height issue fix
* Bugfix - Bind app subscribe status in my organization page
* Bugfix - App Marketplace - Subscription Button update needed
* Bugfix - Service Marketplace - Page Padding Margin UI Fix and Provider Table Border Fix 
* Bugfix - User Experience - delete request id from registration admin board


## 0.5.4

* Feature - Service Marketplace
* Feature - Identity Providers
* Feature - My Organization page
* Feature - App Release Process Steps 2 with business logic, 3 with api binding, 6 with UI, 4 with UI
* Feature - Search functionality added in Register Request table
* Feature - Add "CX Membership" flag in Partner Network
* Bugfix - Show loader on clicking decline or confirm from application request screen
* Bugfix - Show error popup on failure of approve or decline request
* Bugfix - Text updates on company data overlay
* Bugfix - Fixed modal width, subscribe refetch and services loading effect
* Bugfix - User Management - AddUser Roles missing


## 0.5.3

* Feature - App Release Process Step 1 implementation with api binding
* Feature - Show app roles in user details
* Feature - Connect Notifications API
* Feature - App Release Process Step 5 - Beta Test
* Feature - Search functionality added in Invite Business Partner page
* Feature - Identity provider list and detail view


## 0.5.2

* Feature - Added Release Notes ;)
* Feature - Technical User details page
* Feature - Technical User role selection dropdown
* Feature - User Management App Access Carousel
* Feature - App Release Process Step 1
* Feature - Digital Twin Table component exchange and deletion of faulty filters
* Feature - Partner Network single search for multiple endpoints & UI update
* Feature - Search in User and App User table
* Feature - New components date picker, table style, lightweight dropzone, in screen navigation, single dropdown, load button
* Bugfix - Business Apps displayed correcty and links working
* Bugfix - Restrict supported languages to 'en' and 'de' without local variants
* Bugfix - Removed empty 'Organization' option from user menu
* Bugfix - Footer fixed to bottom of window
* Bugfix - Some alignment and content fixes


### Older

* Defect - Page reloads when the auth token is renewed
* Defect - Latest apps are static
* Defect - Some footer pages and menu items are empty
