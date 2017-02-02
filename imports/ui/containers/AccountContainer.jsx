// container

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Userdata } from '/imports/api/userdata/Userdata.js';
import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';
import { AccountComponent } from '../components/AccountComponent.jsx';

export default createContainer(() => {
    let sub = smUserdata.subscribe('userdata');
    let sub2 = smTimeslots.subscribe('timeslots');
    let sub3 = smSessions.subscribe('sessions');
    let sub4 = smBookings.subscribe('bookings');
    let ready = false;
    if (sub.ready() && sub2.ready() && sub3.ready()) {
        ready = true;
    }
    return {
        ready: sub.ready(),
        userData: Userdata.findOne({_id: Meteor.userId()}),
        timeslots: Timeslots.find().fetch(),
        sessions: Sessions.find(
            {
                custID: Meteor.userId()
            },
            {
                sort: {date: -1, timeslot: 1},
                limit: 10
            }
        ).fetch(),
        bookings: Bookings.find(
            {
                custID: Meteor.userId()
            },
            {
                sort: {subdate: 1, timeslot: 1},
                limit: 5
            }
        ).fetch()
    }
}, AccountComponent);
