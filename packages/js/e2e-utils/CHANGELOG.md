# Unreleased

## Fixed

- Added the `root: true` flag to `e2e-utils` ESLint config file so that ESLint ignores other ancestor config files when checking that package. This solves a version conflict when running ESLint.

## Added

- `createSimpleDownloadableProduct` component which creates a simple downloadable product, containing four parameters for title, price, download name and download limit.
- `orderPageSaveChanges()` to save changes in the order page.
- `productPageSaveChanges()` to save changes in the product page.
- `getSelectorAttribute( selector, attribute )` to retrieve the desired HTML attribute from an element.
- `verifyValueOfElementAttribute( selector, attribute, expectedValue )` to check that a specific HTML attribute from an element matches the expected value.
- `click( selector )` to click an element asserting previously that the element is enabled and can be clicked.
- `withRestApi.deleteProduct()` that deletes a single product.
- `withRestApi.deleteOrder()` that deletes a single order.
- `merchant.addDownloadableProductPermission()` to add a downloadable product permission to an order.
- `merchant.updateDownloadableProductPermission()` to update the attributes of an existing downloadable product permission.
- `merchant.revokeDownloadableProductPermission()` to remove the existing downloadable product permission from an order.
- `merchant.verifyDownloadableProductPermission()` to check that the attributes of an existing downloadable product permission are correct.
- `merchant.openDownloadLink()` to open the url of a download in a new tab.
- `merchant.verifyCannotDownloadFromBecause()` to check that a download cannot happen for a specific reason.
- `merchant.updateVariationDetails( variationDetails )` to update the variation details of a product.
- `merchant.verifyVariationDetails( expectedVariationDetails )` to check that the variation details of a product were updated successfully.

## Changed
- Removed `faker` dependency

# 0.1.7

## Fixed

- Identified the default product category using `slug == 'uncategorized'` in `deleteAllProductCategories`

## Added

- `utils.waitForTimeout( delay )` pause processing for `delay` milliseconds
- `AdminEdit` class with utility functions for the respective edit screens
- Update `shopper.addToCartFromShopPage()` and `.removeFromCart()` to accept product Id or Title
- Added `deleteAllProductAttributes()`, `deleteAllProductCategories()`, and `deleteAllProductTags()` to clean up meta data added when products are imported
- Added `withRestApi.createProductCategory()` that creates a product category and returns the ID
- `withRestApi.deleteCoupon()` that deletes a single coupon
- `withRestApi.addTaxClasses()` that adds an array of tax classes if they do not exist
- `withRestApi.addTaxRates()` that adds an array of tax rates if they do not exist
- `clickAndWaitForSelector( buttonSelector, resultSelector, timeout )` to click a button and wait for response
- Optional parameter `testResponse` to `withRestApi` functions that contain an `expect()`
- `shopper.logout()` to log out the shopper account
- `merchant.dismissOnboardingWizard()` to dismiss the onboarding wizard
- `merchant.collapseAdminMenu()` to expand or collapse the WP admin menu

# 0.1.6

## Added

- Factories for variable product, variation, and grouped product
- New function to create orders by batch using the orders API
- Added new constant for WordPress update page `WP_ADMIN_WP_UPDATES`
- Added new merchant flow for `openWordPressUpdatesPage()`
- Added new merchant flows:
  - `openWordPressUpdatesPage()`
  - `installAllUpdates()`
- Added `getSlug()` helper to return the slug string for a provided string
- Added `describeIf()` to conditionally run a test suite
- Added `itIf()` to conditionally run a test case.
- Added merchant workflows around plugins: `uploadAndActivatePlugin()`, `activatePlugin()`, `deactivatePlugin()`, `deletePlugin()`
- Added merchant workflows checking for a database update and performing the update if needed: `runDatabaseUpdate()`
- Added `deleteAllOrders()` that goes through and deletes all orders
- Added `deleteAllShippingClasses()` which permanently deletes all shipping classes using the API
- Added `statuses` optional parameter to `deleteAllRepositoryObjects()` to delete on specific statuses
- Added `createOrder()` component util that creates an order using the API with the passed in details
- Updated `addShippingZoneAndMethod()` to use the API instead of UI to create shipping zones
- Added `updateSettingOption()` to use the API to update a setting option
- Added `updatePaymentGateway()` to use the API to update a payment gateway
- Added `getSystemEnvironment()` that gets the current environment from the WooCommerce API.

# 0.1.5

## Added

- `emptyCart()` Shopper flow helper that empties the cart
- `deleteAllShippingZones()` Delete all the existing shipping zones
- constants
  - `WP_ADMIN_POST_TYPE`
  - `WP_ADMIN_NEW_POST_TYPE`
  - `WP_ADMIN_ALL_COUPONS_VIEW`
  - `WP_ADMIN_WC_HOME`
  - `IS_RETEST_MODE`
- `withRestApi` flow containing utility functions that manage data with the rest api
- `waitForSelectorWithoutThrow` - conditionally wait for a selector without throwing an error

# 0.1.4

## Fixed

- build issue with faker import

# 0.1.3

## Added

- `selectOptionInSelect2( selector, value )` util helper method that search and select in any select2 type field
- `searchForOrder( value, orderId, customerName )` util helper method that search order with different terms
- `addShippingZoneAndMethod( zoneName, zoneLocation, zipCode, zoneMethod )` util helper method for adding shipping zones with shipping methods
- `createSimpleProductWithCategory` component which creates a simple product with categories, containing three parameters for title, price and category name.
- `applyCoupon( couponName )` util helper method which applies previously created coupon to cart or checkout
- `removeCoupon()` util helper method that removes a single coupon within cart or checkout
- `selectOrderAction( action )` util helper method to select and initiate an order action in the Order Action postbox
- `merchant.openEmailLog()` go to the WP Mail Log page
- `deleteAllEmailLogs` delete all email logs in the WP Mail Log plugin
- `clickUpdateOrder( noticeText, waitForSave )` util helper that clicks the `Update` button on an order

## Changed

- Added coupon type parameter to `createCoupon( couponAmount, couponType )`. Default coupon type is fixed cart.

# 0.1.2

## Fixed

- Missing `config` package dependency
- Added `page.removeAllListeners('dialog')` to `createVariableProduct()` to fix dialog already handled errors

## Added

- `shopper.gotoMyAccount()` go to the /my-account/ page
- `clickFilter()` util helper method that clicks on a list page filter
- `moveAllItemsToTrash()` util helper method that checks every item in a list page and moves them to the trash
- `createSimpleOrder( status )` component which accepts an order status string and creates a basic order with that status
- `addProductToOrder( orderId, productName )` component which adds the provided productName to the passed in orderId
- `createCoupon( couponAmount )` component which accepts a coupon amount string (it defaults to 5) and creates a basic coupon. Returns the generated coupon code.
- `evalAndClick( selector )` use Puppeteer page.$eval to select and click and element.

## Changes

- Deprecated `StoreOwnerFlow`, `CustomerFlow` in favour of `merchant`,`shopper`
- `createSimpleOrder( status )` returns the ID of the order that was created
- Updated `createCoupon( couponAmount )` component by adding a new parameter `discountType` which allows you to use any coupon discount type in tests
- Updated `verifyAndPublish( noticeText )` component by add a new parameter, `noticeText`, that allows passing in the accepted update notice text. For example, with variations on creation or update.

# 0.1.1

- Initial/beta release
