# cleanr

A work in progress

Built with MeteorJS stack

Demo website: [cleanr.ivanho.me](http://cleanr.ivanho.me)

Allows customers to find independant contractors (cleaners) for their homes or apartments

##Installation##

1. install meteor

2. Clone this repo

  `git clone https://github.com/ivandaho/cleanr`

3. Update npm packages:

  `meteor npm install`

  Windows might need additional [things](https://github.com/nodejs/node-gyp#installation)

4. Run:

  `meteor`


##About##

Simplifies the process of booking a cleaner or part-time maid.

Both Customers and Vendors benefit from the webapp - Vendors put up their available times into a pool, which customers are able to select slots from.


The process is simple for the customer. First, the customer picks a time slot to book. Subscriptions are possible for multiple, repeated sessions. For each session, a vendor is assigned to the job. After the session is completed, the corresponding vendor marks the session as completed. Several features are implemented, such as viewing past sessions, and leaving comments.


Vendors have a separate feature set - for example, among other features, they are available to set their default available schedule, view their upcoming sessions in a table or in a calendar view, and search a list of their customers.
