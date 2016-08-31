import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './Booking.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';

Template.Booking.onCreated(function BookingOnCreated() {
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
    Meteor.subscribe('timeslots');
    Meteor.subscribe('bookings');
});


Template.Booking.helpers({
    getsubstatus(booking) {
        if (booking.jobstatus == 2 || booking.jobstatus == 3) {
            return true;
        }
    },
    booking() {
        return Bookings.findOne({_id: FlowRouter.getParam('bid')});
    },
    cust(cid) {
        return Userdata.findOne({_id: cid});
    },
    sesses(booking) {
        // gets sessions more recent than 6 months old
        var d = moment().subtract(6, 'months').toDate();
        return Sessions.find({bookingID: booking._id, date: {$gt: d}}, {sort: {date: -1}});
    },
    subdate(date) {
        return moment(date).format('YYYY-MM-DD HH:MM');
    },
    d(p) {
        return moment(p).format('YYYY-MM-DD');
    },
    s(p) {
        var found = Timeslots.findOne({num: parseInt(p)}) || {};

        return found.slot && found.slot;
    },
});
Template.Booking.events({
    'click .morebtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
    'click .lessbtn' (event) {
        event.preventDefault();
        console.log('TODO: change treshold for recent sessions');
    },
    'click .btn-cancel-booking' () {
        event.preventDefault();
        Meteor.call('bookings.stopSubscription', FlowRouter.getParam('bid'));
    }
});
