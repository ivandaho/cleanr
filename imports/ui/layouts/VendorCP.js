import './VendorCP.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Sessions } from '../../api/sessions/Sessions.js';

Template.VendorCP.onCreated(function VendorCPOnCreated() {
    Meteor.subscribe('userdata');
    Meteor.subscribe('sessions');
    Meteor.subscribe('timeslots');
});

Template.VendorCP.helpers({
    parsess(s) {
        if (s== 1) {
            return true;
        } else if (s == 0) {
            return false;
        }
    },
    sesses() { // TODO: is this secure? #22
        return Sessions.find(
                                {vendorID: Meteor.userId()},
                                {sort: {date: -1}}
                            );
    },
    todaysesses() { // TODO: is this secure? #22
        todaydate = moment.utc().startOf('day').toDate();

        return Sessions.find(
                                {
                                    vendorID: Meteor.userId(),
                                    // TODO: might have time zone errors
                                    // down the road if this is set to
                                    // $eq instead of something like $gte
                                    // or $lte
                                    date: {$eq: todaydate},
                                },
                                {sort: {date: -1}}
                            );
    },
    upcomingsesses() {
        tmrdate = moment.utc().startOf('day').add(1, 'days').toDate();
        return Sessions.find(
                                {
                                    vendorID: Meteor.userId(),
                                    date: {$gte: tmrdate},
                                },
                                {sort: {date: -1}}
                            );
    },
    pastsesses() {
        todaydate = moment.utc().startOf('day').toDate();
        return Sessions.find(
                                {
                                    vendorID: Meteor.userId(),
                                    date: {$lt: todaydate},
                                },
                                {sort: {date: -1}}
                            );
    },
});


Template.VendorCP.events({
    'click .markComplete' (event) {
        event.preventDefault();
        sid = event.target.id;
        Meteor.call('sessions.markCompleted', sid);

    },
});
