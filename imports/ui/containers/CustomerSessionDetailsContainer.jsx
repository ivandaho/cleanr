// container

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Userdata } from '/imports/api/userdata/Userdata.js';
import { Timeslots } from '/imports/api/timeslots/Timeslots.js';
import { Sessions } from '/imports/api/sessions/Sessions.js';
import { Bookings } from '/imports/api/bookings/Bookings.js';
import { CustomerSessionDetailsComponent } from '../components/CustomerSessionDetailsComponent.jsx';

export default createContainer(({ params }) => {
    let sub = smUserdata.subscribe('userdata');
    let sub2 = smTimeslots.subscribe('timeslots');
    let sub3 = smSessions.subscribe('sessions');
    let sub4 = smBookings.subscribe('bookings');
    let ready = false;
    if (sub.ready() && sub2.ready() && sub3.ready() && sub4.ready()) {
        ready = true;
    }
    var thesess = Sessions.findOne(
            {
                _id: params.sid,
                custID: Meteor.userId()
            }
        );
    var thebooking = {};
    var thetimeslot;
    var nextsess = {};
    var prevsess = {};
    if (thesess) {

        const expdate = moment.utc(thesess.date).toDate();
        thebooking = Bookings.findOne(
            {
                _id: thesess.bookingID,
                custID: Meteor.userId()
            }
        );
        thetimeslot = Timeslots.findOne({num: thesess.timeslot});
        prevsess = Sessions.findOne(
            {
                bookingID: thesess.bookingID,
                date: {$lt: thesess.date}
            },
            {
                sort: {date: -1}
            }
        );
        nextsess = Sessions.findOne(
            {
                bookingID: thesess.bookingID,
                date: {$gt: thesess.date}
            },
            {
                sort: {date: 1}
            }
        );
    }
 
    return {
        ready: ready,
        userData: Userdata.findOne({_id: Meteor.userId()}),
        thetimeslot: thetimeslot,
        thesess: thesess,
        nextsess: nextsess,
        prevsess: prevsess,
        thebooking: thebooking
    }
}, CustomerSessionDetailsComponent);
