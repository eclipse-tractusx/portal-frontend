# Changelog

New features, fixed bugs, known defects and other noteworthy changes to each release of the Catena-X Portal Frontend.

## Unreleased

* Application Checklist
   BugFix - Checklist layout issue fix


## 1.3.0 RC1

### Change
* App Release Process
  * updated endpoint to post and get agreement consent
  * switched endpoint to retrieve cx frame documents from portal backend for consent section
  * document upload error message customization activated and new error message for file size set
* Service Release Process
  * updated GET and POST endpoint handling to store and fetch service details from the backend and display them inside the service release form
  * switched endpoint to retrieve cx frame documents from portal backend
  * updated endpoint to post agreement consent
* Switch IdP
  * additional user support and new style added for easier process handling

### Feature
* Service Release Process
  * implement service type function with backend connection
  * added load button function for service release form - button "submit" and "confirm"/"proceed"
* App Release Process
  * added app privacy policy select function inside the app release process form
* Service Management (Service Provider)
  * implemented service overview for app provider to display all owned services in all states (incl. search, filter and sort)
  * implemented service detail page

### Technical Support
* added temp fix for CVE-2023-0464
* added build workflow for v1.3.0 release candidate phase
* updated actions workflows

### Bugfix
* App Release Process
  * update input field validation for longDescription input field
* User Management
  * payload fixed to portal roles only when updating user assigned portal roles 
* App Release Admin Page - App Detail Page
  * updated business logic to consume use case data due to updated api response body style
* Service Marketplace - Service Detail Page
  * updated business logic to consume use case data due to updated api response body style

## 1.2.0

### Change
* Dropzone costum error support implemented

### Feature
* UserManagement
   * add role description details into the user account creation overlay and linking the description with the new developed/released role description detail page
* App Marketplace
   * app detail page got enhanced by "Privacy Policies"
* App Approval Admin Board
   * app detail page endpoint switched to /inReview/{appId}
   * app detail page "App Roles" added
   * app detail page "Privacy Policy" added
   * removes placeholder sections and implemented UI changes
* User Account Screen
   * add section with user assigned portal roles
   * add action button and overlay to update user assigned portal roles
* Service Release Process
   * implement service release process form and connected backend services /createService, /serviceStatus, /and Update service apis added
* App Release Process
   * enabled document download in contract and consent
   * enabled document deletion inside the app release form
   * changed additional document uploads from mandatory to optional and changed dropzone parameter size

### Technical Support
* Improved page loading in several places (such as app overview) 
* Change local port to run behind reverse proxy
* Improved responsiveness of use case introduction page and company role page

### Bugfix
* Image import via api image/document endpoint implemented for organization/myCompanySubscription section
* Fixed display documents feature. Only first document got displayed (Admin App Approval Board - App Detail page, App Marketplace App Detail Page)
* App Release Process - when opening a previously saved app - "save & proceed" is disabled is fixed
* Home - Recommended section images not loading fix
* Application Request Board styling of the application status bar for application fully "DONE" but activation outstanding
* App Release Process - updated long description input validation
* App Release Process - updated business logic to retrieve app use case in new api response format

## 1.1.0

### Change
* Service Marketplace
   * documents displayed on service detail page connected to backend call (view and download documents)
   * updated styling of multiple subscription display section
   * service marketplace service card enhanced by short description
* SharedUIComponents
  * modal image behavior for different devices updated

### Feature
* App Conformity Document handling enabled
  * enhanced app release process with conformity upload section
  * enhance app release process "verify data" with conformity document view and download option
  * app admin board - app detail page enhanced by adding conformity document view and download
* SharedUIComponents
  * image gallery - added grid layout & parameter to display images in 16:9 ratio
* Service Release Management
  * implemented new top navigation section und sub-menu
  * implemented service release process intro page
  * implemented service release form (initial)

### Technical Support
* added a new smart image component to handle all kinds of images, display placeholder while loading and error image on failure
* fix(cve-2023-23916): add package upgrade as temp fix
* chore (gh-org-checks): rename file for stable trivy scan
* chore enable multi branch: add latest tag to released images
* created new component to reduce code duplications between app release process & service release process intro pages

### Bugfix
* Notification - App Subscription Activation - linked URL updated to 'User Management'
* Connector - DAPS registration retriggering allowed upload document types restricted
* Application Request - Approve/Decline/Retrigger/Cancel Process actions will clear button section and update the checklist/process status inside the overlay as well as the application list

## 1.0.0-RC10

### Change
* Get App Image backend connection updated for (AppMarketplace, AppDetails, App Overview & AdminBoard)

### Feature
* "No Items Found" page/section implemented for (AppMarketplace, ServiceMarketplace, AppOverview, AppSubscription & AdminBoard)
* Application Registration Validation Process - enabled retrigger process of application checklist steps in the overlay screens if applicable
* App Release Process - added delete document function

### Technical Support
n/a

### Bugfix
* Update styling App Management Board
* Invite Business Partner Screen - disabled "detail" button in invitees table
* Semantic Hub & Digital Twin overlays close icon fixed
* Digital Twin overlay sizing of content fixed to stay in given frame/overlay size
* App Release Process - fixed save and edit data handling to display available/saved app data to the user

## 1.0.0-RC9

### Change
* App Release Approval Board
  * Enabled overlay for decline scenario with customer message
* Notification message content updated and incl. links
* Several help connections implemented (connector, app release, etc.)
* Application Registration
   * Retrigger process apis added

### Feature
* Connector Registration
   * new design with additional information such as host, self-description and status released

### Technical Support
n/a

### Bugfix
* Back navigation issue resolved from notifications to any specific page and back

## 1.0.0-RC8

### Change
* App Release Process:
  * Technical integration - role upload ui changes to ease the usability
  * Added new attribute "privacyPolicies" to  app creation
* New 'Help Center' connected with the portal help button

### Feature
* Application Approval Board - Checklist overlay
   * enabled checklist details with comments and status via backend api connection
   * enabled approval and decline interfaces for the manual data validation

### Technical Support
* resolve dependabot findings
* temp fix for cve-2023-0286
* add missing '--no-cache': apk update && apk add

### Bugfix
* User Management: App role assignment - cache issue resolved

## 1.0.0-RC7

### Change
* Admin App Approval Board - app detail page released when clicking on app card

### Feature
n/a

### Technical Support
n/a

### Bugfix
* Notification delete mechanism updated - auto page reload

## 1.0.0-RC6

### Change
* App Release Process
    * Set 'UseCase selection' and 'app supported language' to mandatory
    * app role upload further refined with better user support

### Feature
* Company Registration Approval Board
   * implemented and backend connected the application cancel process flow
   * checklist-worker fully implemented for not finalized/closed applications

### Technical Support
n/a

### Bugfix
n/a

## 1.0.0-RC5

### Change
* Application company detail overlay updated to manage unique ids based on the backend response
* App Release Process
  * Technical Integration - roles upload & deletion functionality 

### Feature
* Application approval checklist implementation with checklist worker; status and overlay (ongoing)
* Shared Components
  * Dropzone file deletion overlay for deletion confirmation released

### Technical Support
* Static Template handling updated to fetch content from asset repo for more flexibility and code separation from content & support of multi-language activated

### Bugfix
* App details page fixed
* Add/Create user account field validations re-activated
* App release process - Changed regex validation for 'Provider Homepage' field
* App release process - Document upload in 'technical guide' field
* Refetch updated notification list on delete action
* Connector file type/size error updated

## 1.0.0-RC4

### Change
n/a

### Feature
n/a

### Technical Support
* Static Template handling updated to fetch content from asset repo for more flexibility and code separation from content & support of multi-language activated

### Bugfix
* App release process bugs fixed such as multiple document upload, fetch uploaded roles from backend
* App release management board - views tabs fixed
* Notification URLs for notification messages updated
* Connector registration overlay overlapping tooltip icon fixed


## 1.0.0-RC3

### Change

### Feature
* User Management
   * create single user account support of company idp
* Released App Management Board for Operator to managed app publishing requests

### Technical Support
n/a

### Bugfix
* Translations and couple of text messages updated
* My business apllication area fixed by removing cache relation for app card images
* App release process bugs fixed such as incorrect mandatory fields; file upload handling, etc.

## 1.0.0-RC2

### Change
* Dialog Header
   * Update Dialog header font size to 24px
* Admin Board - App Release (Page)
   * Created Admin Board Page
   * Connect with API's
   * BL&API Approve app release
   * BL&API Decline app release
* Bugfix
   * Change Email Pattern Regex to fix Hostspot
* User Management main page
   * update dialog header & font style/size
* Apps
   * removed asset repo dependency and connect backend apis to fetch lead images
* App Release Process
   * step 4 "role management" connected with apis to support GET / POST and DELETE
   * Company role introduction page styling sizes updated
   * Added content for company role introduction & use case introduction pages

### Feature
n/a

### Technical Support
* Email pattern / regular expression updated

### Bugfix
* App access management - carousel style updated & card height fixed

## 1.0.0-RC1

### Change
* User management
   * app Access placeholder component implemented which is getting used in case no active app subscription does exist
   * user table headlines updated
   * updated page header size and image
* Updates - Connector
   * overlays updated (dropzone headline added; changed "Cancel" to "Back" Button, add top right cancel icon inside the overlay)
   * tooltips added for connector table to explain status icons
* Registration Request Approval Board
   * page layout updated
   * filter feature enabled
   * company data details overlay extended with company role and documents
* Notification
   * Badge count added inside the user icon sub-navigation
   * notification message title and content updated by supporting new technical keys

### Feature
* Use case introduction page released
* Shared Components
  * created "Side List" component
  * created "Draggable Chip" component
  * created "Static Page" templates for introduction pages
  * created "Image Item" with zoom and hover function as well as update of "Image Gallery" 
* App Release Process
   * step 4 limited to role upload/handling only
   * step 5 Beta Test page updated with preview content for future releases
   * app card component of step 1 connected with the leadimage load element to display the leadimage inside the card in realtime
* App Change Process released
   * created deactivate sub-menu component in App Provider Overview Page
   * created app deactivate page and connected the app/deactivation api
* App Subscription Management Board for app providers got newly released
   * overview of active app subscriptions and new requests
   * filter & search function on subscriptions
   * subscription activation function implemented with direct user response such es technical user creation
   * autosetup url storage for the app provider enabled via user interface
* Identity Provider Management released
   * connect company OIDC idps enabled via portal user workflow
   * user migration function enabled to support migration of users from one idp to another

### Technical Support
Portal asset repo image drag disabled for all transactional images (such as app images) ![Tag](https://img.shields.io/static/v1?label=&message=BreakingChange&color=yellow&style=flat)

### Bugfix
* User Management: assign multiple users to an role got fixed
* Connector:
   * fixed issue on clicking info icon trigger delete action
   * show tooltip message on hover of info icon
   * enable authentication flow
* Technical User: overlay static user data now getting fetched from the user token
* AppOverview: navigation to app release process screen with auto filled app data got fixed for apps in status "In PROGRESS"

## 0.10.0

### Change
* Shared Components
   * "load more" button component released with new design
   * page snackbar component released with new design
   * page snackbar auto closure implemented (as variant)
   * page snackbar positioning updated
   * tooltip enhanced by adding light color variant
* Partner Network
   * Stop throbber in case of error and show No rows present message
   * Empty details overlay issue fix
   
### Feature
* Service Marketplace
   * new UI released
   * enabled different views by service category
   * enabled sorting and in-page search
* Connector Registration
   * style updated and connector details enhanced inside the "my connectors" table
   * added DAPS logic and file upload inside the connector registration ui and business logic
* Notifications Service
   * enabled sorting and filtering
   * pagination enabled by adding "load more" function and receiving pagination details via api

### Technical Support
* n/a

### Bugfix
* Technical User creation: Removed multi overlay layering and corrected response style
* Notification Service:
   * modal for message deletion page positioning fixed
   * sort icon behavior on click/mouse over fixed
   * notification api trigger logic fixed
* App user management: user role deletion fixed


## 0.9.0

### Change
* Shared Components
   * SelectList component - property/parameter added to clear the select list input
* App Release Process
   * Sales Manager Get, Select and drop down enabled for app creation
   * "Save" Button enabling with update PUT api call

### Feature
* Marketplace
   * App subscription consent agreement included inside the user flow with api triggering 
* Identity Provider
   * Create, update and enable new idp integration for ownIdP usage (companyIdP)
* Notifications Service
   * Release of new notification design with filtering, viewing & pagination
   * Highlight of unread messages
   * Delete notification function enabled
* Registration Approval Board
   * Enable handling of registrations without bpn by adding a bpn input field with api connection
* User management
   * Auto navigation to Identity Management section after deleting an user
   * App User tables - content api call filtering activated to reduce response to needed result
* Company Role Introduction
   * Active Participant introduction page
   * App Provider introduction page
   * Service Provider introduction page

### Technical Support
* n/a

### Bugfix
* n/a

## 0.8.0

### Change
* Connector Registration
   * Enable "Company as a Service" connector registration via modal; connected to portal backend and SD Factory
   * Input field pattern validation established
   * Updated delete connector integration

### Feature
* User Management - user account creation for portal connected to company role validation to reduce and validate available portal roles which the member company can assign (related to the company signed company role agreements)
* User Account
   * Enabled my user account deletion flow and backend integration
   * Error and success overlay added for password reset button/logic
   * Disabled "Suspend" user button

### Technical Support
* n/a

### Bugfix
* User Invite - error pattern validation integrated
* Shared Components
   * Image components updated & svg file loaded
   * Drop-Down list

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
* User Management: View own company users, invite new users and assign app roles for subscribed apps. Additionally, the technical user self-service got released and supports now the creation of technical users as part of the user company account.
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
* Bugfix - Business Apps displayed correctly and links working
* Bugfix - Restrict supported languages to 'en' and 'de' without local variants
* Bugfix - Removed empty 'Organization' option from user menu
* Bugfix - Footer fixed to bottom of window
* Bugfix - Some alignment and content fixes

### Older

* Defect - Page reloads when the auth token is renewed
* Defect - Latest apps are static
* Defect - Some footer pages and menu items are empty