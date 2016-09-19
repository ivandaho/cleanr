# TODO missing features #

### Features ###

#### Notifications: ####

Customer makes a booking
  * ~~**E-mail:** to customer notifying them of successful booking~~
    * ~~View Booking~~
    * ~~View First Session~~

  * ~~**E-mail:** parse sessions, and notify the corresponding vendors (one e-mail only)~~
  * ~~**E-mail:** Add sessions into syncedCron array to email customer 2 days before. (ignore if session date is earlier than 2 days away)~~
    * ~~View Booking~~
    * ~~View Session~~

Session completed
  * ~~**E-mail:** to customer notifying that the vendor has marked the session as completed~~
    * ~~Verify/Give Feedback~~

Other Notifications:
 * **When a new session is created:** notify the corresponding vendor
 * **When a session is marked as completed by the vendor:** notify the customer
 * **When a new comment is added by the vendor:** notify the customer
 * **When a new comment is added by the customer:** notify the vendor
 * **When the vendor has not marked the session as completed by end of day:** notify the vendor


### Visual ###
* ~~Demo icon~~
* Header image: confirmation
* Header image: account
* Header image: customersessiondetails
* Header image: vendorsessiondetails
* Header image: booking
* Header image: vendorcustomer (customer profile page for vendor)
* Header image: vendorcp


### Other ###
* Login - check password string if its empty before passing data to server
* Page to view all sessions with filters (like date window)
* Disable view more/less buttons when limit is reached
