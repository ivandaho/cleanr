/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import { Sessions } from '../../sessions/Sessions.js';
import { Bookings } from '../Bookings.js';

Meteor.publish('bookings', function(){
    if (Roles.userIsInRole(this.userId, 'admin')) {
        return Bookings.find({});
    } else if (Roles.userIsInRole(this.userId, 'vendor')) {
        // get all sessions where vendor = user
        var vendorsessions = Sessions.find({vendorID: this.userId});
        var bidOfSessions = [];
        vendorsessions.forEach(function(asession) {
            if (bidOfSessions.indexOf(asession.bookingID) == -1) {
                // push to array if unque
                bidOfSessions.push(asession.bookingID);
            }
        });
        return Bookings.find({_id: {$in: bidOfSessions}});

    } else if (Roles.userIsInRole(this.userId, 'customer')) {
        return Bookings.find({custID: this.userId});
    } else {
        this.stop();
        return;
    }
});

