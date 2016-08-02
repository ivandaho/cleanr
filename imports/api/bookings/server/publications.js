/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Bookings } from '../Bookings.js';

Meteor.publish('bookings', function(){
    return Bookings.find({});
    // if customer, return only customer's bookings
    // if vendor, return all vendor bookings
    // if admin, return all bookings
    /*
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Bookings.find({});
    } else {
        // user unauthorized
        this.stop();
        return;
    }
    */
});

