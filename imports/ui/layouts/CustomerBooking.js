import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './CustomerBooking.html';

// this is for meteor session variables, not cleaning session
import { Session } from 'meteor/session';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Bookings } from '../../api/bookings/Bookings.js';

Template.CustomerBooking.onCreated(function CustomerBookingOnCreated() {
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
    Meteor.subscribe('timeslots');
    Meteor.subscribe('bookings');
});


Template.CustomerBooking.events({
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
