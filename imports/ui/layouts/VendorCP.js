import './VendorCP.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Sessions } from '../../api/sessions/Sessions.js';

import '/imports/startup/client/config/velocity_callouts.js';

Template.VendorCP.onCreated(function VendorCPOnCreated() {
    sm.subscribe('userdata');
    sm.subscribe('sessions');
    sm.subscribe('timeslots');
    Session.set('uslimit', 5);
    Session.set('pslimit', 5);
});

Template.VendorCP.helpers({
    usmin() {
        if (Session.get('uslimit') <= 5) {
            return true;
        }
        return false;
    },
    psmin() {
        if (Session.get('pslimit') <= 5) {
            return true;
        }
        return false;
    },
    parsess(s) {
        //parse session status
        if (s== 1) {
            return true;
        } else if (s == 0) {
            return false;
        }
    },
    todaysesses() { // TODO: is this secure? #22
        const todaydate = moment.utc().startOf('day').toDate();

        const thing = Sessions.find(
                                    {
                                        vendorID: Meteor.userId(),
                                        // TODO: might have time zone errors
                                        // down the road if this is set to
                                        // $eq instead of something like $gte
                                        // or $lte
                                        date: {$eq: todaydate},
                                    },
                                    {sort: {timeslot: 1}}
                                );
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
    upcomingsesses() {
        const tmrdate = moment.utc().startOf('day').toDate();
        const uslimit = Session.get('uslimit');
        const thing = Sessions.find(
                                {
                                    vendorID: Meteor.userId(),
                                    date: {$gte: tmrdate},
                                },
                                {
                                    sort: {date: 1, timeslot: 1},
                                    limit: uslimit
                                }
                            );
        // counts the number of sessions found
        const newcount = thing.count();
        // sets the number of sessions found
        Session.set('uscount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('uslimit')) {
            Session.set('usmaxed', true);
        } else {
            Session.set('usmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
    pastsesses() {
        const todaydate = moment.utc().startOf('day').toDate();
        const pslimit = Session.get('pslimit');
        const thing = Sessions.find(
                                {
                                    vendorID: Meteor.userId(),
                                    date: {$lt: todaydate},
                                },
                                {
                                    sort: {date: -1, timeslot: 1},
                                    limit: pslimit
                                }
                            );
        // counts the number of sessions found
        const newcount = thing.count();
        // sets the number of sessions found
        Session.set('uscount', newcount);

        // if the new count is same as the old count
        if (newcount < Session.get('pslimit')) {
            Session.set('psmaxed', true);
        } else {
            Session.set('psmaxed', false);
        }
        if (thing.count() != 0) {
            return thing;
        } else {
            return false;
        }
    },
});


Template.VendorCP.events({
    'click .vm-ps' (event) {
        event.preventDefault();
        const newpslimit = Session.get('pslimit') + 5;
        if (Session.get('psmaxed') != true) {
            Session.set('pslimit', Session.get('pslimit') + 5);
            setTimeout(function () {
            $(".ps-row").velocity("stop");
            $(".ps-row").velocity("callout.emerge", {stagger: 5});
            }, 10);
        }
    },
    'click .vl-ps' (event) {
        event.preventDefault();
        if (Session.get('pslimit') - 5 < 5) {
            Session.set('pslimit', 5)
        } else {
            Session.set('pslimit', Session.get('pslimit') - 5);
        }
    },
    'click .vm-us' (event) {
        event.preventDefault();
        const newuslimit = Session.get('uslimit') + 5;
        if (Session.get('usmaxed') != true) {
            Session.set('uslimit', Session.get('uslimit') + 5);
            setTimeout(function () {
            $(".us-row").velocity("stop");
            $(".us-row").velocity("callout.emerge", {stagger: 5});
            }, 10);
        }
    },
    'click .vl-us' (event) {
        event.preventDefault();
        if (Session.get('uslimit') - 5 < 5) {
            Session.set('uslimit', 5)
        } else {
            Session.set('uslimit', Session.get('uslimit') - 5);
        }
    },
    'click .markComplete' (event) {
        event.preventDefault();
        const sid = event.target.id;
        Meteor.call('sessions.markCompleted', sid, function(error) {
            if (error) {
                console.log(error);
            } else {
                Meteor.call('email.markCompleted', sid);
            }
        });

    },
});
