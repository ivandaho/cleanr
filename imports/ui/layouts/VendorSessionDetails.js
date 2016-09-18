import './VendorSessionDetails.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Timeslots } from '../../api/timeslots/Timeslots.js';
import { Sessions } from '../../api/sessions/Sessions.js';
import { Userdata } from '../../api/userdata/Userdata.js';
import { Bookings } from '../../api/bookings/Bookings.js';

Template.VendorSessionDetails.onCreated(function VendorSessionDetailsOnCreated() {
    Meteor.subscribe('timeslots');
    Meteor.subscribe('sessions');
    Meteor.subscribe('userdata');
    Meteor.subscribe('bookings');

    tss = Timeslots.find({});
});

var tss;

Template.VendorSessionDetails.helpers({
    isvendor(sess) {
        return Meteor.call('userdata.checkIsVendor', sess) || {};
    },
    overdate(sess) {
        // get sessiond date and slot
        var sd = sess.date;
        var ss = sess.timeslot;
        strdate = moment.utc(sd).format('YYYY-MM-DD');
        thetimeslot = Timeslots.findOne({num: parseInt(ss)});
        slotend = thetimeslot.timeend;
        strcheck = strdate + ' ' + slotend;

        var check = moment.utc(strcheck, 'YYYY-MM-DD HHmm');
        if (moment.utc() > check) {
            return true;
        }
    },
    timeslots() {
        if (tss != undefined) {
            return tss;
        }
    },
});

Template.VendorSessionDetails.events({
    'click .btn-mark-completed' (event) {
        event.preventDefault();
        let sid = FlowRouter.getParam('sessid');
        Meteor.call('sessions.markCompleted', sid, function(error) {
            if (error) {
                console.log(error);
            } else {
                Meteor.call('email.markCompleted', sid);
            }
        });
    },
    'click .btn-mark-not-completed' (event) {
        event.preventDefault();
        Meteor.call('sessions.markNotCompleted', FlowRouter.getParam('sessid'));
    },
    'click .cedit' (event) {
        event.preventDefault();
        var sid = FlowRouter.getParam('sessid');
        var oldcomment = event.target.id;
        bootbox.prompt({
            title: "Edit Comment",
            value: oldcomment,
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.custEditComment', sid, oldcomment, result);
                }
            }
        });
    },
    'click .vedit' (event) {
        event.preventDefault();
        var sid = FlowRouter.getParam('sessid');
        var oldcomment = event.target.id;
        bootbox.prompt({
            title: "Edit Comment",
            value: oldcomment,
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.vendEditComment', sid, oldcomment, result);
                }
            }
        });
    },
    'click .vrm' (event) {
        var sid = FlowRouter.getParam('sessid');
        comment = event.target.id;
        Meteor.call('sessions.vendDeleteComment', sid, comment);
    },
    'click .vadd' (event) {
        var sid = FlowRouter.getParam('sessid');
        bootbox.prompt({
            title: "Add Comment",
            callback: function(result) {
                if (result === null) {
                    console.log("Prompt dismissed");
                } else {
                    Meteor.call('sessions.vendAddComment', sid, result);
                }
            }
        });
    },

});

